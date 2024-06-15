<script lang="tsx">
import { defineComponent } from 'vue'
import { type TSchemaFormItemProps } from '@/components/schema-from/src/SchemaFormItem.vue'
import { formProps } from 'element-plus'

const schemaFormProps = {
  schemas: {
    type: Object as PropType<TSchemaFormItemProps[]>
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
        {props.schemas?.map((i: TSchemaFormItemProps) => <schema-form-item {...i} />)}
      </el-form>
    )
  }
})
</script>
