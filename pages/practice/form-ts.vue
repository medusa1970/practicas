<template>
  <div>
    <FormTs :fields="formFields" title="Formulario TypeScript" />
  </div>
</template>

<script setup lang="ts">
const formFields = ref([
  {
    name: 'name',
    label: 'Nombre',
    type: 'text',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
  },
  {
    name: 'phone',
    label: 'Teléfono',
    type: 'tel',
  },
  {
    name: 'address',
    label: 'Dirección',
    type: 'text',
  },
  {
    name: 'city',
    label: 'Ciudad',
    type: 'text',
  },
  {
    name: 'password',
    label: 'Contraseña',
    type: 'password',
  },
  {
    name: 'confirmPassword',
    label: 'Confirmar contraseña',
    type: 'password',
  },
]);
</script>

<style scoped></style>
