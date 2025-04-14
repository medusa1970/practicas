<template>
  <div
    class="row justify-center items-center col-12"
    style="height: calc(100vh - 102px)"
  >
    <div class="col-12 col-sm-8 col-md-5 col-lg-4">
      <q-card v-if="authUrl === 'register'">
        <q-card-section>
          <AuthForm
            :fields="fieldsForm"
            v-model="formData"
            dense="false"
            color="primary"
            @submit="guardar"
            title="Registro de usuario"
          />
        </q-card-section>
      </q-card>
      <q-card v-if="authUrl === 'login'">
        <q-card-section>
          <AuthForm
            :fields="fieldsForm"
            v-model="formData"
            dense="false"
            color="primary"
            @submit="guardar"
            title="Login de usuario"
          />
        </q-card-section>
      </q-card>

      <q-card v-if="authUrl === 'forgot'">
        <q-card-section>
          <AuthForm
            :fields="fieldsForm"
            v-model="formData"
            dense="false"
            color="primary"
            @submit="guardar"
            title="Recuperar contraseña"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AuthForm from '~/components/authForm.vue';
const route = useRoute();

const authUrl = route.params.auth;

// Campos comunes
const commonFields = {
  email: {
    name: 'email',
    label: 'Email',
    type: 'email',
    rules: [
      (val) => !!val || 'Campo requerido',
      (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Email no válido',
    ],
  },
  password: {
    name: 'password',
    label: 'Password',
    type: 'password',
    rules: [(val) => !!val || 'Campo requerido'],
  },
};

// Campos específicos para cada formulario
const RegisterFields = [
  {
    name: 'nombre',
    label: 'Nombre completo',
    type: 'text',
    rules: [(val) => !!val || 'Campo requerido'],
  },
  {
    name: 'edad',
    label: 'Edad',
    type: 'number',
    rules: [
      (val) => !!val || 'Campo requerido y debe ser un número',
      (val) => val > 18 || 'Debe ser mayor de 18 años',
    ],
  },
  {
    name: 'genero',
    label: 'Género',
    type: 'select',
    options: ['Masculino', 'Femenino', 'Otro'],
    rules: [(val) => !!val || 'Campo requerido'],
  },
  commonFields.email,
  commonFields.password,
  {
    name: 'passwordConfirm',
    label: 'Confirmar password',
    type: 'password-confirm',
    rules: [
      (val) =>
        val === formData.value.password || 'Las contraseñas no coinciden',
    ],
  },
  { name: 'terms', label: 'Acepto términos', type: 'toggle', default: false },
];

const LoginFields = [commonFields.email, commonFields.password];

const ForgotFields = [commonFields.email];

const fieldsForm = ref([]);
switch (authUrl) {
  case 'register':
    fieldsForm.value = RegisterFields;
    break;
  case 'login':
    fieldsForm.value = LoginFields;
    break;
  case 'forgot':
    fieldsForm.value = ForgotFields;
    break;
}

const formData = ref(
  Object.fromEntries(
    fieldsForm.value.map((field) => [field.name, field.default ?? '']),
  ),
);

function guardar(formulario) {
  console.log('Formulario enviado:', formulario);
  if (formulario.terms) {
    Notify.create({
      message: 'Gracias por tu compra',
      color: 'primary',
    });
  } else {
    Notify.create({
      message: 'Debes aceptar los términos y condiciones',
      color: 'negative',
    });
  }
}
</script>
