import { type TSchemaFormItemProps } from '@/components/schema-from/src/SchemaFormItem.vue'

export interface RenderCallbackParams {
  schema: TSchemaFormItemProps
  values: Recordable
  model: Recordable
  field: string
}
