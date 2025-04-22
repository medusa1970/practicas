<template>
  <div>
    <h5>{{ title }}</h5>
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        v-for="field in fields"
        :key="field.name"
        filled
        v-model="model[field.type]"
        :label="field.label"
        :type="field.type"
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-toggle v-model="accept" label="I accept the license and terms" />

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
    {{ model }}
  </div>
</template>

<script setup>
import { ref } from 'vue';

const model = ref({});
const accept = ref(false);

const props = defineProps({
  fields: Array,
  title: String,
});

const onSubmit = () => {
  console.log('Submit');
};

const onReset = () => {
  console.log('Reset');
};
</script>

<style scoped></style>
