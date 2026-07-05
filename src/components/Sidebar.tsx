"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Target, CheckSquare, FileText, LayoutDashboard } from "lucide-react"
import LogoutButton from "@/components/LogoutButton"

const navItems = [
  { href: "/dashboard", label: "Início", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/goals", label: "Metas", icon: Target, exact: false },
  { href: "/dashboard/tasks", label: "Tarefas", icon: CheckSquare, exact: false },
  { href: "/dashboard/notes", label: "Notas", icon: FileText, exact: false },
]

export default function Sidebar() {
  const pathname = usePathname()

  function isActive(href: string, exact: boolean) {
    return exact ? pathname === href : pathname.startsWith(href)
  }

  return (
    <aside className="flex flex-col w-56 shrink-0 border-r border-zinc-800 bg-zinc-950 min-h-screen p-4">
      <div className="mb-8 px-3">
        <span className="text-lg font-bold bg-linear-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
          Nexus
        </span>
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map(({ href, label, icon: Icon, exact }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive(href, exact)
                ? "bg-violet-500/10 text-violet-400"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
            }`}
          >
            <Icon className="w-4 h-4 shrink-0" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-zinc-800 pt-3 mt-3">
        <LogoutButton />
      </div>
    </aside>
  )
}