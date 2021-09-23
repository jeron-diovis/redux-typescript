import axios, { AxiosRequestConfig } from 'axios'
import qs from 'qs'

export const API_BASE_URL = '/api/v1'

export default createInstance()

// ---

export function createInstance(cfg?: AxiosRequestConfig) {
  const inst = axios.create({
    /**
     * Don't use default axios' serializer because it's behaviour is non-standard.
     * @see https://github.com/axios/axios/issues/1111
     */
    paramsSerializer: params =>
      qs.stringify(params, {
        arrayFormat: 'repeat',
      }),

    baseURL: API_BASE_URL,
    ...cfg,
  })

  inst.interceptors.request.use(request => {
    request.url = ensureTrailingSlash(request.url ?? '/')
    return request
  })

  return inst
}

function ensureTrailingSlash(str: string): string {
  return str.replace(/([^/])$/, '$1/')
}
