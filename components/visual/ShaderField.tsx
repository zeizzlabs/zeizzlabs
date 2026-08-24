"use client";

import { useEffect, useRef } from "react";

/**
 * The hero's living surface: a full-screen fragment shader painting flowing
 * circuit-board energy in the brand's blue → steel → gold ramp.
 *
 * Written against raw WebGL2 rather than three.js/OGL on purpose. All this
 * needs is one full-screen triangle and one shader, so a library would add
 * 40–150 KB of scene graph, camera and geometry machinery for nothing. This
 * costs zero bundle bytes beyond the file itself.
 *
 * Cost control: renders at min(DPR, 1.75), pauses when scrolled out of view or
 * the tab is hidden, and never mounts for reduced-motion visitors.
 */

const VERT = `#version 300 es
// One oversized triangle covers the viewport with no vertex buffer at all.
void main() {
  vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

const FRAG = `#version 300 es
precision highp float;
out vec4 outColor;

uniform vec2  uRes;
uniform float uTime;
uniform vec2  uMouse;      // 0..1, eased
uniform float uScroll;     // 0..1 through the hero

// -- Brand palette (matches the CSS tokens exactly) ------------------
const vec3 INK   = vec3(0.016, 0.024, 0.047);
const vec3 BLUE  = vec3(0.118, 0.482, 1.000);
const vec3 SKY   = vec3(0.549, 0.769, 1.000);
const vec3 GOLD  = vec3(0.863, 0.722, 0.467);
const vec3 STEEL = vec3(0.643, 0.702, 0.788);

// -- Noise -----------------------------------------------------------
vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return fract(sin(p) * 43758.5453) * 2.0 - 1.0;
}

float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(dot(hash2(i + vec2(0, 0)), f - vec2(0, 0)),
        dot(hash2(i + vec2(1, 0)), f - vec2(1, 0)), u.x),
    mix(dot(hash2(i + vec2(0, 1)), f - vec2(0, 1)),
        dot(hash2(i + vec2(1, 1)), f - vec2(1, 1)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.02;
    a *= 0.5;
  }
  return v;
}

// Orthogonal circuit traces: quantise space to a grid, then light the lanes.
float traces(vec2 p, float t) {
  vec2 g = p * 7.0;
  vec2 id = floor(g);
  vec2 f = fract(g) - 0.5;

  // Per-cell decision: does this cell carry a horizontal or vertical lane?
  float r = fract(sin(dot(id, vec2(41.3, 289.1))) * 43758.5453);
  float lane = r > 0.5
    ? smoothstep(0.055, 0.0, abs(f.y))
    : smoothstep(0.055, 0.0, abs(f.x));

  // A pulse travelling along the lane.
  float along = r > 0.5 ? f.x : f.y;
  float pulse = smoothstep(0.42, 0.0, abs(fract(along - t * (0.25 + r * 0.4)) - 0.5));

  // Only a sparse subset of cells are wired at all.
  float wired = step(0.74, fract(r * 7.31));
  return lane * pulse * wired;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / min(uRes.x, uRes.y);

  float t = uTime * 0.05;

  // Cursor pushes the field around like a lens.
  vec2 m = (uMouse - 0.5) * vec2(uRes.x / uRes.y, 1.0);
  float md = length(p - m);
  vec2 warp = normalize(p - m + 1e-5) * 0.045 / (1.0 + md * 10.0);

  // Domain-warped fbm: the slow plasma under everything.
  vec2 q = p + warp;
  float n1 = fbm(q * 1.5 + vec2(t, -t * 0.7));
  float n2 = fbm(q * 2.2 + vec2(n1 * 1.4 - t * 0.5, n1 * 1.1 + t * 0.3));
  float field = n2 * 0.5 + 0.5;

  // Colour ramp. The ground stays near-black on purpose — this is atmosphere
  // behind type, not the subject. Energy only appears in the top decile of the
  // field, which keeps headline contrast well clear of the AA floor.
  vec3 col = INK;
  col = mix(col, BLUE * 0.58, smoothstep(0.48, 0.84, field));
  col = mix(col, SKY  * 0.60, smoothstep(0.72, 0.96, field));
  col = mix(col, GOLD * 0.72, smoothstep(0.86, 1.00, field));

  // Circuit traces — sparse, and gold-biased so the brand's second colour
  // actually reads instead of drowning in blue.
  float tr = traces(q + vec2(0.0, t * 0.12), uTime * 0.4);
  vec3 traceCol = mix(BLUE * 1.1, GOLD * 1.35, smoothstep(0.42, 0.80, field));
  col += traceCol * tr * 0.60;

  // A soft glow that follows the cursor.
  col += mix(BLUE, GOLD, 0.45) * 0.16 / (1.0 + md * md * 26.0);

  // Steel sheen across the top, so the hero reads lit from above.
  col += STEEL * 0.022 * smoothstep(0.4, 1.0, uv.y);

  // Vignette, then a hard fade to the page ground behind the headline block
  // and at the bottom edge so the section joins the next one invisibly.
  float vig = smoothstep(1.15, 0.15, length(p * vec2(0.8, 1.0)));
  col *= vig;

  float centre = smoothstep(0.62, 0.12, length(p * vec2(0.62, 1.25)));
  col = mix(col, INK, centre * 0.48);
  col = mix(col, INK, smoothstep(0.55, 1.0, 1.0 - uv.y) * 0.92);

  // Fade the whole field out as the hero scrolls away.
  col = mix(col, INK, uScroll * 0.9);

  // Dither: 8-bit output over a smooth gradient bands badly without it.
  float d = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  col += (d - 0.5) / 255.0;

  outColor = vec4(col, 1.0);
}`;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export function ShaderField({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const gl = canvas.getContext("webgl2", {
      antialias: false,
      alpha: false,
      powerPreference: "high-performance",
    });
    // No WebGL2 (rare, but old Android exists) — the CSS layers below still
    // render a complete hero, so we simply do nothing.
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uMouse = gl.getUniformLocation(prog, "uMouse");
    const uScroll = gl.getUniformLocation(prog, "uScroll");

    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    let w = 0;
    let h = 0;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = Math.max(1, Math.floor(r.width * dpr));
      h = Math.max(1, Math.floor(r.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    const mouse = { x: 0.5, y: 0.5 };
    const eased = { x: 0.5, y: 0.5 };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) / r.width;
      mouse.y = 1 - (e.clientY - r.top) / r.height;
    };

    let raf = 0;
    let running = true;
    const start = performance.now();

    const frame = (now: number) => {
      if (!running) return;
      resize();
      eased.x += (mouse.x - eased.x) * 0.05;
      eased.y += (mouse.y - eased.y) * 0.05;

      const r = canvas.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -r.top / Math.max(r.height, 1)));

      gl.uniform2f(uRes, w, h);
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uMouse, eased.x, eased.y);
      gl.uniform1f(uScroll, progress);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(([e]) => {
      running = e.isIntersecting && !document.hidden;
      cancelAnimationFrame(raf);
      if (running) raf = requestAnimationFrame(frame);
    });
    io.observe(canvas);

    const onVis = () => {
      running = !document.hidden;
      cancelAnimationFrame(raf);
      if (running) raf = requestAnimationFrame(frame);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    resize();
    raf = requestAnimationFrame(frame);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}
