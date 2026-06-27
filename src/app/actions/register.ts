"use server" 

import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  
  if (!name || !email || !password) {
    return { error: "Por favor, preencha todos os campos." }
  }

  try {
    
    const userExists = await prisma.user.findUnique({
      where: { email },
    })

    if (userExists) {
      return { error: "Este e-mail já está cadastrado." }
    }

    
    const hashedPassword = await bcrypt.hash(password, 10)

    
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    return { success: "Usuário criado com sucesso!" }
  } catch (error) {
    console.error("Erro no cadastro:", error)
    return { error: "Ocorreu um erro interno. Tente novamente." }
  }
}