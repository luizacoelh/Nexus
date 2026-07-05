"use server"

import { NoteTag } from "@/generated/prisma/client"
import { prisma } from "@/lib/prisma"
import { getValidUserId } from "@/lib/session"
import { revalidatePath } from "next/cache"

interface CreateNoteInput {
  title: string
  content: string
  tag?: "STUDY" | "BOOK" | "MOVIE" | "COURSE" | "GENERAL"
  goalId?: string
}

interface UpdateNoteInput {
  id: string
  title?: string
  content?: string
  tag?: "STUDY" | "BOOK" | "MOVIE" | "COURSE" | "GENERAL" | null
  goalId?: string | null
}

export async function createNote(data: CreateNoteInput) {
  try {
    const userId = await getValidUserId()
    if (!userId) throw new Error("Não autorizado.")

    const newNote = await prisma.note.create({
      data: {
        title: data.title,
        content: data.content,
        tag: data.tag as NoteTag || null,
        goalId: data.goalId || null,
        userId,
      },
    })

    revalidatePath("/dashboard/notes")
    return { success: true, note: newNote }
  } catch (error) {
    console.error("Erro ao criar nota:", error)
    return { success: false, error: "Falha ao registrar a nota." }
  }
}

export async function getNotes() {
  try {
    const userId = await getValidUserId()
    if (!userId) throw new Error("Não autorizado.")

    const notes = await prisma.note.findMany({
      where: { userId },
      include: {
        goal: { select: { id: true, title: true } },
      },
      orderBy: { createdAt: "desc" },
    })

    return { success: true, notes }
  } catch (error) {
    console.error("Erro ao listar notas:", error)
    return { success: false, error: "Falha ao buscar as notas." }
  }
}

export async function updateNote(data: UpdateNoteInput) {
  try {
    const userId = await getValidUserId()
    if (!userId) throw new Error("Não autorizado.")

    const updatedNote = await prisma.note.update({
      where: {
        id: data.id,
        userId,
      },
      data: {
        title: data.title,
        content: data.content,
        tag: data.tag !== undefined ? (data.tag as NoteTag | null) : undefined,
        goalId: data.goalId !== undefined ? (data.goalId || null) : undefined,
      },
    })

    revalidatePath("/dashboard/notes")
    return { success: true, note: updatedNote }
  } catch (error) {
    console.error("Erro ao editar nota:", error)
    return { success: false, error: "Falha ao atualizar a nota." }
  }
}

export async function deleteNote(id: string) {
  try {
    const userId = await getValidUserId()
    if (!userId) throw new Error("Não autorizado.")

    await prisma.note.delete({
      where: { id, userId },
    })

    revalidatePath("/dashboard/notes")
    return { success: true }
  } catch (error) {
    console.error("Erro ao deletar nota:", error)
    return { success: false, error: "Falha ao remover a nota." }
  }
}