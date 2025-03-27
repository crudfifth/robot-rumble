import type { User } from '@/usecases/shared/types/user'

const initialMockUsers: User[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `ユーザー${i + 1}`,
  userType: i % 2 === 0 ? '一般' : '管理者',
  role: i % 2 === 0 ? '自治体' : '代理登録機関(自治体)',
  accountStatus: i % 2 === 0 ? '利用中' : '停止中',
}))

export const mockUsers: User[] = [...initialMockUsers]

export const getMockUsers = () => [...mockUsers]

export const addMockUser = (user: Omit<User, 'id'>) => {
  const newId = mockUsers.length + 1
  const newUser: User = { id: newId, ...user }
  mockUsers.push(newUser)
  return newUser
}
