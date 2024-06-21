import { useNavigate, useParams } from 'react-router-dom'
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

const recoveryPasswordSchema = z
  .object({
    newPassword: z.string().min(5),
    confirmNewPassword: z.string().min(5),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmNewPassword'],
  })

type RecoveryPassword = z.infer<typeof recoveryPasswordSchema>

export function RecoveryPassword() {
  const { token } = useParams()
  const push = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecoveryPassword>({
    resolver: zodResolver(recoveryPasswordSchema),
  })

  const recoveryPasswordMutation = useMutation<
    { message: string; statusCode: string },
    { response: { data: { statusCode: number; message: string } } },
    { token: string; newPassword: string }
  >({
    mutationFn: async ({ token, newPassword }) => {
      const { data } = await api.post('/auth/recovery-password', {
        token,
        newPassword,
      })

      return data
    },
    onSuccess: () => {
      setTimeout(() => {
        push('/auth/login')
      }, 1000)
    },
  })

  function recoveryPassword(data: RecoveryPassword) {
    recoveryPasswordMutation.mutate({
      token: token as string,
      newPassword: data.newPassword,
    })
  }

  const { status, error, data } = recoveryPasswordMutation

  return (
    <div className="w-screen md:px-5 min-h-screen flex-col flex items-center justify-center">
      <Helmet>
        <title>recovery password</title>
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
        onSubmit={handleSubmit(recoveryPassword)}
        className="w-[450px] bg-white rounded-md md:px-7 p-10 box-shadow-card md:w-full"
      >
        <div className="w-full flex flex-col items-center justify-center">
          <UserCircle className="size-10 dark:text-black" weight="fill" />

          <h1 className="text-lg dark:text-black font-medium text-center mb-5">
            Redefina sua senha abaixo.
          </h1>
        </div>

        <label className="block space-y-1 mb-2">
          <p className="font-normal dark:text-black">nova senha</p>
          <Input
            type="text"
            {...register('newPassword')}
            isError={!!errors.newPassword}
            messageError={errors.newPassword?.message}
            placeholder="nova senha"
          />
        </label>

        <label className="block space-y-1 mb-5">
          <p className="font-normal dark:text-black">repita a senha</p>
          <Input
            type="password"
            {...register('confirmNewPassword')}
            isError={!!errors.confirmNewPassword}
            messageError={errors.confirmNewPassword?.message}
            placeholder="repita a senha"
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
            'modificar senha'
          )}
        </Button>
      </form>
    </div>
  )
}
