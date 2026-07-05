"use client"

import { signOut } from "next-auth/react"
import { LogOut } from "lucide-react"

export default function LogoutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-zinc-400 hover:text-red-400 hover:bg-red-500/5 rounded-lg transition-colors"
    >
      <LogOut className="w-4 h-4" />
      Sair
    </button>
  )
}