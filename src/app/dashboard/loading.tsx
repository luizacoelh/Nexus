export default function DashboardLoading() {
  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 sm:space-y-8 text-zinc-100 animate-pulse">
      {/* Header Skeleton */}
      <div className="border-b border-zinc-800 pb-4 space-y-2">
        <div className="h-8 bg-zinc-900 rounded-lg w-24" />
        <div className="h-4 bg-zinc-900 rounded-lg w-44" />
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 sm:p-5 border border-zinc-800 rounded-xl bg-zinc-900/40 space-y-4">
            <div className="space-y-2">
              <div className="h-3 bg-zinc-800 rounded-md w-1/3" />
              <div className="h-8 bg-zinc-800 rounded-md w-1/4" />
            </div>
            <div className="space-y-1.5 pt-3 border-t border-zinc-800/60">
              <div className="h-3 bg-zinc-800 rounded-md w-1/2" />
              <div className="h-3 bg-zinc-800 rounded-md w-2/3" />
            </div>
          </div>
        ))}
      </div>

      {/* Lists Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Metas Recentes */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="h-4 bg-zinc-900 rounded-md w-28" />
            <div className="h-3 bg-zinc-900 rounded-md w-16" />
          </div>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-11 border border-zinc-800 rounded-lg bg-zinc-900/40" />
            ))}
          </div>
        </div>

        {/* Tarefas Recentes */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="h-4 bg-zinc-900 rounded-md w-28" />
            <div className="h-3 bg-zinc-900 rounded-md w-16" />
          </div>
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-11 border border-zinc-800 rounded-lg bg-zinc-900/40" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}