<script lang="tsx" setup>
import { useBem } from '@/hooks/web/useBem'
import ApiSelect from '@/components/api-select/src/ApiSelect.vue'
import { reactive, ref } from 'vue'
import SchemaTable from '@/components/schema-table/src/SchemaTable.vue'
import type { ColumnProps } from '@/components/schema-table/interface'
import { getSelectOption } from '@/api/select-option'

const ns = useBem('home')

const cityCodes = ref()
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

const tableRef = ref()
const handleButton = () => {
  console.log('tableRef.value?.getSelectionRows()', tableRef.value?.selectedListIds)
}
</script>
<template>
  <div :class="ns.b()">
    <div :class="ns.e('header')">
      <ApiSelect v-model="cityCodes" />
    </div>
    <div :class="ns.e('main')">
      <div :class="ns.e('sidebar')">
        <el-button @click="handleButton"> 获取数据 </el-button>
      </div>
      <div :class="ns.e('content')">
        <SchemaTable
          ref="tableRef"
          :after-fetch="(r) => r.data?.results"
          :api="getSelectOption"
          :border="true"
          :columns="columns"
          :params="{ results: 100 }"
          height="100%"
          row-key="cell"
        />
      </div>
    </div>
  </div>
</template>
<style lang="scss">
$prefixCls: 'plc-home';

.#{$prefixCls} {
  &__header {
    height: 64px;
    background: aqua;
  }
  &__main {
    display: grid;
    grid-template-columns: 1fr 9fr;
  }
  &__sidebar {
    background: aliceblue;
  }
  &__content {
    height: calc(100vh - 64px);
  }
}
</style>
