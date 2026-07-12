import { getTasks } from "@/app/actions/tasks"
import { getGoals } from "@/app/actions/goals"
import CreateTaskModal from "@/components/CreateTaskModal"
import TaskList from "@/components/TaskList"  


export default async function TasksPage() {
  const [tasksRes, goalsRes] = await Promise.all([getTasks(), getGoals()])

  const tasks = tasksRes.success && tasksRes.tasks ? tasksRes.tasks : []
  const goals = goalsRes.success && goalsRes.goals ? goalsRes.goals : []

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 text-zinc-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800 pb-5">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-linear-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            Tarefas
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Gerencie o que precisa ser feito.
          </p>
        </div>
        <CreateTaskModal goals={goals} />
      </div>

      {/* Repassamos as tarefas brutas do banco para o gerenciador de filtros */}
      <TaskList initialTasks={tasks} goals={goals} />
    </div>
  )
}