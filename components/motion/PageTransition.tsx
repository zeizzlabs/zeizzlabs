"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

/**
 * Route transitions.
 *
 * Next's App Router swaps the tree the moment navigation resolves, which reads
 * as a hard cut. This intercepts the click, plays an exit animation, pushes the
 * route only once the curtain is closed, then plays the entrance — so pages
 * hand over to each other instead of blinking.
 *
 * Use <TransitionLink> for internal navigation; plain <a> still works and
 * simply gets the default behaviour.
 */
const Ctx = createContext<{ navigate: (href: string) => void }>({
  navigate: () => {},
});

export const usePageTransition = () => useContext(Ctx);

export function PageTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const curtain = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const busy = useRef(false);

  const navigate = useCallback(
    (href: string) => {
      if (busy.current) return;
      if (href === pathname) return;

      if (prefersReducedMotion()) {
        router.push(href);
        return;
      }

      busy.current = true;
      const tl = gsap.timeline({
        onComplete: () => router.push(href),
      });
      // Curtain closes from the bottom up, mark fades in behind it.
      tl.set(curtain.current, { display: "block", clipPath: "inset(100% 0 0 0)" })
        .to(curtain.current, {
          clipPath: "inset(0% 0 0 0)",
          duration: 0.75,
          ease: "zeizz",
        })
        .fromTo(
          markRef.current,
          { autoAlpha: 0, scale: 0.85 },
          { autoAlpha: 1, scale: 1, duration: 0.4 },
          "-=0.35"
        );
    },
    [pathname, router]
  );

  // Entrance: runs whenever the path actually changes.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = curtain.current;
    if (!el || getComputedStyle(el).display === "none") return;

    window.scrollTo(0, 0);
    (window as unknown as { lenis?: { scrollTo: (v: number, o?: object) => void } })
      .lenis?.scrollTo(0, { immediate: true });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(el, { display: "none" });
        busy.current = false;
        ScrollTrigger.refresh();
      },
    });
    tl.to(markRef.current, { autoAlpha: 0, duration: 0.3 }).to(
      el,
      { clipPath: "inset(0 0 100% 0)", duration: 0.85, ease: "zeizz" },
      "-=0.1"
    );
  }, [pathname]);

  return (
    <Ctx.Provider value={{ navigate }}>
      {children}
      <div
        ref={curtain}
        aria-hidden
        className="fixed inset-0 z-[180] hidden bg-canvas"
        style={{ clipPath: "inset(100% 0 0 0)" }}
      >
        <div className="grid-lines absolute inset-0 opacity-25" />
        <div
          ref={markRef}
          className="absolute inset-0 grid place-items-center opacity-0"
        >
          <span className="wordmark text-3xl sm:text-5xl">ZeizzLabs</span>
        </div>
      </div>
    </Ctx.Provider>
  );
}

/** Internal link that routes through the curtain. */
export function TransitionLink({
  href,
  children,
  className,
  ...rest
}: {
  href: string;
  children: ReactNode;
  className?: string;
} & Omit<React.ComponentProps<"a">, "href">) {
  const { navigate } = usePageTransition();
  const isInternal = href.startsWith("/") && !href.startsWith("/#");

  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        if (!isInternal || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        navigate(href);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
