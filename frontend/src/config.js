const browserHostname =
  typeof window !== 'undefined' && window.location.hostname
    ? window.location.hostname
    : 'localhost'

export const apiBaseUrl =
  import.meta.env.VITE_API_URL ?? `http://${browserHostname}:3001`

export const websocketUrl =
  import.meta.env.VITE_WS_URL ?? `ws://${browserHostname}:1234`
