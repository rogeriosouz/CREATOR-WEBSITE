import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { queryClient } from "@/lib/querryClient";
import { CircleNotch, TrashSimple } from "@phosphor-icons/react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

interface DeleteProjectProps {
  projectId: string;
  nameProject: string;
}

export function DeleteProject({ nameProject, projectId }: DeleteProjectProps) {
  const [open, setOpen] = useState(false);

  const deleteProjectMutation = useMutation<
    { message: string; statusCode: string },
    { response: { data: { statusCode: number; message: string } } },
    { projectId: string }
  >({
    mutationFn: async ({ projectId }) => {
      const { data } = await api.delete(`/projects/${projectId}`);

      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["/projects"],
      });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  function deleteProject() {
    deleteProjectMutation.mutate({
      projectId,
    });
  }

  const { status } = deleteProjectMutation;

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button type="button" variant="ghost" size="sm" className="gap-2">
          <TrashSimple className="size-4" />
          Deletar projeto
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center justify-start gap-2 text-xl font-semibold text-destructive">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
              <TrashSimple className="size-5" weight="fill" />
            </span>
            Deletar projeto
          </AlertDialogTitle>
          <AlertDialogDescription className="text-left">
            Tem certeza que deseja deletar o projeto{" "}
            <span className="font-medium text-foreground">“{nameProject}”</span>
            ? Essa ação não poderá ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex items-center gap-2 justify-end">
            <AlertDialogCancel className="w-32">Cancelar</AlertDialogCancel>

            <Button
              onClick={deleteProject}
              variant="destructive"
              className="w-40 gap-2"
            >
              {status === "pending" ? (
                <CircleNotch className="size-5 animate-spin" />
              ) : (
                "Deletar projeto"
              )}
            </Button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
