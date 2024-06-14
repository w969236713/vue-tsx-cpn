<script lang="ts" setup>
import ApiSelect from '@/components/api-select/src/ApiSelect.vue'
import { getSelectOption } from '@/api/select-option'
import { ref } from 'vue'
import EllipsisText from '@/components/ellipsis-text/src/EllipsisText.vue'
import { useMessage } from '@/hooks/web/useMessage'

const apiSelectRef = ref()
const selectVal = ref()

const createMessage = () => {
  useMessage().createAlert({ message: '确认啊', title: `我是标题啊` })
}
</script>
<template>
  <div>
    <EllipsisText :max-width="100" style="vertical-align: middle"> 国家： </EllipsisText>
    <ApiSelect
      ref="apiSelectRef"
      v-model="selectVal"
      :after-fetch="(r) => r.data.results"
      :api="getSelectOption"
      :clearable="true"
      :filterable="true"
      :multiple="true"
      :params="{ results: 100 }"
      :remote="true"
      label-field="email"
      placeholder="Select"
      remote-field="fuzzName"
      size="large"
      style="width: 440px"
      value-field="phone"
    />
  </div>
  <br />
  <ElButton @click="createMessage"> create </ElButton>
</template>
