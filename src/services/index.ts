import axios, { AxiosError, AxiosResponse } from "axios";

const instance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "http://localhost:3000",
    mode: "cors",
  },
  baseURL: "",
  timeout: 15000,
})

const responseBody = (res: AxiosResponse) => res.data.data;

const errorHandler = (err: AxiosError) => {
  throw err
}

const api = {
  get: async <R>(url: string, params?: object): Promise<R> => await instance.get(url, params).then(responseBody).catch(errorHandler),
  post: async <B, R>(url: string, body: B): Promise<R> => await instance.post(url, body).then(responseBody).catch(errorHandler),
}

export const postLogin = (body: LoginReqType) => api.post<LoginReqType, LoginResType>('/login', body)
