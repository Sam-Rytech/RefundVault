export function shorten(addr?: string, left = 6, right = 4) {
  if (!addr) return ''
  return `${addr.slice(0, left)}…${addr.slice(-right)}`
}
