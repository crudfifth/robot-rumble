export interface User {
  id: number
  name: string
  userType: '一般' | '管理者'
  role: '自治体' | '代理登録機関(自治体)'
  accountStatus: '利用中' | '停止中'
}
