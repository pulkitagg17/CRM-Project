"use client"

import { useState, useEffect } from "react"
import { type User, getCurrentUser, setCurrentUser, findUserByEmail, saveUser } from "@/lib/local-storage"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Simulate brief loading
    await new Promise((resolve) => setTimeout(resolve, 300))

    const existingUser = findUserByEmail(email)
    if (existingUser) {
      // Immediately update user state to trigger dashboard redirect
      setCurrentUser(existingUser)
      setUser(existingUser)
      return { success: true, user: existingUser }
    }
    return { success: false, error: "Invalid email or password" }
  }

  const register = async (email: string, password: string, name: string) => {
    // Simulate brief loading
    await new Promise((resolve) => setTimeout(resolve, 300))

    const existingUser = findUserByEmail(email)
    if (existingUser) {
      return { success: false, error: "User already exists with this email" }
    }

    // Create user and immediately sign them in
    const newUser = saveUser({ email, name })
    setCurrentUser(newUser)
    setUser(newUser)
    return { success: true, user: newUser }
  }

  const logout = () => {
    setCurrentUser(null)
    setUser(null)
  }

  return {
    user,
    loading,
    login,
    register,
    logout,
  }
}
