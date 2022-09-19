import axios, { AxiosInstance } from "axios";


export default class Api {
    private axios: AxiosInstance;

    constructor() {
        this.axios = axios.create({
            baseURL: '/api'
        });
    }
    protected async get<T>(url: string, params?: any): Promise<T> {
        const response = await this.axios.get(url, params);
        return response.data;
    }
    protected async post<T>(url: string, params?: any): Promise<T> {
        const response = await this.axios.post(url, params);
        return response.data;
    }
    protected async put<T>(url: string, params?: any): Promise<T> {
        const response = await this.axios.put(url, params);
        return response.data;
    }
    protected async delete<T>(url: string, params?: any): Promise<T> {
        const response = await this.axios.delete(url, params);
        return response.data;
    }
}