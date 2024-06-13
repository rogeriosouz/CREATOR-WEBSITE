import { useAuthStore } from '@/store/useAuthStore'
import { ReactNode, useEffect } from 'react'

export function InicializeContextAuth({ children }: { children: ReactNode }) {
  const [init] = useAuthStore((store) => [store.init])

  useEffect(() => {
    init()
  }, [init])

  return children
}
