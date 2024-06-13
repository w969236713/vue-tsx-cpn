<script lang="ts" setup>
import ApiSelect from '@/components/api-select/src/ApiSelect.vue'
import { getSelectOption } from '@/api/select-option'
import { ref } from 'vue'

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
</template>
