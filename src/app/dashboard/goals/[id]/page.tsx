import { getGoalById } from "@/app/actions/goals"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, CheckSquare, FileText, Flag, Calendar, Tag } from "lucide-react"

const statusStyles = {
  TODO: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
  DOING: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  DONE: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
}

const priorityStyles = {
  LOW: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
  MEDIUM: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  HIGH: "bg-red-500/10 text-red-400 border-red-500/20",
}

const tagStyles = {
  STUDY: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  BOOK: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  MOVIE: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  COURSE: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  GENERAL: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
}

export default async function GoalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const res = await getGoalById(id)

  if (!res.success || !res.goal) notFound()

  const { goal } = res

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8 text-zinc-100">
      <div>
        <Link
          href="/dashboard/goals"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-200 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para Metas
        </Link>

        <div className="border-b border-zinc-800 pb-5 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight bg-linear-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            {goal.title}
          </h1>
          {goal.description && (
            <p className="text-sm text-zinc-400">{goal.description}</p>
          )}
          <span className={`inline-block text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full border ${
            goal.status === "COMPLETED"
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
              : goal.status === "ARCHIVED"
              ? "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
              : "bg-violet-500/10 text-violet-400 border-violet-500/20"
          }`}>
            {goal.status}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <CheckSquare className="w-4 h-4 text-zinc-400" />
          <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
            Tarefas vinculadas ({goal.tasks.length})
          </h2>
        </div>

        {goal.tasks.length === 0 ? (
          <p className="text-sm text-zinc-500 pl-6">Nenhuma tarefa vinculada a essa meta.</p>
        ) : (
          <div className="space-y-2">
            {goal.tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-4 border border-zinc-800 rounded-xl bg-zinc-900/40"
              >
                <div className="space-y-1 min-w-0">
                  <p className="text-sm font-medium text-zinc-200 truncate">{task.title}</p>
                  <div className="flex items-center gap-1.5 text-zinc-500">
                    <Calendar className="w-3 h-3" />
                    <span className="text-xs">
                      {task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString("pt-BR")
                        : "Sem prazo"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-4">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${priorityStyles[task.priority]}`}>
                    <Flag className="w-2.5 h-2.5 inline mr-0.5" />
                    {task.priority}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusStyles[task.status]}`}>
                    {task.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-zinc-400" />
          <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
            Notas vinculadas ({goal.notes.length})
          </h2>
        </div>

        {goal.notes.length === 0 ? (
          <p className="text-sm text-zinc-500 pl-6">Nenhuma nota vinculada a essa meta.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {goal.notes.map((note) => (
              <div
                key={note.id}
                className="p-4 border border-zinc-800 rounded-xl bg-zinc-900/40 space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-zinc-200 truncate">{note.title}</p>
                  {note.tag && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${tagStyles[note.tag]}`}>
                      <Tag className="w-2.5 h-2.5 inline mr-0.5" />
                      {note.tag}
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-400 line-clamp-3 whitespace-pre-wrap">
                  {note.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}