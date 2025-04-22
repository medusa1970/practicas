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
            :dense="true"
            color="primary"
            @submit="register"
            @update:modelValue="updateModel"
            :modelValue="formData"
            title="Registro de usuario"
            button-label="Registrar"
            :filled="false"
          />
        </q-card-section>
      </q-card>
      <q-card v-else-if="authUrl === 'login'">
        <q-card-section>
          <AuthForm
            :fields="fieldsForm"
            :dense="true"
            color="primary"
            @submit="login"
            @update:modelValue="updateModel"
            :modelValue="formData"
            title="Login de usuario"
            button-label="Ingresar"
          />
        </q-card-section>
      </q-card>

      <q-card v-else-if="authUrl === 'forgot'">
        <q-card-section>
          <AuthForm
            :fields="fieldsForm"
            :dense="true"
            color="primary"
            @submit="forgot"
            @update:modelValue="updateModel"
            :modelValue="formData"
            title="Recuperar contraseña"
            button-label="Recuperar"
          />
        </q-card-section>
      </q-card>

      <q-card v-else-if="authUrl === 'reset-password'">
        <q-card-section>
          <AuthForm
            :fields="fieldsForm"
            :dense="true"
            color="primary"
            @submit="resetPassword"
            @update:modelValue="updateModel"
            :modelValue="formData"
            title="Nueva contraseña"
            button-label="Cambiar contraseña"
          />
        </q-card-section>
      </q-card>

      <q-card v-else-if="authUrl === 'verified'">
        <q-card-section>
          <h5>verificado</h5>
        </q-card-section>
      </q-card>

      <q-card v-else>
        <q-card-section>
          <h5>error</h5>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useAuthStore } from '~/stores/auth';
const route = useRoute();
const authStore = useAuthStore();

// Cargar el estado del store al iniciar
onMounted(() => {
  if (typeof window !== 'undefined') {
    const savedState = localStorage.getItem('auth-store');
    if (savedState) {
      try {
        const state = JSON.parse(savedState);
        authStore.$patch(state);
      } catch (error) {
        console.error('Error al cargar el estado:', error);
      }
    }
  }
});

const authUrl = ref(route.params.auth as string);
const email = ref((route.query.email as string) || '');

// Verificar si es un token de autenticaciónl c
onMounted(async () => {
  if (
    !['login', 'register', 'forgot', 'reset-password'].includes(authUrl.value)
  ) {
    const isValid = await authStore.verifyToken(authUrl.value);
    if (isValid) {
      authUrl.value = 'verified';
      Notify.create({
        message: 'Cuenta verificada correctamente',
        color: 'positive',
      });
    } else {
      Notify.create({
        message: 'Token inválido o expirado',
        color: 'negative',
      });
    }
  }
});

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

