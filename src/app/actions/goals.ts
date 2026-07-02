"use server"

import { GoalStatus } from "@/generated/prisma/client"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth/next"
import { revalidatePath } from "next/cache"

interface CreateGoalInput {
  title: string
  description?: string
}

export async function createGoal(data: CreateGoalInput) {
  try {
    const session = await getServerSession(authOptions)
    
    const user = session?.user as { id?: string; name?: string; email?: string } | undefined

    if (!user?.id) {
      throw new Error("Não autorizado. Você precisa estar logado para criar uma meta.")
    }

    const newGoal = await prisma.goal.create({
      data: {
        title: data.title,
        description: data.description || null,
        status: GoalStatus.ACTIVE,
        userId: user.id, 
      },
    })

    revalidatePath("/dashboard/goals")

    return { success: true, goal: newGoal }
  } catch (error) {
    console.error("Erro ao criar meta:", error)
    return { success: false, error: "Falha ao registrar a meta no banco de dados." }
  }
}