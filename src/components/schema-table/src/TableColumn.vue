<script lang="tsx" setup>
import { useSlots } from 'vue'
import type {
  ColumnProps,
  HeaderRenderScope,
  RenderScope,
  TypeProps
} from '@/components/schema-table/interface'
import { handleProp, handleRowAccordingToProp } from '../utils/index'

defineProps<{ column: ColumnProps }>()

const slots = useSlots()
// column 列类型
const columnTypes: TypeProps[] = ['selection', 'radio', 'index', 'expand', 'sort']
const renderCellData = (item: ColumnProps, scope: RenderScope<any>) => {
  return handleRowAccordingToProp(scope.row, item.prop!)
}

const RenderTableColumn = (item: ColumnProps) => {
  if (columnTypes.includes(item.type!)) return <el-table-column {...item} />
  return (
    <>
      {item.isShow && (
        <el-table-column {...item}>
          {{
            default: (scope: RenderScope<any>) => {
              if (item._children) return item._children.map((child) => RenderTableColumn(child))
              if (item.render) return item.render(scope)
              if (slots[handleProp(item.prop!)]) return slots[handleProp(item.prop!)]!(scope)
              return renderCellData(item, scope)
            },
            header: (scope: HeaderRenderScope<any>) => {
              if (item.headerRender) return item.headerRender(scope)
              if (slots[`${handleProp(item.prop!)}Header`])
                return slots[`${handleProp(item.prop!)}Header`]!(scope)
              return item.label
            }
          }}
        </el-table-column>
      )}
    </>
  )
}
</script>

<template>
  <RenderTableColumn v-bind="column" />
</template>
