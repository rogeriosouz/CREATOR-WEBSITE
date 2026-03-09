import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";
import { queryClient } from "@/lib/querryClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleNotch, PencilSimple } from "@phosphor-icons/react";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { z } from "zod";

const updateProjectSchema = z.object({
  name: z.string().min(5),
});

type UpdateProject = z.infer<typeof updateProjectSchema>;

interface UpdateProjectProps {
  projectId: string;
  nameProject: string;
}

export function UpdateProject({ projectId, nameProject }: UpdateProjectProps) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<UpdateProject>({
    resolver: zodResolver(updateProjectSchema),
  });

  const updateProjectMutation = useMutation<
    { message: string; statusCode: string },
    { response: { data: { statusCode: number; message: string } } },
    { name: string; projectId: string }
  >({
    mutationFn: async ({ name }) => {
      const { data } = await api.put(`/projects/${projectId}`, {
        name,
      });

      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["/projects"],
      });
      reset();
      setOpen(false);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  function newProject(data: UpdateProject) {
    updateProjectMutation.mutate({ name: data.name, projectId });
  }

  useEffect(() => {
    setValue("name", nameProject);
  }, [nameProject, setValue]);

  const { status } = updateProjectMutation;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="ghost" size="sm" className="gap-2">
          <PencilSimple className="size-4" weight="fill" />
          Editar projeto
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/15 text-primary">
              <PencilSimple className="size-5" weight="fill" />
            </span>
            Editar projeto
          </DialogTitle>
          <DialogDescription>
            Atualize o nome deste projeto para mantê-lo sempre organizado.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(newProject)} className="w-full space-y-5">
          <label className="block w-full space-y-1">
            <p className="text-sm font-medium text-foreground/90">
              Nome do projeto
            </p>

            <Input
              {...register("name")}
              isError={!!errors.name}
              messageError={errors.name?.message}
              placeholder="Ex.: Dashboard de vendas"
            />
          </label>

          <Button type="submit" className="w-full gap-2">
            {status === "pending" ? (
              <CircleNotch className="animate-spin size-5" />
            ) : (
              "Editar projeto"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
