<template>
  <div class="q-pa-md">
    <q-table
      style="height: calc(100vh - 100px)"
      flat
      bordered
      title="Usuarios"
      :rows="users"
      :columns="columns"
      row-key="index"
      virtual-scroll
      :rows-per-page-options="[0]"
      :filter="filter"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="text-center">
          <q-btn
            flat
            dense
            round
            icon="edit"
            color="blue"
            @click="Edit(props.row)"
          />
          <q-btn
            flat
            dense
            round
            icon="delete"
            color="red"
            @click="Delete(props.row)"
          />
        </q-td>
      </template>

      <template v-slot:top-right>
        <q-input
          filled
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
import { ref } from 'vue';
import menuData from '@/public/allData.json';

const users = menuData.usuarios;
const columns = [
  {
    name: 'nombre',
    label: 'nombre usuario',
    field: 'nombre',
    align: 'left' as 'left',
    sortable: true,
  },
  {
    name: 'email',
    label: 'Email',
    field: 'email',
    align: 'left' as 'left',
  },
  {
    name: 'actions',
    label: 'Acciones',
    field: 'actions',
    align: 'right' as 'right',
  },
];

const filter = ref('');

// Función para editar un usuario
const Edit = (user: any) => {
  console.log('Edit user:', user);
};

// Función para eliminar un usuario
const Delete = (user: any) => {
  console.log('Delete user:', user);
};
</script>

<style scoped></style>
