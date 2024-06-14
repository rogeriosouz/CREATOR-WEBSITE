import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import {
  ArrowLeft,
  Check,
  CircleNotch,
  MoonStars,
  Sun,
  UserCircle,
  WarningCircle,
} from '@phosphor-icons/react'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useAuthStore } from '@/store/useAuthStore'
import { Helmet } from 'react-helmet-async'
import { useTheme } from '@/components/theme-provider'

const schemaLogin = z.object({
  email: z.string().email(),
  password: z.string().min(5),
})

type SchemaLogin = z.infer<typeof schemaLogin>

export function Login() {
  const { setTheme, theme } = useTheme()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaLogin>({
    resolver: zodResolver(schemaLogin),
  })

  const [loginFn, status, error, data] = useAuthStore((store) => [
    store.login,
    store.status,
    store.error,
    store.data,
  ])

  function login(data: SchemaLogin) {
    loginFn({ email: data.email, password: data.password })
  }

  function setNewTheme() {
    if (theme === 'dark') {
      setTheme('light')
      return
    }

    setTheme('dark')
  }

  return (
    <div className="w-screen md:px-5 min-h-screen flex-col flex items-center justify-center">
      <Helmet>
        <title>login</title>
      </Helmet>

      {status === 'error' && (
        <Alert variant={'destructive'} className="mb-5">
          <WarningCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {status === 'success' && data && (
        <Alert variant={'success'} className="mb-5">
          <Check className="h-4 w-4" />
          <AlertDescription>{data.message}</AlertDescription>
        </Alert>
      )}

      <div className="fixed py-2 top-0 w-full flex items-center justify-between px-5">
        <Button asChild variant={'outline'} size={'icon'}>
          <Link to={'/'}>
            <ArrowLeft className="size-5" weight="bold" />
          </Link>
        </Button>

        <Button onClick={setNewTheme} variant={'ghost'} size={'icon'}>
          {theme === 'light' ? (
            <MoonStars className="size-6" weight="fill" />
          ) : (
            <Sun className="size-6" weight="fill" />
          )}
        </Button>
      </div>

      <form
        onSubmit={handleSubmit(login)}
        className="w-[450px] bg-white rounded-md md:px-7 p-10 box-shadow-card md:w-full"
      >
        <div className="w-full flex flex-col items-center justify-center">
          <UserCircle className="size-10" weight="fill" />

          <h1 className="text-lg dark:text-black font-medium text-center mb-5">
            Faça o login abaixo
          </h1>
        </div>

        <label className="block space-y-1 mb-2">
          <p className="font-normal dark:text-black">e-mail</p>
          <Input
            type="text"
            {...register('email')}
            isError={!!errors.email}
            messageError={errors.email?.message}
            placeholder="email@domain.com"
          />
        </label>

        <label className="block space-y-1 mb-5">
          <p className="font-normal dark:text-black">password</p>
          <Input
            type="password"
            {...register('password')}
            isError={!!errors.password}
            messageError={errors.password?.message}
            placeholder="senha"
          />

          <div className="w-full text-right">
            <Link
              className="text-sm dark:text-black font-normal hover:underline hover:opacity-90 transition-all"
              to={'/auth/recovery-password'}
            >
              Esqueceu sua senha?
            </Link>
          </div>
        </label>

        <Button
          disabled={status === 'pending'}
          variant="default"
          className="w-full mb-5 dark:bg-secondary dark:text-white dark:hover:opacity-90 dark:transition-all"
        >
          {status === 'pending' ? (
            <CircleNotch className="animate-spin size-5" />
          ) : (
            'Fazer login'
          )}
        </Button>

        <p className="text-sm text-center dark:text-black font-normal">
          se não possui uma conta clique aqui{' '}
          <Link
            to={'/auth/register'}
            className="hover:underline font-bold hover:opacity-90 transition-all"
          >
            registra-se
          </Link>
        </p>
      </form>
    </div>
  )
}
