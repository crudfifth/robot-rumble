import { http } from 'msw'
import { mockUsers, addMockUser } from './mockData/users'
import type { User } from '@/usecases/shared/types/user'

export const handlers = [
  http.post('/api/login', async ({ request }) => {
    try {
      if (request.headers.get('Content-Type') !== 'application/json') {
        return new Response(
          JSON.stringify({ message: 'Content-Typeはapplication/jsonである必要があります' }),
          {
            status: 415,
            headers: { 'Content-Type': 'application/json' },
          },
        )
      }

      let body: { userId?: string; password?: string } = {}
      try {
        const json = await request.json()
        if (typeof json === 'object' && json !== null) {
          body = json as { userId?: string; password?: string }
        }
      } catch {
        return new Response(
          JSON.stringify({ message: 'リクエストが不正です (JSON形式ではありません)' }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          },
        )
      }

      if (!body.userId || !body.password) {
        return new Response(JSON.stringify({ message: 'ユーザーIDまたはパスワードが空です' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        })
      }

      if (body.userId === 'test@example.com' && body.password === 'password') {
        return new Response(JSON.stringify({ message: 'ログイン成功', token: 'mocked_token' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      }

      return new Response(JSON.stringify({ message: '認証失敗' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    } catch (error) {
      return new Response(JSON.stringify({ message: 'サーバーエラーが発生しました' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  }),

  http.get('/api/users', ({ request }) => {
    const url = new URL(request.url)
    const params = url.searchParams

    const name = params.get('name')?.toLowerCase() ?? ''
    const userType = params.get('userType') ?? ''
    const accountStatus = params.get('accountStatus') ?? ''
    const roles = params.getAll('role')

    const filtered = mockUsers.filter((user) => {
      const matchName = name === '' || user.name.toLowerCase().includes(name)
      const matchUserType = userType === '' || user.userType === userType
      const matchAccountStatus = accountStatus === '' || user.accountStatus === accountStatus
      const matchRole = roles.length === 0 || roles.includes(user.role)
      return matchName && matchUserType && matchAccountStatus && matchRole
    })

    return new Response(JSON.stringify(filtered), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  }),

  http.post('/api/users', async ({ request }) => {
    try {
      const data = (await request.json()) as Omit<User, 'id'>

      if (!data.name || !data.userType || !data.role || !data.accountStatus) {
        return new Response(JSON.stringify({ message: '必須項目が不足しています' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        })
      }

      const newUser = addMockUser(data)
      return new Response(JSON.stringify(newUser), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      })
    } catch (error) {
      return new Response(JSON.stringify({ message: '登録時にエラーが発生しました' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  }),
]
