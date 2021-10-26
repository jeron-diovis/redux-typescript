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

    // Django
    // @see https://docs.djangoproject.com/en/3.2/ref/csrf/#ajax
    // xsrfCookieName: 'csrftoken',
    // xsrfHeaderName: 'X-CSRFToken',

    ...cfg,
  })

  inst.interceptors.request.use(request => {
    request.url = ensureTrailingSlash(request.url ?? '/')
    return request
  })

  // You may use this if you're working with Django backend
  /*inst.interceptors.response.use(undefined, (e: AxiosError) => {
    const data = e.response?.data ?? {}
    const djangoError = data.non_field_errors?.[0] ?? data.detail
    if (djangoError !== undefined) {
      e.message = djangoError
    }
    return Promise.reject(e)
  })*/

  return inst
}

function ensureTrailingSlash(str: string): string {
  return str.replace(/([^/])$/, '$1/')
}
