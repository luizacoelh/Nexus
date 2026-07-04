"use client"

import { useState } from "react"
import { updateNote, deleteNote } from "@/app/actions/notes"
import { Trash2, Edit2, Check, X, Loader2, Tag, Target } from "lucide-react"

type Goal = { id: string; title: string }

interface NoteCardProps {
  note: {
    id: string
    title: string
    content: string
    tag: "STUDY" | "BOOK" | "MOVIE" | "COURSE" | "GENERAL" | null
    goal: Goal | null
  }
  goals: Goal[]
}

const tagStyles = {
  STUDY: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  BOOK: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  MOVIE: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  COURSE: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  GENERAL: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
}

export default function NoteCard({ note, goals }: NoteCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [editTitle, setEditTitle] = useState(note.title)
  const [editContent, setEditContent] = useState(note.content)
  const [editTag, setEditTag] = useState(note.tag || "")
  const [editGoalId, setEditGoalId] = useState(note.goal?.id || "")

  async function handleUpdate() {
    if (!editTitle.trim() || !editContent.trim()) return
    setIsLoading(true)

    await updateNote({
      id: note.id,
      title: editTitle,
      content: editContent,
      tag: (editTag || null) as "STUDY" | "BOOK" | "MOVIE" | "COURSE" | "GENERAL" | null,
      goalId: editGoalId || null,
    })

    setIsLoading(false)
    setIsEditing(false)
  }

  async function handleDelete() {
    if (!confirm("Remover esta nota permanentemente?")) return
    setIsLoading(true)
    await deleteNote(note.id)
    setIsLoading(false)
  }

  return (
    <div className="group flex flex-col justify-between p-5 border border-zinc-800 rounded-xl bg-zinc-900/40 hover:border-zinc-700 transition-all duration-200 hover:shadow-md hover:shadow-black/40 text-zinc-100">
      {isEditing ? (
        <div className="space-y-3 w-full">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-sm focus:outline-none focus:border-violet-500 text-zinc-100"
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            rows={3}
            className="w-full bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-sm focus:outline-none focus:border-violet-500 text-zinc-100 resize-none"
          />
          <select
            value={editTag}
            onChange={(e) => setEditTag(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-sm focus:outline-none focus:border-violet-500 text-zinc-100"
          >
            <option value="">Sem tag</option>
            <option value="STUDY">STUDY</option>
            <option value="BOOK">BOOK</option>
            <option value="MOVIE">MOVIE</option>
            <option value="COURSE">COURSE</option>
            <option value="GENERAL">GENERAL</option>
          </select>
          <select
            value={editGoalId}
            onChange={(e) => setEditGoalId(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-sm focus:outline-none focus:border-violet-500 text-zinc-100"
          >
            <option value="">Sem meta vinculada</option>
            {goals.map((g) => (
              <option key={g.id} value={g.id}>{g.title}</option>
            ))}
          </select>

          <div className="flex justify-end gap-2 pt-2 border-t border-zinc-800/60">
            <button type="button" onClick={() => setIsEditing(false)} disabled={isLoading} className="p-1 text-zinc-400 hover:text-zinc-200">
              <X className="w-4 h-4" />
            </button>
            <button type="button" onClick={handleUpdate} disabled={isLoading} className="p-1 text-emerald-400 hover:text-emerald-300">
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-3 w-full">
            <div className="flex justify-between items-start gap-2">
              <h3 className="font-semibold text-zinc-200 group-hover:text-violet-400 transition-colors line-clamp-1">
                {note.title}
              </h3>
              {note.tag && (
                <span className={`text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full border ${tagStyles[note.tag]}`}>
                  {note.tag}
                </span>
              )}
            </div>

            <p className="text-sm text-zinc-400 line-clamp-4 whitespace-pre-wrap wrap-break-word">
              {note.content}
            </p>
          </div>

          <div className="flex items-center justify-between text-xs text-zinc-500 mt-4 pt-4 border-t border-zinc-800/60 w-full">
            <div className="flex items-center gap-1.5 max-w-[70%]">
              {note.goal ? (
                <>
                  <Target className="w-3.5 h-3.5 text-violet-500 shrink-0" />
                  <span className="truncate text-zinc-400">
                    Meta: <span className="text-violet-400">{note.goal.title}</span>
                  </span>
                </>
              ) : (
                <>
                  <Tag className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                  <span className="text-zinc-600">Nota avulsa</span>
                </>
              )}
            </div>

            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                disabled={isLoading}
                className="p-1 text-zinc-400 hover:text-violet-400 transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isLoading}
                className="p-1 text-zinc-400 hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}