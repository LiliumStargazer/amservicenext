// src/utils/fetcher.ts

import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Tipo per rappresentare i parametri di una richiesta
export type ApiParams = Record<string, string | number | boolean | undefined | null>;

// Tipo per rappresentare la risposta dell'API
export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

// Tipo per gli errori API con dettagli aggiuntivi
export interface ApiError extends Error {
  status?: number;
  info?: unknown;
  isApiError: boolean;
}

// Configurazione base di Axios
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface ErrorResponse {
    message?: string;
    error?: string;
    // Altri campi che potrebbero essere presenti nella risposta di errore
}

/**
 * Trasforma un errore Axios in un formato più utilizzabile con SWR
 */
const handleApiError = (error: AxiosError<ErrorResponse>): ApiError => {
    const apiError = new Error(
        error.response?.data?.message || error.response?.data?.error || error.message
    ) as ApiError;

    apiError.status = error.response?.status;
    apiError.info = error.response?.data;
    apiError.isApiError = true;

    return apiError;
};


/**
 * Fetcher base per richieste GET
 * Accetta un URL e parametri opzionali
 */
export const fetcher = async <T>(
  [url, params]: [string, ApiParams?]
): Promise<T> => {
  try {
    const config: AxiosRequestConfig = {};
    
    if (params) {
      config.params = params;
    }
    
    const response: AxiosResponse<T> = await axiosInstance.get<T>(url, config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw handleApiError(error);
    }
    throw error;
  }
};

/**
 * Fetcher con autenticazione per richieste che richiedono token
 * Aggiunge automaticamente l'header di autorizzazione
 */
export const authFetcher = async <T>(
  [url, params]: [string, ApiParams?]
): Promise<T> => {
  try {
    // Recupera il token (adatta questo alla tua gestione dell'autenticazione)
    const token = localStorage.getItem('auth_token');
    
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    };
    
    if (params) {
      config.params = params;
    }
    
    const response: AxiosResponse<T> = await axiosInstance.get<T>(url, config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw handleApiError(error);
    }
    throw error;
  }
};

/**
 * Metodo per richieste POST con SWR mutate
 */
export const postData = async <TData, TResponse>(
  url: string, 
  data: TData,
  config?: AxiosRequestConfig
): Promise<TResponse> => {
  try {
    const response: AxiosResponse<TResponse> = await axiosInstance.post<TResponse>(url, data, config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw handleApiError(error);
    }
    throw error;
  }
};

/**
 * Metodo per richieste PUT con SWR mutate
 */
export const putData = async <TData, TResponse>(
  url: string, 
  data: TData,
  config?: AxiosRequestConfig
): Promise<TResponse> => {
  try {
    const response: AxiosResponse<TResponse> = await axiosInstance.put<TResponse>(url, data, config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw handleApiError(error);
    }
    throw error;
  }
};

/**
 * Metodo per richieste DELETE con SWR mutate
 */
export const deleteData = async <TResponse>(
  url: string,
  config?: AxiosRequestConfig
): Promise<TResponse> => {
  try {
    const response: AxiosResponse<TResponse> = await axiosInstance.delete<TResponse>(url, config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw handleApiError(error);
    }
    throw error;
  }
};

// Esporta un oggetto per accedere a tutti i metodi
const apiUtils = {
  fetcher,
  authFetcher,
  postData,
  putData,
  deleteData,
};

export default apiUtils;