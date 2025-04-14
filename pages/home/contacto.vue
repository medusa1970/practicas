<template>
  <div class="bg-grey-3 q-ma-md" style="height: calc(100vh - 70px)">
    <q-table
      style="height: calc(100vh - 100px)"
      flat
      bordered
      title="Treats"
      :rows="rows"
      :columns="columns"
      row-key="index"
      virtual-scroll
      :rows-per-page-options="[0]"
      :filter="filter"
    >
      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import allData from '@/public/allData.json';
const rows = allData.usuarios;
const filter = ref('');
const columns = [
  {
    name: 'name',
    label: 'Nombre',
    field: 'nombre',
    align: 'left' as 'left',
    sortable: true,
  },
  {
    name: 'email',
    label: 'Email',
    field: 'email',
    align: 'left' as 'left',
    sortable: true,
  },
];
</script>

<style scoped></style>
