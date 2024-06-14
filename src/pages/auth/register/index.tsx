import { Link, useNavigate } from 'react-router-dom'
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
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { z } from 'zod'
import { api } from '@/lib/api'
import { Helmet } from 'react-helmet-async'
import { useTheme } from '@/components/theme-provider'

const schemaRegister = z.object({
  name: z.string().min(5),
  email: z.string().email(),
  password: z.string().min(5),
})

type SchemaRegister = z.infer<typeof schemaRegister>

export function Register() {
  const { setTheme, theme } = useTheme()
  const push = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaRegister>({
    resolver: zodResolver(schemaRegister),
  })

  const registerMutation = useMutation<
    { message: string; statusCode: string },
    { response: { data: { statusCode: number; message: string } } },
    { name: string; email: string; password: string }
  >({
    mutationFn: async ({ name, email, password }) => {
      const { data } = await api.post('/auth/register', {
        name,
        email,
        password,
      })

      return data
    },
    onSuccess: () => {
      setTimeout(() => {
        push('/auth/login')
      }, 1000)
    },
  })

  function registerSubmit(data: SchemaRegister) {
    registerMutation.mutate(data)
  }

  function setNewTheme() {
    if (theme === 'dark') {
      setTheme('light')
      return
    }

    setTheme('dark')
  }

  const { status, error, data } = registerMutation

  return (
    <div className="w-screen min-h-screen md:px-5 flex flex-col items-center justify-center">
      <Helmet>
        <title>register</title>
      </Helmet>

      {status === 'error' && (
        <Alert variant={'destructive'} className="mb-5">
          <WarningCircle className="h-4 w-4" />
          <AlertDescription>{error.response.data.message}</AlertDescription>
        </Alert>
      )}

      {status === 'success' && (
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
        onSubmit={handleSubmit(registerSubmit)}
        className="w-[450px] md:px-7 md:w-full bg-white rounded-md p-10 box-shadow-card"
      >
        <div className="w-full flex flex-col items-center justify-center">
          <UserCircle className="size-10" weight="fill" />

          <h1 className="text-lg dark:text-black font-medium text-center mb-5">
            Faça o registro abaixo
          </h1>
        </div>

        <label className="block space-y-1 mb-2">
          <p className="font-normal dark:text-black ">nome</p>
          <Input
            type="text"
            {...register('name')}
            isError={!!errors.name}
            messageError={errors.name?.message}
            placeholder="name"
          />
        </label>

        <label className="block space-y-1 mb-2">
          <p className="font-normal dark:text-black ">e-mail</p>
          <Input
            type="text"
            {...register('email')}
            isError={!!errors.email}
            messageError={errors.email?.message}
            placeholder="email@domain.com"
          />
        </label>

        <label className="block space-y-1 mb-5">
          <p className="font-normal dark:text-black ">password</p>
          <Input
            type="password"
            {...register('password')}
            isError={!!errors.password}
            messageError={errors.password?.message}
            placeholder="senha"
          />
        </label>

        <Button
          disabled={status === 'pending'}
          variant="default"
          className="w-full mb-5 dark:bg-secondary dark:text-white dark:hover:opacity-90 dark:transition-all"
        >
          {status === 'pending' ? (
            <CircleNotch className="animate-spin size-5" />
          ) : (
            'Fazer registro'
          )}
        </Button>

        <p className="text-sm dark:text-black text-center font-normal">
          se já possui uma conta clique aqui{' '}
          <Link
            to={'/auth/login'}
            className="hover:underline font-bold hover:opacity-90 transition-all"
          >
            fazer login
          </Link>
        </p>
      </form>
    </div>
  )
}
