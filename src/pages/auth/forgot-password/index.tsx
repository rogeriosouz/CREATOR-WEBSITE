import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import {
  Check,
  CircleNotch,
  UserCircle,
  WarningCircle,
} from '@phosphor-icons/react'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Helmet } from 'react-helmet-async'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { ReturnToHome } from '../components/return-to-home'
import { ThemeButton } from '../components/theme-button'

const forgotPasswordSchema = z.object({
  email: z.string().email(),
})

type ForgotPassword = z.infer<typeof forgotPasswordSchema>

export function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPassword>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const forgotPasswordMutation = useMutation<
    { message: string; statusCode: string },
    { response: { data: { statusCode: number; message: string } } },
    { email: string }
  >({
    mutationFn: async ({ email }) => {
      const { data } = await api.post('/auth/forgot-password', {
        email,
      })

      return data
    },
  })

  function forgotPassword(data: ForgotPassword) {
    forgotPasswordMutation.mutate(data)
  }

  const { status, error, data } = forgotPasswordMutation

  return (
    <div className="w-screen md:px-5 min-h-screen flex-col flex items-center justify-center">
      <Helmet>
        <title>forgot password</title>
      </Helmet>

      {status === 'error' && (
        <Alert variant={'destructive'} className="mb-5">
          <WarningCircle className="h-4 w-4" />
          <AlertDescription>{error.response.data.message}</AlertDescription>
        </Alert>
      )}

      {status === 'success' && data && (
        <Alert variant={'success'} className="mb-5">
          <Check className="h-4 w-4" />
          <AlertDescription>{data.message}</AlertDescription>
        </Alert>
      )}

      <div className="fixed py-2 top-0 w-full flex items-center justify-between px-5">
        <ReturnToHome />

        <ThemeButton />
      </div>

      <form
        onSubmit={handleSubmit(forgotPassword)}
        className="w-[450px] bg-white rounded-md md:px-7 p-10 box-shadow-card md:w-full"
      >
        <div className="w-full flex flex-col items-center justify-center">
          <UserCircle className="size-10 dark:text-black" weight="fill" />

          <h1 className="text-lg dark:text-black font-medium text-center mb-5">
            Recuperar senha.
          </h1>
        </div>

        <label className="block space-y-1 mb-2">
          <p className="font-normal dark:text-black">E-mail</p>
          <Input
            type="text"
            {...register('email')}
            isError={!!errors.email}
            messageError={errors.email?.message}
            placeholder="email@email.com"
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
            'recuperar senha'
          )}
        </Button>
      </form>
    </div>
  )
}
