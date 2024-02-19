import axios, { AxiosRequestConfig } from 'axios'
import qs from 'qs'

export const API_BASE_URL = '/api'

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
    const { baseURL = '' } = request
    request.baseURL = normalizeSlashes(addPrefix(API_BASE_URL, baseURL))
    request.url = normalizeSlashes(ensureTrailingSlash(request.url ?? '/'))
    return request
  })

  return inst
}

function ensureTrailingSlash(str: string): string {
  return str === '' ? '/' : str.replace(/([^/])$/, '$1/')
}

function normalizeSlashes(x: string): string {
  // When Safari will finally support lookbehind assertions: .replace(/(?<!:)\/+/g, '/')
  return x.replace(/(:\/)?\/+/g, '$1/')
}

function addPrefix(prefix: string, base: string): string {
  return base.startsWith('/') || base.startsWith('http')
    ? base
    : `${prefix}/${base}`
}
