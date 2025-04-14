<template>
  <div>
    <FormPractica titulo="Practica 1" :form="form1" />
    <FormPractica titulo="Practica 2" :form="form2" />
    <q-btn label="practica1" color="primary" flat to="/practice" />
  </div>
</template>

<script setup lang="ts">
const form1 = ref([
  {
    name: 'name',
    label: 'Nombre',
    hint: 'Nombre y apellido',
    type: 'text',
  },
  {
    name: 'email',
    label: 'Email',
    hint: 'Email',
    type: 'email',
  },
]);
const form2 = ref([
  {
    name: 'name',
    label: 'Nombre',
    hint: 'Nombre y apellido',
    type: 'text',
  },
  {
    name: 'email',
    label: 'Email',
    hint: 'Email',
    type: 'email',
  },
  {
    name: 'phone',
    label: 'Teléfono',
    hint: 'Teléfono',
    type: 'tel',
  },
  {
    name: 'password',
    label: 'Contraseña',
    hint: 'Contraseña',
    type: 'password',
  },
  {
    name: 'confirmPassword',
    label: 'Confirmar contraseña',
    hint: 'Confirmar contraseña',
    type: 'password',
  },
]);
</script>

<style scoped></style>
