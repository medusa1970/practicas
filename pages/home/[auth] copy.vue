<template>
  <div
    class="row justify-center items-center"
    style="height: calc(100vh - 102px)"
  >
    <q-card v-if="authUrl === 'login'" class="col-md-4">
      <q-card-section>
        <div class="text-h6">Login</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input
            filled
            v-model="email"
            label="Your name *"
            hint="Name and surname"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            filled
            type="password"
            v-model="password"
            label="Your age *"
            lazy-rules
            :rules="[
              (val) => (val !== null && val !== '') || 'Please type your age',
              (val) => (val > 0 && val < 100) || 'Please type a real age',
            ]"
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
      </q-card-section>
    </q-card>

    <q-card v-if="authUrl === 'register'" class="col-md-4">
      <q-card-section>
        <div class="text-h6">Register</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input
            filled
            v-model="name"
            label="Nombre *"
            hint="Ingrese su nombre"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
          <q-input
            filled
            v-model="email"
            label="Ingrese su email *"
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            filled
            type="password"
            v-model="password"
            label="Contraseña *"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
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
      </q-card-section>
    </q-card>

    <q-card v-if="authUrl === 'forgot'" class="col-md-4">
      <q-card-section>
        <div class="text-h6">Recuperar contraseña</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input
            filled
            v-model="email"
            label="Tu email *"
            hint="Tu email personal"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Ingrese su email']"
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
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute();

const authUrl = route.params.auth;
const email = ref('');
const password = ref('');
const name = ref('');
// funciones
const onSubmit = () => {
  console.log(email.value, password.value);
};

const onReset = () => {
  email.value = '';
  password.value = '';
};
</script>

<style scoped></style>
