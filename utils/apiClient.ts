import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import env from './env';
import { logger } from './logger';

/**
 * Client API centralisé pour les tests API
 * Gère l'authentification, les headers et les logs
 */
class ApiClient {
  private client: AxiosInstance;
  private authToken?: string;

  constructor(baseURL?: string) {
    this.client = axios.create({
      baseURL: baseURL || env.apiBaseUrl,
      timeout: env.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Intercepteur pour les requêtes
    this.client.interceptors.request.use((config) => {
      if (this.authToken) {
        config.headers.Authorization = `Bearer ${this.authToken}`;
      }
      logger.debug(`[API] ${config.method?.toUpperCase()} ${config.url}`);
      return config;
    });

    // Intercepteur pour les réponses
    this.client.interceptors.response.use(
      (response) => {
        logger.debug(
          `[API] ${response.status} ${response.config.url}`,
          response.data
        );
        return response;
      },
      (error) => {
        logger.error(`[API] ${error.message}`, error.response?.data);
        return Promise.reject(error);
      }
    );
  }

  setAuthToken(token: string): void {
    this.authToken = token;
    this.client.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  clearAuthToken(): void {
    this.authToken = undefined;
    delete this.client.defaults.headers.common.Authorization;
  }

  async get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.get<T>(url, config);
  }

  async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.post<T>(url, data, config);
  }

  async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.put<T>(url, data, config);
  }

  async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.delete<T>(url, config);
  }

  async patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.patch<T>(url, data, config);
  }

  getClient(): AxiosInstance {
    return this.client;
  }
}

export const apiClient = new ApiClient();
export default ApiClient;
