<script lang="tsx">
import { defineComponent, type PropType, ref, unref } from 'vue'
import TableColumn from '@/components/schema-table/src/TableColumn.vue'
import type { ColumnProps } from '@/components/schema-table/interface'
import { propTypes } from '@/utils/propTypes'
import { ElTable } from 'element-plus'
import { useSelection } from '@/components/schema-table/hooks/useSelection'
import { useTable } from '@/components/schema-table/hooks/useTable'
import { useBem } from '@/hooks/web/useBem'
import _default from 'element-plus/es/components/table/src/table/defaults.mjs'
const SchemaTableProps = {
  columns: [] as PropType<ColumnProps[]>, // 列配置项  ==> 必传
  source: [] as PropType<unknown[]>,
  api: {
    type: Function as PropType<(arg?: any) => Promise<unknown[] | Recordable<any>>>,
    default: null
  },
  initParams: propTypes.any.def({}),
  tableParams: propTypes.any.def({}),
  immediate: propTypes.bool.def(true),
  alwaysLoad: propTypes.bool.def(false),
  beforeFetch: {
    type: Function as PropType<Fn>,
    default: null
  },
  afterFetch: {
    type: Function as PropType<Fn>,
    default: null
  },
  pagination: {
    type: Boolean,
    default: true
  }
}

const props = { ...SchemaTableProps, ..._default}

export default defineComponent({
  name: 'SchemaTable',
  inheritAttrs: false,
  props: props,
  setup(props, { slots, attrs, expose }) {
    const ns = useBem('page')
    // table 实例
    const tableRef = ref<InstanceType<typeof ElTable>>()

    const { selectionChange, selectedList, selectedListIds, isSelected } = useSelection(props.rowKey as string)

    // 表格操作 Hooks
    const { tableData, pageable, loading, fetch, search, reset, handleSizeChange, handleCurrentChange } = useTable(props)

    props.immediate && fetch()

    const _expose: InstanceType<typeof ElTable> & any = new Proxy(
      {
        selectedList,
        selectedListIds,
        isSelected,
        fetch,
        search,
        reset
      },
      {
        get: (t, k) => Reflect.get(t, k) ?? Reflect.get(tableRef.value || {}, k),
        has: (t, k) => Reflect.has(t, k) || Reflect.has(tableRef.value || {}, k)
      }
    )

    expose(_expose)
    return () => {
      return (
        <div class={ns.b()} {...unref(attrs)}>
          <el-table
            class={ns.e('table')}
            v-loading={loading.value}
            ref={tableRef}
            {...props}
            data={tableData.value}
            onSelectionChange={selectionChange}
          >
            {{
              default: props?.columns?.map((column) => <TableColumn column={column} />),
              append: slots?.append?.(),
              empty: slots?.empty?.()
            }}
          </el-table>
          {props.pagination && (
            <el-pagination
              class={ns.e('pagination')}
              current-page={pageable.value.pageNum}
              page-size={pageable.value.pageSize}
              total={pageable.value.total ?? 0}
              page-sizes={[10, 25, 50, 100]}
              layout="total, sizes, prev, pager, next, jumper"
              size-change={handleSizeChange}
              current-change={handleCurrentChange}
            />
          )}
        </div>
      )
    }
  }
})
</script>
<style lang="scss">
$prefixCls: 'plc-page';

.#{$prefixCls} {
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 9fr 1fr;

  &__pagination {
    justify-content: end;
  }
}
</style>
