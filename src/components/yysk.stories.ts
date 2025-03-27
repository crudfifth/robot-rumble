//   ストーリーを作成したら当ファイルを削除して構いません。
import type { Meta, StoryFn } from '@storybook/vue3'

export default {
  title: 'welcome',
} as Meta

const Template: StoryFn = () => ({
  template: `
    <div style="font-family: sans-serif; text-align: center; padding: 20px;">
      <h1>予予請求Storybook</h1>
      <p>ストーリーを作成し使用してください。</p> 
    </div>
  `,
})

export const Default = Template.bind({})
