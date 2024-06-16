<script lang="tsx">
import { defineComponent } from 'vue'
import { formProps } from 'element-plus'
import type { TSchemaFormItem } from '@/components/schema-from/src/SchemaFormItem.vue'

const schemaFormProps = {
  schemas: {
    type: Object as PropType<TSchemaFormItem[]>
  }
}
const propsType = { ...formProps, ...schemaFormProps }

export type TSchemaFormProps = typeof propsType

export default defineComponent({
  name: 'SchemaForm',
  inheritAttrs: false,
  props: propsType,
  setup(props, { attrs }) {
    return () => (
      <el-form {...attrs} {...props}>
        {props.schemas?.map((i: TSchemaFormItem) => <schema-form-item {...i} />)}
      </el-form>
    )
  }
})
</script>
