"use client"

import { useState } from "react"
import GoalCard from "@/components/GoalCard"
import { Target, ListFilter } from "lucide-react"

// Tipagem alinhada perfeitamente com o seu GoalCard e seu Prisma
interface Goal {
  id: string
  title: string
  description: string | null
  status: "ACTIVE" | "COMPLETED" | "ARCHIVED"
}

interface GoalListProps {
  initialGoals: Goal[]
}

type GoalStatusFilter = "ALL" | "ACTIVE" | "COMPLETED" | "ARCHIVED"

export default function GoalList({ initialGoals }: GoalListProps) {
  const [statusFilter, setStatusFilter] = useState<GoalStatusFilter>("ALL")

  // Filtra o array de metas em memória
  const filteredGoals = initialGoals.filter((goal) => {
    if (statusFilter === "ALL") return true
    return goal.status === statusFilter
  })

  return (
    <div className="space-y-6">
      {/* Barra de Filtros */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 border-b border-zinc-900">
        <ListFilter className="w-4 h-4 text-zinc-500 shrink-0" />
        
        <button
          onClick={() => setStatusFilter("ALL")}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition shrink-0 ${
            statusFilter === "ALL"
              ? "bg-violet-600 text-white"
              : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
          }`}
        >
          Todas ({initialGoals.length})
        </button>

        <button
          onClick={() => setStatusFilter("ACTIVE")}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition shrink-0 ${
            statusFilter === "ACTIVE"
              ? "bg-zinc-100 text-zinc-950"
              : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
          }`}
        >
          Em Andamento ({initialGoals.filter(g => g.status === "ACTIVE").length})
        </button>

        <button
          onClick={() => setStatusFilter("COMPLETED")}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition shrink-0 ${
            statusFilter === "COMPLETED"
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
          }`}
        >
          Concluídas ({initialGoals.filter(g => g.status === "COMPLETED").length})
        </button>

        <button
          onClick={() => setStatusFilter("ARCHIVED")}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition shrink-0 ${
            statusFilter === "ARCHIVED"
              ? "bg-zinc-800 text-zinc-300 border border-zinc-700"
              : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
          }`}
        >
          Arquivadas ({initialGoals.filter(g => g.status === "ARCHIVED").length})
        </button>
      </div>

      {/* Grid de Resultados */}
      {filteredGoals.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center p-12 border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/10">
          <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-600 mb-4">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-md font-medium text-zinc-300">Nenhuma meta encontrada</h3>
          <p className="text-xs text-zinc-500 max-w-sm mt-1">
            Não há objetivos correspondentes ao filtro selecionado.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGoals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </div>
      )}
    </div>
  )
}