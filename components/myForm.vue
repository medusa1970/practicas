<template>
  <div>{{ title }}</div>
  <q-form @submit="onSubmit" @reset="onReset">
    <q-input v-model="email" label="Email" />
    <q-input v-model="password" label="Password" />
    <q-btn type="submit" class="text-black bg-orange" :label="botonn" />
    <q-btn type="reset" class="text-black bg-green" label="Reset" />
  </q-form>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  botonn: {
    type: String,
    required: true,
  },
});
//const emit = defineEmits(['submit']);

const email = ref('');
const password = ref('');

const onSubmit = () => {
  Notify.create({
    message: 'Formulario enviado',
    color: 'primary',
  });
};
const onReset = () => {
  Notify.create({
    message: 'Formulario reiniciado',
    color: 'primary',
  });
};
</script>

<style scoped></style>
