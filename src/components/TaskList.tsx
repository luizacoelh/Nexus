"use client"

import { useState } from "react"
import TaskCard from "@/components/TaskCard"
import { CheckSquare, ListFilter } from "lucide-react"

interface Goal {
  id: string
  title: string
  [key: string]: unknown
}

interface Task {
  id: string
  title: string
  status: "TODO" | "DOING" | "DONE" // <-- REMOVIDO O "ALL" DAQUI!
  priority: "LOW" | "MEDIUM" | "HIGH"
  dueDate: Date | null
  goal: Goal | null
}

interface TaskListProps {
  initialTasks: Task[]
  goals: Goal[]
}

type StatusFilter = "ALL" | "TODO" | "DOING" | "DONE"

export default function TaskList({ initialTasks, goals }: TaskListProps) {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL")

  // Filtra as tarefas em memória baseando-se no botão ativo
  const filteredTasks = initialTasks.filter((task) => {
    if (statusFilter === "ALL") return true
    return task.status === statusFilter
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
          Todas ({initialTasks.length})
        </button>

        <button
          onClick={() => setStatusFilter("TODO")}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition shrink-0 ${
            statusFilter === "TODO"
              ? "bg-zinc-100 text-zinc-950"
              : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
          }`}
        >
          A Fazer ({initialTasks.filter(t => t.status === "TODO").length})
        </button>

        <button
          onClick={() => setStatusFilter("DOING")}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition shrink-0 ${
            statusFilter === "DOING"
              ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
              : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
          }`}
        >
          Em Andamento ({initialTasks.filter(t => t.status === "DOING").length})
        </button>

        <button
          onClick={() => setStatusFilter("DONE")}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition shrink-0 ${
            statusFilter === "DONE"
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
          }`}
        >
          Concluídas ({initialTasks.filter(t => t.status === "DONE").length})
        </button>
      </div>

      {/* Grid de Resultados */}
      {filteredTasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center p-12 border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/10">
          <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-600 mb-4">
            <CheckSquare className="w-6 h-6" />
          </div>
          <h3 className="text-md font-medium text-zinc-300">Nenhuma tarefa por aqui</h3>
          <p className="text-xs text-zinc-500 max-w-sm mt-1">
            Não há tarefas correspondentes ao filtro &quot;{statusFilter === "ALL" ? "Todas" : statusFilter}&quot;.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} goals={goals} />
          ))}
        </div>
      )}
    </div>
  )
}