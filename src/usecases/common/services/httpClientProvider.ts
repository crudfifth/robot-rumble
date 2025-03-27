import { HttpClient } from 'yysk-client-fw'

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export function createHttpClient() {
  return new HttpClient({
    baseURL: VITE_API_BASE_URL, // ベースURLを設定
  })
}
