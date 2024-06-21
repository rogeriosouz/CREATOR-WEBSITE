import { createBrowserRouter, useNavigate } from 'react-router-dom'
import { Home } from './pages/home'
import { Login } from './pages/auth/login'
import { Register } from './pages/auth/register'
import { ReactNode, useEffect } from 'react'
import { getCookie } from './utils/getCookie'
import { Applications } from './pages/app/applications'
import { Application } from './pages/app/applications/id'
import { Browser } from './pages/app/applications/browser'
import ErrorPage from './error-page'
import { RecoveryPassword } from './pages/auth/recovery-password'
import { ForgotPassword } from './pages/auth/forgot-password'

function PrivateRoute({ children }: { children: ReactNode }) {
  const push = useNavigate()
  const authToken = getCookie('expired-at-auth-user')

  useEffect(() => {
    if (!authToken) {
      push('/auth/login')
    }
  }, [authToken, push])

  return authToken && children
}

function AuthRouter({ children }: { children: ReactNode }) {
  const push = useNavigate()
  const authToken = getCookie('expired-at-auth-user')

  useEffect(() => {
    if (authToken) {
      push('/app/applications')
    }
  }, [authToken, push])

  return !authToken && children
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/app/applications',
    element: (
      <PrivateRoute>
        <Applications />
      </PrivateRoute>
    ),
  },
  {
    path: '/app/applications/:id',
    element: (
      <PrivateRoute>
        <Application />
      </PrivateRoute>
    ),
  },
  {
    path: '/app/applications/browser/:id',
    element: (
      <PrivateRoute>
        <Browser />
      </PrivateRoute>
    ),
  },
  {
    path: '/auth/login',
    element: (
      <AuthRouter>
        <Login />
      </AuthRouter>
    ),
  },
  {
    path: '/auth/register',
    element: (
      <AuthRouter>
        <Register />
      </AuthRouter>
    ),
  },
  {
    path: '/auth/forgot-password',
    element: (
      <AuthRouter>
        <ForgotPassword />
      </AuthRouter>
    ),
  },
  {
    path: '/auth/recovery-password/:token',
    element: (
      <AuthRouter>
        <RecoveryPassword />
      </AuthRouter>
    ),
  },
])
