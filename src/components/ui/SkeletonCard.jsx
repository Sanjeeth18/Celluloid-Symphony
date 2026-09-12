import React from "react";

/**
 * Reusable skeleton shimmer card - replaces duplicated shimmer in 4+ components
 * @param {string} variant - "detail" (full-width detail) | "grid" (card grid) | "hero" (big hero)
 */
function SkeletonCard({ variant = "grid", count = 1 }) {
  if (variant === "detail") {
    return (
      <div className="p-4 min-h-screen" style={{ background: "var(--color-bg-primary)" }}>
        <div className="container mx-auto p-4">
          <div
            className="flex flex-col md:flex-row rounded-2xl shadow-xl animate-pulse overflow-hidden"
            style={{ background: "var(--color-bg-card)" }}
          >
            {/* Poster skeleton */}
            <div className="w-full md:w-1/3 p-4 flex-shrink-0">
              <div className="h-[60vh] rounded-xl skeleton-shimmer" />
            </div>
            {/* Info skeleton */}
            <div className="w-full md:w-2/3 p-6 space-y-4">
              <div className="h-10 rounded-xl skeleton-shimmer mb-6 w-3/4" />
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-6 rounded-lg skeleton-shimmer" style={{ width: `${75 - i * 8}%` }} />
              ))}
              <div className="h-28 rounded-xl skeleton-shimmer mt-4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "hero") {
    return (
      <div className="py-8 px-10" style={{ background: "var(--color-bg-primary)" }}>
        <div className="h-10 w-64 mx-auto rounded-xl skeleton-shimmer mb-8" />
        <div className="flex gap-6 justify-center overflow-hidden">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-56 h-80 rounded-2xl skeleton-shimmer" />
          ))}
        </div>
      </div>
    );
  }

  // grid variant
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6"
      style={{ background: "var(--color-bg-primary)" }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-2xl overflow-hidden animate-pulse" style={{ background: "var(--color-bg-card)" }}>
          <div className="h-64 skeleton-shimmer" />
          <div className="p-4 space-y-2">
            <div className="h-5 w-3/4 skeleton-shimmer rounded" />
            <div className="h-4 w-1/2 skeleton-shimmer rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default SkeletonCard;
