// http.service.ts
import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { OMDB_API_KEY } from 'src/constants';

@Injectable()
export class OmdbApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'http://www.omdbapi.com/',
      timeout: 5000,
      headers: { 'Content-Type': 'application/json' },
      params: { apikey: OMDB_API_KEY },
    });
  }

  async get<T>(url: string, params?: any): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, { params });
    return response.data;
  }
}
