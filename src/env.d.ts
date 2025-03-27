/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // その他の環境変数をここに定義
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
