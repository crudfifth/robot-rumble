import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '../Button.vue'

describe('Button.vue', () => {
  it('renders with given text', () => {
    const wrapper = mount(Button, {
      props: { text: 'クリック' },
    })

    expect(wrapper.text()).toBe('クリック')
  })

  it('applies correct variant and size classes', () => {
    const wrapper = mount(Button, {
      props: { text: 'ボタン', variant: 'outline', size: 'lg' },
    })

    expect(wrapper.classes()).toContain('border')
    expect(wrapper.classes()).toContain('bg-white')
    expect(wrapper.classes()).toContain('min-w-[calc(136/16*1rem)]')
  })

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn()
    const wrapper = mount(Button, {
      props: { text: 'クリック', onClick },
    })

    await wrapper.trigger('click')

    expect(onClick).toHaveBeenCalled()
  })

  it('does not call onClick when disabled', async () => {
    const onClick = vi.fn()
    const wrapper = mount(Button, {
      props: { text: 'クリック', onClick, disabled: true },
    })

    await wrapper.trigger('click')

    expect(onClick).not.toHaveBeenCalled()
  })
})
