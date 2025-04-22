import { defineStore } from 'pinia';
import type { PersistenceOptions } from 'pinia-plugin-persistedstate';
import { Notify } from 'quasar';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isAuthenticated: false,
    user: null,
    token: null,
  }),

  persist: {
    enabled: true,
    strategies: [
      {
        key: 'auth',
        storage: typeof window !== 'undefined' ? localStorage : undefined,
      },
    ],
  } as PersistenceOptions,

  actions: {
    async verifyToken(token: string) {
      try {
        const { get } = useApi();
        const response = await get<{ message: string }>(
          `/auth/verify-email/${token}`,
        );
        console.log('response', response);

        // Si hay un mensaje, la verificación fue exitosa
        if (response.message) {
          this.isAuthenticated = true;
          this.user = { email: token.split('@')[0] }; // Usamos el email como nombre de usuario
          this.token = token;
          return true;
        }

        // Si no hay mensaje, la verificación falló
        this.isAuthenticated = false;
        this.user = null;
        this.token = null;
        return false;
      } catch (error) {
        console.error('Error al verificar token:', error);
        this.isAuthenticated = false;
        this.user = null;
        this.token = null;
        return false;
      }
    },

    async login(credentials: { email: string; password: string }) {
      try {
        const { post } = useApi();
        const response = await post<{
          user: User;
          token: string;
        }>('/auth/login', credentials);

        this.isAuthenticated = true;
        this.user = response.user;
        this.token = response.token;

        Notify.create({
          message: 'Inicio de sesión exitoso',
          color: 'positive',
        });
        console.log(response, 'entroooooo');
        return true;
      } catch (error: any) {
        console.log(error, 'Nooo entroooooo');

        let errorMessage = 'Error al iniciar sesión';

        if (error.response?.status === 404) {
          errorMessage = 'Usuario no encontrado';
        } else if (error.response?.status === 401) {
          errorMessage = 'Contraseña incorrecta';
        } else if (error.response?.status === 500) {
          errorMessage = 'Contraseña no definida';
        }

        Notify.create({
          message: errorMessage,
          color: 'negative',
        });

        this.isAuthenticated = false;
        this.user = null;
        this.token = null;
        return false;
      }
    },

    async forgotPassword(data: { email: string }) {
      try {
        const { post } = useApi();
        const response = await post<{ data: any; error?: string }>(
          '/auth/forgot-password',
          data,
        );

        if (response.error) {
          return false;
        }
        return true;
      } catch (error) {
        console.error('Error al solicitar recuperación de contraseña:', error);
        return false;
      }
    },

    async resetPassword(data: {
      email: string;
      password: string;
      verificationCode: string;
    }) {
      console.log('resetPassword en store:', data);
      try {
        const { post } = useApi();

        // Verificar que todos los campos requeridos estén presentes
        if (!data.email || !data.password || !data.verificationCode) {
          console.error('Faltan campos requeridos:', data);
          return false;
        }

        // Preparar los datos exactamente como en Postman
        const requestData = {
          email: data.email,
          newPassword: data.password,
          code: data.verificationCode,
        };

        console.log('Datos que se envían al servidor:', requestData);

        // Enviar la solicitud directamente
        const response = await post<{ data: any; error?: string }>(
          '/auth/reset-password',
          requestData,
        );

        console.log('Respuesta de la API:', response);

        if (response.error) {
          console.error('Error en la respuesta:', response.error);
          return false;
        }

        return true;
      } catch (error) {
        console.error(
          'Error al restablecer contraseña, verifique el codigo:',
          error,
        );
        return false;
      }
    },

    logout() {
      this.isAuthenticated = false;
      this.user = null;
      this.token = null;
    },
  },
});
