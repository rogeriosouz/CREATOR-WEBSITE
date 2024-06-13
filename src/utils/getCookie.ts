// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getCookie(name: string) {
  const decodedCookie = decodeURIComponent(document.cookie)
  const cookieArray = decodedCookie.split(';')
  const cookieName = `${name}=`

  for (let i = 0; i < cookieArray.length; i++) {
    const cookie = cookieArray[i].trim()
    if (cookie.indexOf(cookieName) === 0) {
      return JSON.parse(cookie.substring(cookieName.length, cookie.length))
    }
  }
}
