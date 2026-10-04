// Throws a TypeError when the text is not a valid absolute URL
export function parseUrl(text: string) {
  const url = new URL(text.trim())
  const params: Record<string, string | string[]> = {}
  url.searchParams.forEach((value, key) => {
    if (key in params) {
      params[key] = [].concat(params[key], value)
    } else {
      params[key] = value
    }
  })
  return {
    href: url.href,
    origin: url.origin,
    protocol: url.protocol,
    username: url.username,
    password: url.password,
    host: url.host,
    hostname: url.hostname,
    port: url.port,
    pathname: url.pathname,
    search: url.search,
    hash: url.hash,
    params,
  }
}
