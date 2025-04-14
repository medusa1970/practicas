<template>
  <div>
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        :dense="false"
        filled
        v-model="form.name"
        label="Tu nombre *"
        hint="Nombre y apellido"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Por favor ingrese su nombre',
        ]"
      />

      <q-input
        :dense="false"
        filled
        v-model="form.email"
        label="Tu email *"
        hint="Email"
      />

      <q-input
        filled
        :dense="false"
        v-model="form.phone"
        label="Tu teléfono *"
        hint="Teléfono"
      />

      <q-input
        :dense="false"
        filled
        v-model="form.password"
        label="Tu contraseña *"
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

      <q-input
        :dense="false"
        filled
        v-model="form.confirmPassword"
        label="Confirmar contraseña *"
        hint="Confirmar contraseña"
        :type="isPwd1 ? 'password' : 'text'"
        :rules="[
          (val) => (val && val.length > 0) || 'Por favor ingrese su contraseña',
          (val) => val === form.password || 'Las contraseñas no coinciden',
        ]"
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
    <q-btn label="practica1" color="primary" flat to="/practice/comp1" />
  </div>
</template>

<script setup lang="ts">
const form = ref({
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
});

const isPwd = ref(true);
const isPwd1 = ref(true);

const onSubmit = () => {
  console.log(form.value);
};

const onReset = () => {
  console.log(form.value);
};
</script>

<style scoped></style>
