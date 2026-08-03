export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-8 space-y-3">
        <div className="h-4 w-32 animate-pulse rounded bg-muted" />
        <div className="h-8 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
      </div>
      <div className="grid grid-cols-1 gap-3 xl:grid-cols-2 2xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-44 animate-pulse rounded-lg border bg-card p-4"
          >
            <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
            <div className="mt-3 h-3 w-full animate-pulse rounded bg-muted" />
            <div className="mt-2 h-3 w-4/5 animate-pulse rounded bg-muted" />
            <div className="mt-4 h-8 w-40 animate-pulse rounded bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}
