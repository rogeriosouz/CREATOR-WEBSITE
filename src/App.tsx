import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/querryClient'
import { InicializeContextAuth } from './components/inicialize-context-auth'
import { Toaster } from './components/ui/sonner'
import { HelmetProvider } from 'react-helmet-async'
export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <InicializeContextAuth>
        <Toaster richColors position="top-center" />
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
      </InicializeContextAuth>
    </QueryClientProvider>
  )
}
