import type { FetchOptions } from 'ofetch';

export const useApi = () => {
  const {
    public: { apiBase },
  } = useRuntimeConfig();

  // Configuración base para ofetch (opcional: headers, auth, etc.)
  const baseOptions: FetchOptions = {
    baseURL: apiBase,
    headers: {
      Accept: 'application/json',
    },
  };

  // GET: Obtener datos
  const get = async <T>(
    endpoint: string,
    options?: FetchOptions,
  ): Promise<T> => {
    return await $fetch(endpoint, {
      ...baseOptions,
      ...options,
      method: 'GET',
    });
  };

  // POST: Crear recursos
  const post = async <T>(
    endpoint: string,
    body: any,
    options?: FetchOptions,
  ): Promise<T> => {
    console.log(`POST a ${endpoint}:`, body);

    // Asegurarse de que los datos se envíen como JSON
    const requestOptions = {
      ...baseOptions,
      ...options,
      method: 'POST' as const,
      body: JSON.stringify(body),
      headers: {
        ...baseOptions.headers,
        'Content-Type': 'application/json',
      },
    };

    console.log('Opciones de solicitud:', requestOptions);

    try {
      const response = await $fetch(endpoint, requestOptions);
      console.log(`Respuesta de ${endpoint}:`, response);
      return response as T;
    } catch (error) {
      console.error(`Error en POST a ${endpoint}:`, error);
      throw error;
    }
  };

  // PUT: Actualizar recurso completo
  const put = async <T>(
    endpoint: string,
    body: any,
    options?: FetchOptions,
  ): Promise<T> => {
    return await $fetch(endpoint, {
      ...baseOptions,
      ...options,
      method: 'PUT',
      body,
    });
  };

  // PATCH: Actualización parcial
  const patch = async <T>(
    endpoint: string,
    body: any,
    options?: FetchOptions,
  ): Promise<T> => {
    return await $fetch(endpoint, {
      ...baseOptions,
      ...options,
      method: 'PATCH',
      body,
    });
  };

  // DELETE: Eliminar recurso
  const del = async <T>(
    endpoint: string,
    options?: FetchOptions,
  ): Promise<T> => {
    return await $fetch(endpoint, {
      ...baseOptions,
      ...options,
      method: 'DELETE',
    });
  };

  // Upload: Subida de archivos (imágenes, etc.)
  const upload = async <T>(
    endpoint: string,
    file: File,
    fieldName: string = 'file',
    extraData: Record<string, any> = {},
    options?: FetchOptions,
  ): Promise<T> => {
    const formData = new FormData();
    formData.append(fieldName, file);

    // Agrega datos adicionales al FormData (opcional)
    Object.entries(extraData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    return await $fetch(endpoint, {
      ...baseOptions,
      ...options,
      method: 'POST',
      body: formData,
      headers: {
        ...baseOptions.headers,
        'Content-Type': 'multipart/form-data', // Importante para archivos
      },
    });
  };

  return { get, post, put, patch, delete: del, upload };
};
