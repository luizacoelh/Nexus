import { getGoals } from "@/app/actions/goals"
import CreateGoalModal from "@/components/CreateGoalModal"
import GoalCard from "@/components/GoalCard" 
import { Target } from "lucide-react"

export default async function GoalsPage() {
  const response = await getGoals()
  const goals = response.success && response.goals ? response.goals : []

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 text-zinc-100">
      {}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800 pb-5">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            Minhas Metas
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Gerencie e acompanhe os hubs centrais dos seus objetivos.
          </p>
        </div>
        
        <CreateGoalModal />
      </div>

      {}
      {goals.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center p-12 border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/20 backdrop-blur-sm">
          <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-500 mb-4">
            <Target className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-semibold text-zinc-200">Nenhuma meta encontrada</h3>
          <p className="text-sm text-zinc-400 max-w-sm mt-1">
            Você ainda não registrou nenhum objetivo estratégico no Nexus. Comece criando a sua primeira meta!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {goals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </div>
      )}
    </div>
  )
}