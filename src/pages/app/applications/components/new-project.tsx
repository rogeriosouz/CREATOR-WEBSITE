import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { api } from '@/lib/api'
import { queryClient } from '@/lib/querryClient'
import { zodResolver } from '@hookform/resolvers/zod'
import { CircleNotch } from '@phosphor-icons/react'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { z } from 'zod'

const newProjectSchema = z.object({
  name: z.string().min(5),
})

type NewProject = z.infer<typeof newProjectSchema>

export function NewProject() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewProject>({
    resolver: zodResolver(newProjectSchema),
  })

  const newProjectMutation = useMutation<
    { message: string; statusCode: string },
    { response: { data: { statusCode: number; message: string } } },
    { name: string }
  >({
    mutationFn: async ({ name }) => {
      const { data } = await api.post('/projects', {
        name,
      })

      return data
    },
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries({
        queryKey: ['/projects'],
      })
    },
    onError: (error) => {
      toast.error(error.response.data.message)
    },
  })

  function newProject(data: NewProject) {
    newProjectMutation.mutate(data)
  }

  const { status } = newProjectMutation

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'}>Criar projeto +</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold text-xl">
            Criar novo projeto.
          </DialogTitle>
          <DialogDescription>Crie seu novo projeto abaixo.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(newProject)} className="w-full space-y-5">
          <label className="block w-full space-y-1">
            <p>Nome</p>

            <Input
              {...register('name')}
              isError={!!errors.name}
              messageError={errors.name?.message}
              placeholder="nome"
            />
          </label>

          <Button type="submit" className="w-full">
            {status === 'pending' ? (
              <CircleNotch className="animate-spin size-5" />
            ) : (
              'criar projeto'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
