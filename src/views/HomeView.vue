<script lang="ts" setup>
import { ref } from 'vue'
import EllipsisText from '@/components/ellipsis-text/src/EllipsisText.vue'

const apiSelectRef = ref()
const selectVal = ref()
</script>
<template>
  <div>
    <EllipsisText :max-width="100" style="vertical-align: middle"> 国家： </EllipsisText>
    <EllipsisText :max-width="100" style="vertical-align: middle"> 泰国印度尼西亚 </EllipsisText>
  </div>
</template>
