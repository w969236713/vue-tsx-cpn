<template>
  <Layout>
    <SchemaForm :inline="true" :model="searchFilters" :schemas="schemas" />
    <SchemaTable
      ref="tableRef"
      :after-fetch="(r:any) => r?.data?.results"
      :api="getSelectOption"
      :border="true"
      :columns="columns"
      :initParams="{ results: 100 }"
      height="570px"
      row-key="cell"
    />
  </Layout>
</template>
<script lang="tsx" setup>
import { reactive, ref } from 'vue'
import type { TSchemaFormItemProps } from '@/components/schema-from/src/SchemaFormItem.vue'
import type { ColumnProps } from '@/components/schema-table/interface'
import { getSelectOption } from '@/api/select-option'

import SchemaForm from '@/components/schema-from/src/SchemaForm.vue'
import SchemaTable from '@/components/schema-table/src/SchemaTable.vue'
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
          详情
        </el-button>
        <el-button link type="primary" size="small">
          编辑
        </el-button>
      </div>
    )
  }
])

const searchFilters = ref({
  city: ['china'],
  user: 'whw',
  office: ''
})
const schemas = [
  {
    label: '国家',
    labelWidth: '70',
    prop: 'city',
    renderItem: () => <ApiSelect v-model={searchFilters.value.city} style={'width:180px'} placeholder="国家" />
  },
  {
    label: '用户',
    labelWidth: '70',
    prop: 'user',
    renderItem: () => <el-input v-model={searchFilters.value.user} clearable placeholder="Approved by" style={'width:180px'} />
  },
  {
    label: '代表处',
    labelWidth: '70',
    prop: 'user',
    renderItem: () => <ApiSelect v-model={searchFilters.value.office} style={'width:180px'} clearable placeholder="Approved by" />
  },
  {
    renderItem: () => (
      <>
        <el-button onClick={onSearch}>查询</el-button>
        <el-button>重置</el-button>
      </>
    )
  }
] as (TSchemaFormItemProps | any)[]

function onSearch() {
  tableRef.value?.search()
}
</script>
