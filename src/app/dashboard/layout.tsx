import Sidebar from "@/components/Sidebar"
import { Toaster } from "sonner" 

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

      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#18181b",
            border: "1px solid #27272a",
            color: "#f4f4f5",
          },
        }}
      />
    </div>
  )
}