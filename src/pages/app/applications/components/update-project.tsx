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
import { Pencil } from '@phosphor-icons/react'
import { CircleNotch } from '@phosphor-icons/react/dist/ssr'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { z } from 'zod'

const updateProjectSchema = z.object({
  name: z.string().min(5),
})

type UpdateProject = z.infer<typeof updateProjectSchema>

interface UpdateProjectProps {
  projectId: string
  nameProject: string
}

export function UpdateProject({ projectId, nameProject }: UpdateProjectProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UpdateProject>({
    resolver: zodResolver(updateProjectSchema),
  })

  const updateProjectMutation = useMutation<
    { message: string; statusCode: string },
    { response: { data: { statusCode: number; message: string } } },
    { name: string; projectId: string }
  >({
    mutationFn: async ({ name }) => {
      const { data } = await api.put(`/projects/${projectId}`, {
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

  function newProject(data: UpdateProject) {
    updateProjectMutation.mutate({ name: data.name, projectId })
  }

  useEffect(() => {
    setValue('name', nameProject)
  }, [nameProject, setValue])

  const { status } = updateProjectMutation

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant={'ghost'} size={'sm'} className="gap-2">
          <Pencil className="size-5" weight="fill" />
          Editar projeto
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold text-xl">
            Editar projeto.
          </DialogTitle>
          <DialogDescription>edite seu projeto abaixo.</DialogDescription>
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
              'Editar projeto'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
