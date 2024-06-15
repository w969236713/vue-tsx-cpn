<script lang="tsx" setup>
import { useBem } from '@/hooks/web/useBem'

const ns = useBem('home')
</script>
<template>
  <div :class="ns.b()">
    <div :class="ns.e('header')">
      <slot name="header" />
    </div>
    <div :class="ns.e('main')">
      <div :class="ns.e('sidebar')">
        <slot name="sidebar" />
      </div>
      <div :class="ns.e('content')">
        <slot />
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
    grid-template-columns: 1.5fr 8.5fr;
  }
  &__sidebar {
    background: aliceblue;
  }
  &__content {
    box-sizing: border-box;
    height: calc(100vh - 64px);
    padding: 16px;
  }
}
</style>
