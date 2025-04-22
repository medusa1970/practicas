<template>
  <div>
    <h5>Componente form</h5>
    <FormPractica
      :fields="form"
      title="Formulario de prueba"
      :filled="true"
      :dense="true"
      buttonLabel="Guardar"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { InputType } from '@/components/FormPractica.vue';

const form = ref<
  Array<{
    name: string;
    label: string;
    type: InputType;
    rules?: Array<(val: string) => boolean | string>;
    filled?: boolean;
    dense?: boolean;
  }>
>([
  {
    name: 'nombre',
    label: 'Nombre',
    type: 'text',
    rules: [
      (val: string) => !!val || 'Campo requerido',
      (val: string) =>
        (val.length >= 3 && val.length <= 20) ||
        'Debe tener entre 3 y 20 caracteres',
    ],
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    rules: [
      (val: string) => !!val || 'Campo requerido',
      (val: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Email no válido',
    ],
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    rules: [
      (val: string) => !!val || 'Campo requerido',
      (val: string) =>
        (val.length >= 8 && val.length <= 20) ||
        'Debe tener entre 8 y 20 caracteres',
    ],
  },
  {
    name: 'passwordConfirm',
    label: 'Password Confirm',
    type: 'password',
    rules: [
      (val: string) => !!val || 'Campo requerido',
      (val: string) =>
        (val.length >= 8 && val.length <= 20) ||
        'Debe tener entre 8 y 20 caracteres',
    ],
  },
  {
    name: 'terms',
    label: 'Acepto los términos y condiciones',
    type: 'toggle',
    rules: [
      (val: string) =>
        val === 'true' || 'Debes aceptar los términos y condiciones',
    ],
  },
]);
</script>

<style scoped></style>
