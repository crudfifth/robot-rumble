// src/repositories/userRepository.ts
/**
 * ユーザー関連のAPI通信を担当するリポジトリ
 */
import { createHttpClient } from '../../../common/services/httpClientProvider'
import type { User, CreateUserRequest } from '../types/user'

const httpClient = createHttpClient()

export class UserRepository {
  private static BASE_PATH = '/users'

  /**
   * ユーザー一覧を取得
   */
  static async getUsers(): Promise<User[]> {
    const response = await httpClient.get<User[]>(this.BASE_PATH)
    return response.data
  }

  /**
   * ユーザーを作成
   */
  static async createUser(request: CreateUserRequest): Promise<User> {
    const response = await httpClient.post<User>(this.BASE_PATH, request)
    return response.data
  }

  /**
   * ユーザーを ID で取得
   */
  static async getUserById(userId: string): Promise<User> {
    const response = await httpClient.get<User>(`${this.BASE_PATH}/${userId}`)
    return response.data
  }

  /**
   * ユーザーを更新
   */
  static async updateUser(user: { id: string; name: string; email: string }): Promise<User> {
    const response = await httpClient.put<User>(`${this.BASE_PATH}/${user.id}`, user)
    return response.data
  }
}
