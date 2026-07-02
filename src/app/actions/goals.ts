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
interface UpdateGoalInput {
  id: string
  title?: string
  description?: string
  status?: GoalStatus
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

export async function getGoals() {
  try {
    const session = await getServerSession(authOptions)
    const user = session?.user as { id?: string; name?: string; email?: string } | undefined

    if (!user?.id) {
      throw new Error("Não autorizado. Você precisa estar logado para ver as metas.")
    }

    const goals = await prisma.goal.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        title: "asc", 
      },
    })

    return { success: true, goals }
  } catch (error) {
    console.error("Erro ao listar metas:", error)
    return { success: false, error: "Falha ao buscar as metas no banco de dados." }
  }
}

export async function updateGoal(data: UpdateGoalInput) {
  try {
    const session = await getServerSession(authOptions)
    const user = session?.user as { id?: string; name?: string; email?: string } | undefined

    if (!user?.id) {
      throw new Error("Não autorizado. Você precisa estar logado para editar uma meta.")
    }

    const updatedGoal = await prisma.goal.update({
      where: {
        id: data.id,
        userId: user.id, 
      },
      data: {
        title: data.title,
        description: data.description !== undefined ? (data.description || null) : undefined,
        status: data.status,
      },
    })

    revalidatePath("/dashboard/goals")

    return { success: true, goal: updatedGoal }
  } catch (error) {
    console.error("Erro ao editar meta:", error)
    return { success: false, error: "Falha ao atualizar a meta no banco de dados." }
  }
}

export async function deleteGoal(id: string) {
  try {
    const session = await getServerSession(authOptions)
    const user = session?.user as { id?: string; name?: string; email?: string } | undefined

    if (!user?.id) {
      throw new Error("Não autorizado. Você precisa estar logado para deletar uma meta.")
    }

    await prisma.goal.delete({
      where: {
        id: id,
        userId: user.id, 
      },
    })

    revalidatePath("/dashboard/goals")

    return { success: true }
  } catch (error) {
    console.error("Erro ao deletar meta:", error)
    return { success: false, error: "Falha ao remover a meta do banco de dados." }
  }
}