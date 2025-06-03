export interface User {
  id: string
  email: string
  name: string
  createdAt: string
}

export const localStorageKeys = {
  users: "minimal-app-users",
  currentUser: "minimal-app-current-user",
} as const

export function getUsers(): User[] {
  if (typeof window === "undefined") return []
  const users = localStorage.getItem(localStorageKeys.users)
  return users ? JSON.parse(users) : []
}

export function saveUser(user: Omit<User, "id" | "createdAt">): User {
  const users = getUsers()
  const newUser: User = {
    ...user,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  }

  const updatedUsers = [...users, newUser]
  localStorage.setItem(localStorageKeys.users, JSON.stringify(updatedUsers))
  return newUser
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null
  const user = localStorage.getItem(localStorageKeys.currentUser)
  return user ? JSON.parse(user) : null
}

export function setCurrentUser(user: User | null): void {
  if (user) {
    localStorage.setItem(localStorageKeys.currentUser, JSON.stringify(user))
  } else {
    localStorage.removeItem(localStorageKeys.currentUser)
  }
}

export function findUserByEmail(email: string): User | null {
  const users = getUsers()
  return users.find((user) => user.email === email) || null
}
