<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn
      v-for="i in menuData.menuList"
      :class="`bg-${i.color} text-white`"
      :icon="i.icon"
      :label="i.label"
    />
  </div>
</template>

<script setup lang="ts">
import menuData from '@/public/allData.json';
</script>

<style scoped></style>
