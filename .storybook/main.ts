import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  stories: [
    // ストーリーファイル置き場のパスを指定
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/**/__stories__/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    // Storybookの機能を拡張するアドオンを指定
    '@storybook/addon-essentials', // よく使われるアドオンの一括インストール
    '@storybook/addon-actions', // コンポーネントのイベントをモニタリング
    '@storybook/addon-interactions', // インタラクティブなストーリーのテストに用いる
  ],
  framework: {
    // 使用するフレームワークとその設定を指定
    name: '@storybook/vue3-vite',
    options: {},
  },
  staticDirs: ['../public'],
}
export default config
