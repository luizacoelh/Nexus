import Sidebar from "@/components/Sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-zinc-950">
      <Sidebar />
      
      <main className="flex-1 pt-16 md:pt-0 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}