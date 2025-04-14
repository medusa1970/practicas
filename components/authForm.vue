<template>
  <q-form @submit.prevent="onSubmit" class="q-gutter-md">
    <div class="text-h6">{{ title }}</div>
    <div v-for="(field, index) in fields" :key="index">
      <q-input
        v-if="['text', 'number', 'email'].includes(field.type)"
        v-model="model[field.name]"
        :label="field.label"
        :type="field.type || 'text'"
        :rules="field.rules || []"
        :placeholder="field.placeholder || ''"
        :dense="props.dense"
        filled
        :color="props.color"
      />
      <!-- si es password que tenga un icono de ojo  -->
      <q-input
        v-else-if="field.type === 'password'"
        v-model="model[field.name]"
        :label="field.label"
        :type="isPasswordVisible ? 'text' : 'password'"
        :rules="field.rules || []"
        :placeholder="field.placeholder || ''"
        :dense="props.dense"
        filled
        :color="props.color"
      >
        <template v-slot:append>
          <q-icon
            :name="isPasswordVisible ? 'visibility_off' : 'visibility'"
            @click="togglePasswordVisibility"
          />
        </template>
      </q-input>

      <q-input
        v-if="field.type === 'password-confirm'"
        v-model="model[field.name]"
        :label="field.label"
        :type="isPasswordConfirmVisible ? 'text' : 'password'"
        :rules="field.rules || []"
        :placeholder="'Confirma tu ' + field.placeholder || ''"
        :dense="props.dense"
        filled
        :color="props.color"
      >
        <template v-slot:append>
          <q-icon
            :name="isPasswordConfirmVisible ? 'visibility_off' : 'visibility'"
            @click="togglePasswordConfirmVisibility"
          />
        </template>
      </q-input>

      <q-toggle
        v-else-if="field.type === 'toggle'"
        v-model="model[field.name]"
        :label="field.label"
        :color="props.color"
        :dense="props.dense"
        filled
      />
      <!-- Puedes seguir agregando más tipos como date, textarea, etc -->
    </div>
    <div>
      <q-btn
        label="Guardar"
        type="submit"
        class="q-px-md bg-green text-white q-mr-md"
      />
      <q-btn
        label="Cancelar"
        type="submit"
        class="q-px-md bg-orange text-white"
      />
    </div>
    <q-separator class="q-my-md" />
    <div class="row">
      <!-- dependiendo si es register, login o forgot, que se muestren los botones correspondientes -->
      <div v-if="authUrl !== 'register'">
        <q-btn
          label="Unirme "
          type="button"
          color="grey-9"
          flat
          no-caps
          to="/home/register"
          class="q-px-md bg-grey-2 q-mr-md"
        />
      </div>

      <div v-if="authUrl !== 'forgot'">
        <q-btn
          label="Olvidé mi password "
          type="reset"
          color="grey-9"
          flat
          no-caps
          to="/home/forgot"
          class="q-px-md bg-grey-2 q-mr-md"
        />
      </div>

      <div v-if="authUrl !== 'login'">
        <q-btn
          label="Ingresar"
          type="reset"
          color="grey-9"
          flat
          no-caps
          to="/home/login"
          class="q-px-md bg-grey-2"
        />
      </div>
    </div>
  </q-form>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const authUrl = route.params.auth;

const props = defineProps({
  title: String,
  fields: Array,
  modelValue: Object,
  dense: {
    type: Boolean,
    default: true,
  },
  color: String,
});

const emit = defineEmits(['update:modelValue', 'submit']);

const model = ref({ ...props.modelValue });

const isPasswordVisible = ref(false);
const isPasswordConfirmVisible = ref(false);

function togglePasswordVisibility() {
  isPasswordVisible.value = !isPasswordVisible.value;
}

function togglePasswordConfirmVisibility() {
  isPasswordConfirmVisible.value = !isPasswordConfirmVisible.value;
}

watch(
  model,
  (val) => {
    emit('update:modelValue', val);
  },
  { deep: true },
);

function onSubmit() {
  emit('submit', model.value);
}
</script>
