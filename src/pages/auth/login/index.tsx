import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Check, CircleNotch, WarningCircle } from '@phosphor-icons/react'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useAuthStore } from '@/store/useAuthStore'
import { Helmet } from 'react-helmet-async'

const schemaLogin = z.object({
  email: z.string().email(),
  password: z.string().min(5),
})

type SchemaLogin = z.infer<typeof schemaLogin>

export function Login() {
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

  // const loginMutation = useMutation<
  //   { message: string; statusCode: string },
  //   { response: { data: { statusCode: number; message: string } } },
  //   { email: string; password: string }
  // >({
  //   mutationFn: async ({ email, password }) => {
  //     const { data } = await api.post('/auth/login', { email, password })

  //     return data
  //   },
  // })

  function login(data: SchemaLogin) {
    loginFn({ email: data.email, password: data.password })
  }

  return (
    <div className="w-screen min-h-screen flex-col flex items-center justify-center">
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

      <form
        onSubmit={handleSubmit(login)}
        className="w-[450px] bg-white rounded-md p-10 shadow-2xl"
      >
        <h1 className="text-lg font-medium text-center mb-5">
          Faça o login abaixo
        </h1>

        <label className="block space-y-1 mb-2">
          <p className="font-normal">e-mail</p>
          <Input
            type="text"
            {...register('email')}
            isError={!!errors.email}
            messageError={errors.email?.message}
            placeholder="email@domain.com"
          />
        </label>

        <label className="block space-y-1 mb-5">
          <p>password</p>
          <Input
            type="password"
            {...register('password')}
            isError={!!errors.password}
            messageError={errors.password?.message}
            placeholder="senha"
          />

          <div className="w-full text-right">
            <Link
              className="text-sm font-normal hover:underline hover:opacity-90 transition-all"
              to={'/auth/recovery-password'}
            >
              Esqueceu sua senha?
            </Link>
          </div>
        </label>

        <Button
          disabled={status === 'pending'}
          variant="default"
          className="w-full mb-5"
        >
          {status === 'pending' ? (
            <CircleNotch className="animate-spin size-5" />
          ) : (
            'Fazer login'
          )}
        </Button>

        <p className="text-sm text-center font-normal">
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
