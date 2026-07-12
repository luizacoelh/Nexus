import { getGoals } from "@/app/actions/goals"
import CreateGoalModal from "@/components/CreateGoalModal"
import GoalList from "@/components/GoalList"

export default async function GoalsPage() {
  const response = await getGoals()
  const goals = response.success && response.goals ? response.goals : []

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 text-zinc-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800 pb-5">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            Metas
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Acompanhe seus objetivos a longo prazo.
          </p>
        </div>
        
        <CreateGoalModal />
      </div>

      <GoalList initialGoals={goals} />
    </div> 
  )
}