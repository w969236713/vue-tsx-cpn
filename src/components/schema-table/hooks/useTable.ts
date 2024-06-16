import { reactive, toRefs, unref } from 'vue'
import { isFunction } from 'lodash-es'
import type { SchemaTableInstance } from '../types'

export const useTable = (props: SchemaTableInstance['$props']) => {
  const state = reactive({
    loading: false,
    isFirstLoaded: false,
    // 表格数据
    tableData: [],
    // 分页数据
    pageable: {
      // 当前页数
      pageNum: 1,
      // 每页显示条数``
      pageSize: 10,
      // 总条数
      total: 0
    }
  })

  async function fetch() {
    let params = unref(props.tableParams)

    const { api, initParams, beforeFetch, afterFetch, pagination } = props

    if (!api || !isFunction(api) || state.loading) return

    try {
      state.loading = true

      params = Object.assign({}, params, unref(initParams))

      if (beforeFetch && isFunction(beforeFetch)) {
        params = (await beforeFetch(params)) || params
      }

      let res = await api(params)

      if (afterFetch && isFunction(afterFetch)) {
        res = (await afterFetch(res)) || res
      }

      state.tableData = res as any
      state.isFirstLoaded = true
    } catch (error) {
      state.isFirstLoaded = false
    } finally {
      state.loading = false
    }
  }

  const search = async () => {
    state.pageable.pageNum = 1
    await fetch()
  }

  const reset = async () => {
    state.pageable.pageNum = 1
    await fetch()
  }

  const handleSizeChange = async (val: number) => {
    state.pageable.pageNum = 1
    state.pageable.pageSize = val
    await fetch()
  }

  const handleCurrentChange = async (val: number) => {
    state.pageable.pageNum = val
    await fetch()
  }

  return {
    ...toRefs(state),
    fetch,
    search,
    reset,
    handleSizeChange,
    handleCurrentChange
  }
}
