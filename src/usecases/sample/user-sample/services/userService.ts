// src/services/userService.ts
/**
 * ユーザー関連のビジネスロジック
 */
import { UserRepository } from '../repositories/userRepository'
import type { User, CreateUserRequest } from '../types/user'

export class UserService {
  /**
   * ユーザー一覧を取得し、必要に応じてデータを加工
   */
  static async getUsers(): Promise<User[]> {
    try {
      const users = await UserRepository.getUsers()
      return users
    } catch (error) {
      console.error('ユーザー取得エラー:', error)
      throw error
    }
  }

  /**
   * ユーザーを作成
   */
  static async createUser(userData: CreateUserRequest): Promise<User> {
    try {
      if (!userData.email.includes('@')) {
        throw new Error('無効なメールアドレス形式です')
      }
      return await UserRepository.createUser(userData)
    } catch (error) {
      console.error('ユーザー作成エラー:', error)
      throw error
    }
  }

  /**
   * ユーザーを ID で取得
   */
  static async getUserById(userId: string): Promise<User> {
    try {
      return await UserRepository.getUserById(userId)
    } catch (error) {
      console.error('ユーザー取得エラー:', error)
      throw error
    }
  }

  /**
   * ユーザーを更新
   */
  static async updateUser(user: { id: string; name: string; email: string }): Promise<User> {
    try {
      return await UserRepository.updateUser(user)
    } catch (error) {
      console.error('ユーザー更新エラー:', error)
      throw error
    }
  }
}
