<template>
  <div class="row justify-center">
    <div class="col-4">
      <h5>Practicas componentes</h5>
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          :dense="false"
          v-model="form.name"
          label="Mi nombre completo *"
          hint="Nombre y apellido"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Por favor ingrese su nombre',
          ]"
        />
        <!-- input de email -->
        <q-input
          filled
          :dense="false"
          v-model="form.email"
          label="Mi email *"
          hint="Email"
        />
        <!-- input de password -->
        <q-input
          filled
          :dense="false"
          v-model="form.password"
          label="Mi contraseña *"
          hint="Contraseña"
          :type="isPwd ? 'password' : 'text'"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <!-- input de password confirm -->
        <q-input
          filled
          :dense="false"
          v-model="form.passwordConfirm"
          label="Confirmar contraseña *"
          hint="Confirmar contraseña"
          :type="isPwd1 ? 'password' : 'text'"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd1 ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd1 = !isPwd1"
            />
          </template>
        </q-input>
        <div>
          <q-btn
            label="Guardar"
            type="submit"
            class="bg-primary text-white q-px-md"
          />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="bg-secondary text-white q-ml-md q-px-md"
          />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script setup lang="ts">
const form = ref({
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
});

const isPwd = ref(true);
const isPwd1 = ref(true);

const onSubmit = () => {
  console.log(form.value);
};

const onReset = () => {
  form.value = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  };
};
</script>

<style scoped></style>
