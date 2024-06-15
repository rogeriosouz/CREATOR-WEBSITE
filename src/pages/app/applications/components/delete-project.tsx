import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'
import { queryClient } from '@/lib/querryClient'
import { CircleNotch, Trash } from '@phosphor-icons/react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

interface DeleteProjectProps {
  projectId: string
  nameProject: string
}

export function DeleteProject({ nameProject, projectId }: DeleteProjectProps) {
  const deleteProjectMutation = useMutation<
    { message: string; statusCode: string },
    { response: { data: { statusCode: number; message: string } } },
    { projectId: string }
  >({
    mutationFn: async ({ projectId }) => {
      const { data } = await api.delete(`/projects/${projectId}`)

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

  function deleteProject() {
    deleteProjectMutation.mutate({
      projectId,
    })
  }

  const { status } = deleteProjectMutation

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="button" variant={'ghost'} size={'sm'} className="gap-2">
          <Trash className="size-5" />
          deletar projeto
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deletar projeto ({nameProject})</AlertDialogTitle>
          <AlertDialogDescription>
            Você realmente desejá deletar esse projeto ({nameProject})
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex items-center gap-2 justify-center">
            <AlertDialogCancel>Cancelar</AlertDialogCancel>

            <Button onClick={deleteProject} variant={'destructive'}>
              {status === 'pending' ? (
                <CircleNotch className="size-5 animate-spin" />
              ) : (
                'Deletar projeto'
              )}
            </Button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
