import type { TSchemaFormItem } from '@/components/schema-from/src/SchemaFormItem.vue'

export interface RenderCallbackParams {
  schema: TSchemaFormItem
  values: Recordable
  model: Recordable
  field: string
}
