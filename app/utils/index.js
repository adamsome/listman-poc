import get from 'lodash/get'

const navigator = get(global, 'navigator.userAgent')

export const hasWindow = typeof window !== 'undefined'
export const isBrowser = typeof navigator !== 'undefined' &&
                         navigator.indexOf('Node.js') === 1
