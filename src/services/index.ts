import axios, { AxiosError, AxiosResponse } from "axios";
import { setQueryPath } from "../utilities/pagination";

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
  if (err.response?.status === 404) location.replace('/notFound')
  throw err
}

const api = {
  get: async <R>(url: string, params?: object | null, customError = false): Promise<R> => await instance.get(url, params as object).then(responseBody).catch(customError ? (e) => { throw e } : errorHandler),
  post: async <B, R>(url: string, body: B): Promise<R> => await instance.post(url, body).then(responseBody).catch(errorHandler),
}

export const postLogin = (body: LoginReqType) => {
  return api.post<LoginReqType, LoginResType>('/login', body)
}

export const getProductList = ({ page = 1, size = 10 }: ProductListReqType, customError = false) => {
  return api.get<ProductListResType>(setQueryPath('/products', { page, size }), null, customError)
}

export const getProductDetail = (id: string) => {
  return api.get<{ product: ProductType }>(`/products/${+id}`)
}
