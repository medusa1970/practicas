<template>
  <div>
    <p>Este es otro layout</p>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const menu = ref([]);
</script>
