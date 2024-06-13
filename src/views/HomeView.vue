<script lang="ts" setup>
import ApiSelect from '@/components/api-select/src/ApiSelect.vue'
import { getSelectOption } from '@/api/select-option'
import { ref } from 'vue'
import EllipsisText from '@/components/ellipsis-text/src/EllipsisText.vue'

const apiSelectRef = ref()
const selectVal = ref()
</script>
<template>
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
  <div>
    <EllipsisText :expand="true" :line="1" :max-width="100">
      国家城市和地区国家城市和地区国家城市和地区国家城市和地区国家城市和地区
    </EllipsisText>
  </div>
</template>
