<script lang="ts" setup>
import { RouterView } from 'vue-router'
import AppProvider from '@/components/app-lication/src/AppProvider'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>
<template>
  <AppProvider>
    <el-config-provider :locale="zhCn">
      <RouterView />
    </el-config-provider>
  </AppProvider>
</template>
