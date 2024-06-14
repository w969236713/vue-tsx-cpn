import { defineComponent, toRefs } from 'vue'
import { createAppProviderContext } from './useAppContext'
import { prefixCls } from '@/config/app-config.ts'

const props = {
  prefixCls: { type: String, default: prefixCls }
}

export default defineComponent({
  name: 'AppProvider',
  inheritAttrs: false,
  props,
  setup(props, { slots }) {
    const { prefixCls } = toRefs(props)

    createAppProviderContext({ prefixCls })

    return () => slots.default?.()
  }
})
