interface setCookieRequest {
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
  expirationDateString: Date
}

export async function setCookie({
  name,
  value,
  expirationDateString,
}: setCookieRequest) {
  return new Promise((resolve) => {
    const expirationDate = new Date(expirationDateString)
    const expires = 'expires=' + expirationDate.toUTCString()
    const cookieValue = encodeURIComponent(JSON.stringify(value))
    document.cookie = `${name}=${cookieValue};${expires};path=/`
    resolve(null)
  })
}
