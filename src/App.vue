<script lang="ts" setup>
import { RouterView } from 'vue-router'
import AppProvider from '@/components/app-lication/src/AppProvider'
</script>
<template>
  <AppProvider>
    <RouterView />
  </AppProvider>
</template>
