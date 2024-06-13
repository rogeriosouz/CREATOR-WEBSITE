import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Check, CircleNotch, WarningCircle } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { z } from 'zod'
import { api } from '@/lib/api'
import { Helmet } from 'react-helmet-async'

const schemaRegister = z.object({
  name: z.string().min(5),
  email: z.string().email(),
  password: z.string().min(5),
})

type SchemaRegister = z.infer<typeof schemaRegister>

export function Register() {
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

  const { status, error, data } = registerMutation

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center">
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

      <form
        onSubmit={handleSubmit(registerSubmit)}
        className="w-[450px] bg-white rounded-md p-10 shadow-lg"
      >
        <h1 className="text-lg font-medium text-center mb-5">
          Faça o registro abaixo
        </h1>

        <label className="block space-y-1 mb-2">
          <p className="font-normal">nome</p>
          <Input
            type="text"
            {...register('name')}
            isError={!!errors.name}
            messageError={errors.name?.message}
            placeholder="name"
          />
        </label>

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
        </label>

        <Button
          disabled={status === 'pending'}
          variant="default"
          className="w-full mb-5"
        >
          {status === 'pending' ? (
            <CircleNotch className="animate-spin size-5" />
          ) : (
            'Fazer registro'
          )}
        </Button>

        <p className="text-sm text-center font-normal">
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
