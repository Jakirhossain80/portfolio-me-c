export default function Loading() {
  return (
    <div className="flex min-h-[60svh] items-center justify-center" role="status">
      <span className="sr-only">Loading…</span>
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-accent" />
    </div>
  );
}
