import { api } from '@/lib/api'
import { deleteCookie } from '@/utils/deleteCookie'
import { getCookie } from '@/utils/getCookie'
import { setCookie } from '@/utils/setCookie'
import { create } from 'zustand'

export type User = {
  id: string
  name: string
  email: string
}

export type LoginParams = {
  email: string
  password: string
}

interface UseAuthStoreProps {
  isAuthenticate: boolean
  user: User | null
  login: ({ email, password }: LoginParams) => Promise<void>
  status: 'idle' | 'pending' | 'error' | 'success'
  error: string | null
  data: { message: string; statusCode: number } | null
  init: () => void
  logout: () => Promise<void>
}

export const useAuthStore = create<UseAuthStoreProps>((set) => ({
  user: null,
  isAuthenticate: false,
  status: 'idle',
  error: null,
  data: null,
  init: async () => {
    const authCookie = await getCookie('expired-at-auth-user')

    if (authCookie) {
      set({
        isAuthenticate: true,
        user: {
          id: authCookie.user.id,
          name: authCookie.user.name,
          email: authCookie.user.email,
        },
      })
    }
  },

  login: async ({ email, password }: LoginParams) => {
    set({ status: 'pending' })
    try {
      const { data } = await api.post<{
        user: User
        expiredAt: Date
        message: string
        statusCode: number
      }>('/auth/login', {
        email,
        password,
      })

      await setCookie({
        name: 'expired-at-auth-user',
        value: {
          user: {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
          },
        },
        expirationDateString: data.expiredAt,
      })

      set({
        status: 'success',
        error: null,
        data: { message: data.message, statusCode: data.statusCode },
        user: {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
        },
      })

      setTimeout(() => {
        window.location.href = '/app/applications'
        set({ isAuthenticate: true })
      }, 1000)
    } catch (err) {
      const error = err as {
        response: { data: { statusCode: number; message: string } }
      }

      set({ status: 'error', error: error.response.data.message })
    }
  },

  logout: async () => {
    await api.get('/auth/logout')
    deleteCookie('expired-at-auth-user')
    window.location.href = '/auth/login'
  },
}))
