<script lang="tsx">
import { defineComponent, type ExtractPublicPropTypes } from 'vue'
import { formItemProps } from 'element-plus/es/components/form/src/form-item'

const SchemaFormItemProps = {
  label: String,
  labelWidth: {
    type: [String, Number],
    default: ''
  },
  prop: {
    type: String
  },
  required: {
    type: Boolean,
    default: void 0
  },
  rules: {
    type: [] as PropType<[Object, any[]]>
  },
  error: String,
  validateStatus: {
    type: String
  },
  for: String,
  inlineMessage: {
    type: [String, Boolean],
    default: ''
  },
  showMessage: {
    type: Boolean,
    default: true
  },
  size: {
    type: String
  },
  renderItem: {
    type: Function
  }
}

const props = { ...formItemProps, ...SchemaFormItemProps }
export type TSchemaFormItem = ExtractPublicPropTypes<typeof props>

export default defineComponent({
  name: 'SchemaFormItem',
  inheritAttrs: false,
  props: props,
  setup(props, { slots, attrs }) {
    console.log('renderItem', props)
    return () => (
      <el-form-item {...attrs} {...props}>
        {{
          ...slots,
          default: props.renderItem && props?.renderItem()
        }}
      </el-form-item>
    )
  }
})
</script>
