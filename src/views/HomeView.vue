<script lang="ts" setup>
import ApiSelect from '@/components/api-select/src/ApiSelect.vue'
import { getSelectOption } from '@/api/select-option'
import { ref } from 'vue'
import EllipsisText from '@/components/ellipsis-text/src/EllipsisText.vue'
import { useMessage } from '@/hooks/web/useMessage'
import { useBem } from '@/hooks/web/useBem'

const apiSelectRef = ref()
const selectVal = ref()

const ns = useBem('home')

const createMessage = () => {
  useMessage().createAlert({ message: '确认啊', title: `我是标题啊` })
}
</script>
<template>
  <div :class="ns.b()">
    <div :class="ns.e('header')">我是header</div>
    <div :class="ns.e('main')">
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
  </div>
  <br />
  <ElButton @click="createMessage"> create </ElButton>
</template>
<style lang="scss">
$prefixCls: 'plc-home';

.#{$prefixCls} {
  &__header {
    height: 64px;
    background: aqua;
  }
  &__main {
    height: calc(100vh - 64px);
  }
}
</style>
