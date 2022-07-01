import qs from 'qs'

export function parseQueryString(string: string) {
  return qs.parse(string, { ignoreQueryPrefix: true })
}

export function normalizeUrl(url: string) {
  return /^https?:\/\//.test(url) ? url : `http://${url.trim()}`
}

export function formatBool(x: boolean): string {
  return x ? 'Yes' : 'No'
}
