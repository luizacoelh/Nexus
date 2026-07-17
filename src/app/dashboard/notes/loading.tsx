import SkeletonCard from "@/components/SkeletonCard"

export default function SubPageLoading() {
  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 text-zinc-100 animate-pulse">
      {/* Título e Botão */}
      <div className="flex justify-between items-center border-b border-zinc-800 pb-5">
        <div className="space-y-2">
          <div className="h-8 bg-zinc-900 rounded-lg w-32" />
          <div className="h-4 bg-zinc-900 rounded-lg w-52" />
        </div>
        <div className="h-10 bg-zinc-900 rounded-lg w-28" />
      </div>

      {/* Filtros da Barra Superior */}
      <div className="h-9 bg-zinc-900/50 border border-zinc-800 rounded-xl w-full max-w-md" />

      {/* Grid de Cards simulando o layout final */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  )
}