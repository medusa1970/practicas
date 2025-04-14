<template>
  <div>
    <h5>{{ titulo }}</h5>
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        v-for="input in form"
        :key="input.name"
        :dense="false"
        filled
        :type="input.type as any"
        v-model="input.name"
        :label="input.label"
        :hint="input.hint"
        :rules="input.rules"
      />

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
interface FormField {
  name: string;
  type: string;
  label: string;
  hint?: string;
  rules?: Array<(val: any) => boolean | string>; // Opcionalmente, puedes definir las reglas
}

const props = defineProps({
  titulo: {
    type: String,
    required: true,
  },
  form: {
    type: Array as () => FormField[], // Usa la interfaz aquí
    required: true,
  },
});

const isPwd = ref(true);
const isPwd1 = ref(true);

const onSubmit = () => {};

const onReset = () => {};
</script>

<style scoped></style>
