import type { Ref, VNode } from 'vue'
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import SchemaTable from '../src/SchemaTable.vue'
export interface EnumProps {
  label?: string // 选项框显示的文字
  value?: string | number | boolean | any[] // 选项框值
  disabled?: boolean // 是否禁用此选项
  tagType?: string // 当 tag 为 true 时，此选择会指定 tag 显示类型
  children?: EnumProps[] // 为树形选择时，可以通过 children 属性指定子选项
  [key: string]: any
}

export type TypeProps = 'index' | 'selection' | 'radio' | 'expand' | 'sort'

export type SearchType =
  | 'input'
  | 'input-number'
  | 'select'
  | 'select-v2'
  | 'tree-select'
  | 'cascader'
  | 'date-picker'
  | 'time-picker'
  | 'time-select'
  | 'switch'
  | 'slider'

export type FieldNamesProps = {
  label: string
  value: string
  children?: string
}

export type RenderScope<T> = {
  row: T
  $index: number
  column: TableColumnCtx<T>
  [key: string]: any
}

export type HeaderRenderScope<T> = {
  $index: number
  column: TableColumnCtx<T>
  [key: string]: any
}

export interface ColumnProps<T = any>
  extends Partial<Omit<TableColumnCtx<T>, 'type' | 'children' | 'renderCell' | 'renderHeader'>> {
  type?: TypeProps // 列类型
  isShow?: boolean | Ref<boolean> // 是否显示在表格当中
  fieldNames?: FieldNamesProps // 指定 label && value && children 的 key 值
  headerRender?: (scope: HeaderRenderScope<T>) => VNode // 自定义表头内容渲染（tsx语法）
  render?: (scope: RenderScope<T>) => VNode | string // 自定义单元格内容渲染（tsx语法）
  _children?: ColumnProps<T>[] // 多级表头
}

export type SchemaTableInstance = InstanceType<typeof SchemaTable>
