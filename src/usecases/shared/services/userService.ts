import type { User } from '@/usecases/shared/types/user'

export const formatUserData = (users: User[]) => {
  return users.map((user) => ({
    id: user.id,
    ID: user.id,
    ユーザ氏名: user.name,
    ユーザ区分: user.userType,
    ロール: user.role,
    アカウント状態: user.accountStatus,
  }))
}
