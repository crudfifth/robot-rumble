import type { User } from '@/usecases/shared/types/user'

export const fetchUsers = async (filters?: Record<string, string>): Promise<User[]> => {
  const queryParams = new URLSearchParams(filters).toString()
  const response = await fetch(`/api/users?${queryParams}`)
  if (!response.ok) throw new Error('Failed to fetch users')
  return await response.json()
}

export const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to create user')
  }

  return await response.json()
}
