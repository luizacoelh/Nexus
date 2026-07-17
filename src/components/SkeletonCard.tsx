export default function SkeletonCard() {
  return (
    <div className="w-full border border-zinc-800 rounded-2xl bg-zinc-900/40 p-5 space-y-4 animate-pulse">
      {/* Topo do Card (Icone / Categoria) */}
      <div className="flex items-center justify-between">
        <div className="h-3 bg-zinc-800 rounded-md w-1/4" />
        <div className="h-4 w-4 bg-zinc-800 rounded-full" />
      </div>

      {/* Conteúdo Central (Título / Descrição) */}
      <div className="space-y-2">
        <div className="h-5 bg-zinc-800 rounded-md w-3/4" />
        <div className="h-3 bg-zinc-800 rounded-md w-1/2" />
      </div>

      {/* Rodapé do Card */}
      <div className="pt-3 border-t border-zinc-800/60 flex justify-between items-center">
        <div className="h-3 bg-zinc-800 rounded-md w-1/3" />
        <div className="h-4 w-12 bg-zinc-800 rounded-full" />
      </div>
    </div>
  )
}