// Campos comunes
const commonFields = {
  email: {
    name: 'email',
    label: 'Email',
    type: 'email',
    rules: [
      (val: string) => !!val || 'Campo requerido',
      (val: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Email no válido',
    ],
    hint: 'Ingrese su email, para confirmar.',
  },
  password: {
    name: 'password',
    label: 'Contraseña',
    type: 'password',
    hint: 'Mínimo 8 caracteres; incluir mayúsculas, minúsculas, números y símbolos.',
    rules: [
      function (val: string) {
        return !!val || 'La contraseña es obligatoria.';
      },
      function (val: string) {
        return (
          (val && val.length >= 8) ||
          'La contraseña debe tener al menos 8 caracteres.'
        );
      },
      function (val: string) {
        return (
          /[a-z]/.test(val) || 'Debe contener al menos una letra minúscula.'
        );
      },
      function (val: string) {
        return (
          /[A-Z]/.test(val) || 'Debe contener al menos una letra mayúscula.'
        );
      },
      function (val: string) {
        return /\d/.test(val) || 'Debe contener al menos un número.';
      },
      function (val: string) {
        return (
          /[!@#$%^&*(),.?":{}|<>]/.test(val) ||
          'Debe contener al menos un carácter especial (!@#$...).'
        );
      },
    ],
  },
  passwordConfirm: {
    name: 'passwordConfirm',
    label: 'Confirmar contraseña',
    type: 'password',
    rules: [
      function (val: string) {
        const password = formData.value?.password;
        return val === password || 'Las contraseñas no coinciden';
      },
    ],
  },
};

// Campos específicos para cada formulario
const RegisterFields = [
  {
    name: 'firstname',
    label: 'Nombre (s)',
    type: 'text',
    rules: [
      (val: string) => !!val || 'Campo requerido',
      (val: string) => val.length > 2 || 'Debe tener al menos 2 caracteres',
      (val: string) => val.length < 50 || 'Debe tener menos de 50 caracteres',
    ],
    hint: 'Mínimo 2 caracteres; máximo 50 caracteres.',
  },
  {
    name: 'lastname',
    label: 'Apellido (s)',
    type: 'text',
    rules: [
      (val: string) => !!val || 'Campo requerido',
      (val: string) => val.length > 2 || 'Debe tener al menos 2 caracteres',
      (val: string) => val.length < 50 || 'Debe tener menos de 50 caracteres',
    ],
    hint: 'Mínimo 2 caracteres; máximo 50 caracteres.',
  },
  {
    name: 'birthdate',
    label: 'Fecha de nacimiento',
    type: 'date',
    rules: [
      (val: string) => !!val || 'Campo requerido',
      (val: string) => {
        const birthDate = new Date(val);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
          age--;
        }

        return age >= 18 || 'Debe ser mayor de 18 años';
      },
    ],
    hint: 'Mínimo 18 años.',
  },
  {
    name: 'docId',
    label: 'Doc. Identidad',
    type: 'text',
    rules: [
      (val: string) => !!val || 'Campo requerido',
      (val: string) => val.length > 2 || 'Debe tener al menos 2 caracteres',
      (val: string) => val.length < 15 || 'Debe tener menos de 15 caracteres',
    ],
    hint: 'Mínimo 2 caracteres; máximo 15 caracteres.',
  },
  {
    name: 'gender',
    label: 'Género',
    type: 'select',
    options: ['Masculino', 'Femenino'],
    rules: [(val: string) => !!val || 'Campo requerido'],
  },
  {
    name: 'phone',
    label: 'Teléfono',
    type: 'number',
    rules: [
      (val: string) => !!val || 'Campo requerido',
      (val: string) =>
        /^[2347]\d{7}$/.test(val) ||
        'Número inválido. Debe tener 8 dígitos y empezar con 2, 3, 4 o 7',
    ],
    hint: 'Debe tener exactamente 8 dígitos. Líneas fijas inician con 2, 3, 4 y móviles con 7.',
  },
  {
    name: 'username',
    label: 'Nombre de usuario',
    type: 'text',
    rules: [
      (val: string) => !!val || 'Campo requerido',
      (val: string) => val.length > 2 || 'Debe tener al menos 6 caracteres',
      (val: string) => val.length < 15 || 'Debe tener menos de 15 caracteres',
    ],
    hint: 'Mínimo 6 caracteres; máximo 15 caracteres.',
  },
  commonFields.email,
  commonFields.password,
  commonFields.passwordConfirm,
  { name: 'terms', label: 'Acepto términos', type: 'toggle', default: false },
];

const LoginFields = [commonFields.email, commonFields.password];
const ForgotFields = [commonFields.email];
const ResetPasswordFields = [
  {
    name: 'verificationCode',
    label: 'Código de verificación',
    type: 'text',
    rules: [(val: string) => !!val || 'Campo requerido'],
  },
  commonFields.password,
  commonFields.passwordConfirm,
];
const fieldsForm = ref<Field[]>([]);
const formData = ref<Record<string, any>>({});

// Función para actualizar el modelo
function updateModel(data: Record<string, any>) {
  formData.value = data;
}

switch (authUrl.value) {
  case 'register':
    fieldsForm.value = RegisterFields;
    break;
  case 'login':
    fieldsForm.value = LoginFields;
    break;
  case 'forgot':
    fieldsForm.value = ForgotFields;
    break;
  case 'reset-password':
    fieldsForm.value = ResetPasswordFields;
    break;
  default:
    fieldsForm.value = LoginFields;
    break;
}

async function register(formulario: Record<string, any>) {
  if (formulario.terms) {
    try {
      const { post } = useApi();
      const response = await post<{ data: any; error?: string }>(
        '/auth/register',
        formulario,
      );
      if (response.error) {
        Notify.create({
          message: 'Error al registrar usuario',
          color: 'negative',
        });
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }
  } else {
    Notify.create({
      message: 'Debes aceptar los términos y condiciones',
      color: 'negative',
    });
  }
}

async function login(formulario: Record<string, any>) {
  const success = await authStore.login({
    email: formulario.email,
    password: formulario.password,
  });
  if (success) {
    Notify.create({
      message: 'Inicio de sesión exitoso',
      color: 'positive',
    });
    navigateTo('/dashboard');
  } else {
    Notify.create({
      message: 'Error al iniciar sesión',
      color: 'negative',
    });
  }
}

async function forgot(formulario: Record<string, any>) {
  const success = await authStore.forgotPassword({
    email: formulario.email,
  });
  if (success) {
    Notify.create({
      message: 'Se ha enviado un correo de recuperación a tu email',
      color: 'positive',
    });
    navigateTo({
      path: '/home/reset-password',
      query: { email: formulario.email },
    });
  } else {
    Notify.create({
      message: 'Error al enviar correo de recuperación',
      color: 'negative',
    });
  }
}

async function resetPassword(formulario: Record<string, any>) {
  console.log('Iniciando resetPassword con:', formulario);
  console.log('Email:', email.value);

  // Verificar si tenemos un email válido
  if (!email.value) {
    Notify.create({
      message: 'No se encontró el email para restablecer la contraseña',
      color: 'negative',
    });
    return;
  }

  // Verificar que todos los campos requeridos estén presentes
  if (!formulario.password || !formulario.verificationCode) {
    Notify.create({
      message: 'Todos los campos son obligatorios',
      color: 'negative',
    });
    return;
  }

  try {
    console.log('Enviando datos al store:', {
      email: email.value,
      password: formulario.password,
      verificationCode: formulario.verificationCode,
    });

    // Utilizar la función resetPassword del store
    const success = await authStore.resetPassword({
      email: email.value,
      password: formulario.password,
      verificationCode: formulario.verificationCode,
    });

    console.log('Resultado de resetPassword:', success);

    if (success) {
      Notify.create({
        message: 'Contraseña restablecida correctamente',
        color: 'positive',
      });
      navigateTo('/home/login');
    } else {
      Notify.create({
        message: 'Error al restablecer la contraseña',
        color: 'negative',
      });
    }
  } catch (error) {
    console.error('Error en resetPassword:', error);
    Notify.create({
      message: 'Error al restablecer la contraseña',
      color: 'negative',
    });
  }
}
</script>
