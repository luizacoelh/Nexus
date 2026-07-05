import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function getValidUserId(): Promise<string | null> {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) return null

  const dbUser = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  })

  return dbUser?.id || null
}