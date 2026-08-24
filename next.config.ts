import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * Artwork in /media is served with a `?v=<stamp>` cache key so that
     * replacing a file actually shows the new picture — without it, both the
     * Next image optimiser and the browser keep serving the previous one, which
     * is indistinguishable from a failed import.
     *
     * `search` is deliberately omitted for /media so any stamp is accepted; the
     * stamps are derived from file size and mtime and so cannot be enumerated
     * here. The documented risk of omitting it is that someone could request
     * arbitrary query strings and make the optimiser redo work. That is bounded
     * to files we already publish under this one directory, and no other path
     * is optimisable, so it cannot be used to reach anything private.
     *
     * Everything under /brand is pinned to no query string at all.
     */
    localPatterns: [
      { pathname: "/media/**" },
      { pathname: "/brand/**", search: "" },
    ],
  },
};

export default nextConfig;
