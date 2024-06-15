<template>
  <Layout>
    <template #default>
      <SchemaForm :inline="true" :model="searchFilters" :schemas="schemas" />
      <SchemaTable
        ref="tableRef"
        :after-fetch="(r) => r.data?.results"
        :api="getSelectOption"
        :border="true"
        :columns="columns"
        :immediate="false"
        :params="{ results: 100 }"
        row-key="cell"
      />
    </template>
  </Layout>
</template>
<script lang="tsx" setup>
import { onMounted, reactive, ref } from 'vue'
import SchemaTable from '@/components/schema-table/src/SchemaTable.vue'
import type { ColumnProps } from '@/components/schema-table/interface'
import { getSelectOption } from '@/api/select-option'
import SchemaForm from '@/components/schema-from/src/SchemaForm.vue'
import ApiSelect from '@/components/api-select/src/ApiSelect.vue'
import Layout from '@/layout/Layout.vue'

const tableRef = ref()

const columns: ColumnProps[] = reactive([
  {
    type: 'selection',
    prop: '',
    isShow: true
  },
  {
    prop: 'cell',
    label: '电话',
    fixed: true,
    isShow: true
  },
  {
    prop: 'email',
    label: '邮箱',
    isShow: true
  },
  {
    prop: 'nat',
    label: 'nat',
    isShow: true
  },
  {
    prop: 'login.md5',
    label: 'md5',
    isShow: true,
    showOverflowTooltip: true
  },
  {
    prop: '',
    label: '操作',
    isShow: true,
    fixed: 'right',
    render: () => (
      <div>
        <el-button link type="primary" size="small">
          Detail
        </el-button>
        <el-button link type="primary" size="small">
          Edit
        </el-button>
      </div>
    )
  }
])

const searchFilters = ref({
  user: ''
})
const schemas: any[] = [
  {
    label: '国家',
    renderItem: () => <ApiSelect style={'width:180px'} />
  },
  {
    label: '用户',
    renderItem: () => <el-input v-model={searchFilters.value.user} clearable placeholder="Approved by" />
  }
]

onMounted(() => {
  tableRef.value?.initSearchParams({
    user: 'whwwww'
  })
  tableRef.value?.fetch()
})
</script>
