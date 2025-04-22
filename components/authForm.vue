<template>
  <q-form @submit.prevent="onSubmit" class="q-gutter-md">
    <div class="text-h6">{{ title }}</div>
    <div v-for="(field, index) in fields" :key="index">
      <q-input
        v-if="['text', 'number', 'email', 'date'].includes(field.type)"
        v-model="model[field.name]"
        :label="field.label"
        :type="(field.type as 'search' | 'textarea' | 'time' | 'text' | 'email' | 'password' | 'tel' | 'file' | 'url' | 'date' | 'datetime-local') || 'text'"
        :options="field.options || []"
        :rules="getRules(field.rules)"
        :placeholder="field.placeholder || ''"
        :dense="props.dense"
        filled
        :color="props.color"
        :hint="field.hint || ''"
      />
      <q-select
        v-else-if="field.type === 'select'"
        v-model="model[field.name]"
        :label="field.label"
        :options="field.options || []"
        :rules="getRules(field.rules)"
        :dense="props.dense"
        filled
        :color="props.color"
        :hint="field.hint || ''"
      />

      <q-input
        v-else-if="field.type === 'password'"
        v-model="model[field.name]"
        :label="field.label"
        :type="passwordVisibility[field.name] ? 'text' : 'password'"
        :rules="getRules(field.rules)"
        :placeholder="field.placeholder || ''"
        :dense="props.dense"
        filled
        :color="props.color"
        :hint="field.hint || ''"
      >
        <template v-slot:append>
          <q-icon
            :name="
              passwordVisibility[field.name] ? 'visibility_off' : 'visibility'
            "
            @click="togglePasswordVisibility(field.name)"
          />
        </template>
      </q-input>

      <div v-if="field.type === 'toggle'" class="row items-center">
        <q-toggle
          v-model="model[field.name]"
          :color="props.color"
          :dense="props.dense"
          filled
        />
        <div class="text-caption q-ml-sm">
          Leer y aceptar los <a href="/home/terms">Terminos y Condiciones</a>
        </div>
      </div>
      <!-- Puedes seguir agregando más tipos como date, textarea, etc -->
    </div>
    <div>
      <q-btn
        :label="buttonLabel"
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

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

interface Field {
  name: string;
  label: string;
  type: string;
  rules?: ((val: string) => boolean | string)[];
  placeholder?: string;
  hint?: string;
  options?: string[];
  default?: boolean;
}

interface Props {
  title?: string;
  fields: Field[];
  dense?: boolean;
  color?: string;
  buttonLabel?: string;
  filled?: boolean;
}

const route = useRoute();
const authUrl = route.params.auth as string;
const terms = ref<boolean>(false);

const props = withDefaults(defineProps<Props>(), {
  dense: true,
  filled: true,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: Record<string, any>): void;
  (e: 'submit', value: Record<string, any>): void;
}>();

const model = ref<Record<string, any>>({});

// Inicializar valores por defecto
watch(
  () => props.fields,
  (fields) => {
    fields.forEach((field) => {
      if (field.type === 'toggle') {
        model.value[field.name] = field.default || false;
      }
    });
  },
  { immediate: true },
);

const passwordVisibility = ref<Record<string, boolean>>({});

type ValidationRule = (val: string) => boolean | string;

const validationRules: Record<
  string,
  ValidationRule | ((param: string) => ValidationRule)
> = {
  required: (val: string) => !!val || 'Campo requerido',
  email: (val: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Email no válido',
  minLength: (length: string) => (val: string) =>
    val.length >= Number(length) || `Mínimo ${length} caracteres`,
  maxLength: (length: string) => (val: string) =>
    val.length <= Number(length) || `Máximo ${length} caracteres`,
  lowercase: (val: string) =>
    /[a-z]/.test(val) || 'Debe contener al menos una letra minúscula',
  uppercase: (val: string) =>
    /[A-Z]/.test(val) || 'Debe contener al menos una letra mayúscula',
  number: (val: string) => /\d/.test(val) || 'Debe contener al menos un número',
  special: (val: string) =>
    /[!@#$%^&*(),.?":{}|<>]/.test(val) ||
    'Debe contener al menos un carácter especial',
  minAge: (age: string) => (val: string) =>
    Number(val) >= Number(age) || `Debe ser mayor de ${age} años`,
  passwordMatch: (val: string) =>
    val === model.value?.password || 'Las contraseñas no coinciden',
};

function getRules(
  fieldRules: ((val: string) => boolean | string)[] | undefined,
): ((val: string) => boolean | string)[] {
  return fieldRules || [];
}

function togglePasswordVisibility(fieldName: string): void {
  passwordVisibility.value[fieldName] = !passwordVisibility.value[fieldName];
}

watch(
  model,
  (val) => {
    emit('update:modelValue', val);
  },
  { deep: true },
);

function onSubmit(): void {
  emit('submit', model.value);
}
</script>

<style scoped></style>
