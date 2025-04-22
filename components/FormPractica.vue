<template>
  <div>
    <q-form class="q-gutter-md">
      <div v-for="field in fields" :key="field.name">
        <q-input
          v-if="field.type !== 'toggle'"
          v-model="model[field.name]"
          :label="field.label"
          :type="passwordVisibility[field.name] ? 'text' : field.type"
          :name="field.name"
          :rules="field.rules"
          :filled="filled"
          :dense="dense"
        >
          <template v-slot:append v-if="field.type === 'password'">
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
            v-model="terms"
            :dense="dense"
            filled
            :rules="field.rules"
          />
          <div class="text-caption">
            Leer y aceptar los <a href="/home/terms">Terminos y Condiciones</a>
          </div>
        </div>
      </div>
      <div>
        <q-btn :label="buttonLabel" type="submit" />
        <q-btn label="Cancelar" type="button" />
      </div>
    </q-form>
    {{ model }}
  </div>
</template>

<script setup lang="ts">
export type InputType =
  | 'text'
  | 'password'
  | 'email'
  | 'number'
  | 'url'
  | 'tel'
  | 'file'
  | 'date'
  | 'datetime-local'
  | 'time'
  | 'search'
  | 'textarea'
  | 'toggle'; // Define los tipos permitidos

interface Field {
  name: string;
  label: string;
  type: InputType; // Usa el tipo específico aquí
  rules?: any[]; // Puedes ajustar el tipo de reglas según tus necesidades
}

interface Model {
  [key: string]: any; // Define el tipo del modelo como un objeto con claves de tipo string
}

const terms = ref(false);

const props = defineProps({
  fields: {
    type: Array as () => Field[], // Especifica el tipo de fields
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  buttonLabel: {
    type: String,
    required: true,
  },
  filled: {
    type: Boolean,
    required: false,
  },
  dense: {
    type: Boolean,
    required: false,
  },
});

const model = ref<Model>({}); // Define el modelo con el tipo Model

const passwordVisibility = ref<{ [key: string]: boolean }>({}); // Define el tipo de passwordVisibility

function togglePasswordVisibility(fieldName: string) {
  passwordVisibility.value[fieldName] = !passwordVisibility.value[fieldName]; // Alterna la visibilidad
}
</script>

<style scoped></style>
