"use client"

import { useState } from "react"
import { createNote } from "@/app/actions/notes"
import { Plus, X, Loader2 } from "lucide-react"
import { toast } from "sonner"

type Goal = { id: string; title: string }

interface CreateNoteModalProps {
  goals: Goal[]
}

export default function CreateNoteModal({ goals }: CreateNoteModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tag, setTag] = useState("")
  const [goalId, setGoalId] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return

    setIsLoading(true)
    setError(false)

    const result = await createNote({
      title,
      content,
      tag: tag ? (tag as "STUDY" | "BOOK" | "MOVIE" | "COURSE" | "GENERAL") : undefined,
      goalId: goalId || undefined,
    })

    setIsLoading(false)

    if (result.success) {
      setTitle("")
      setContent("")
      setTag("")
      setGoalId("")
      setIsOpen(false)
      toast.success("Nota criada com sucesso!")
    } else {
      setError(true)
      toast.error("Não foi possível criar a nota.")
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 transition-colors text-white font-medium px-4 py-2.5 rounded-lg text-sm shadow-lg shadow-violet-900/20"
      >
        <Plus className="w-4 h-4" />
        Nova Nota
      </button>

      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md border border-zinc-800 rounded-2xl bg-zinc-900 p-6 shadow-2xl relative text-zinc-100 cursor-default"
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <h2 className="text-xl font-bold text-zinc-100">Criar Nova Nota</h2>
              <p className="text-xs text-zinc-400 mt-1">Registre insights, sumários ou anotações rápidas.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                  Título *
                </label>
                <input
                  type="text"
                  required
                  disabled={isLoading}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Resumo de Clean Architecture"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-violet-500 disabled:opacity-50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                  Conteúdo *
                </label>
                <textarea
                  required
                  disabled={isLoading}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Escreva suas anotações aqui..."
                  rows={4}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-violet-500 disabled:opacity-50 transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                  Categoria / Tag
                </label>
                <select
                  disabled={isLoading}
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-violet-500 disabled:opacity-50 transition-colors"
                >
                  <option value="">Nenhuma</option>
                  <option value="STUDY">STUDY — Estudos</option>
                  <option value="BOOK">BOOK — Leitura</option>
                  <option value="MOVIE">MOVIE — Audiovisual</option>
                  <option value="COURSE">COURSE — Cursos</option>
                  <option value="GENERAL">GENERAL — Geral</option>
                </select>
              </div>

              {goals.length > 0 && (
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                    Vincular a uma Meta (opcional)
                  </label>
                  <select
                    disabled={isLoading}
                    value={goalId}
                    onChange={(e) => setGoalId(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-violet-500 disabled:opacity-50 transition-colors"
                  >
                    <option value="">Nenhuma</option>
                    {goals.map((g) => (
                      <option key={g.id} value={g.id}>{g.title}</option>
                    ))}
                  </select>
                </div>
              )}

              {error && (
                <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 p-2.5 rounded-lg">
                  Ocorreu um erro ao salvar a nota. Tente novamente.
                </p>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isLoading || !title.trim() || !content.trim()}
                  className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 disabled:bg-zinc-800 disabled:text-zinc-500 transition-colors text-white font-medium px-4 py-2 rounded-lg text-sm"
                >
                  {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Salvar Nota
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}