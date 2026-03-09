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
import { CircleNotch, FilePlus } from "@phosphor-icons/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { z } from "zod";

const newProjectSchema = z.object({
  name: z.string().min(5),
});

type NewProject = z.infer<typeof newProjectSchema>;

export function NewProject() {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewProject>({
    resolver: zodResolver(newProjectSchema),
  });

  const newProjectMutation = useMutation<
    { message: string; statusCode: string },
    { response: { data: { statusCode: number; message: string } } },
    { name: string }
  >({
    mutationFn: async ({ name }) => {
      const { data } = await api.post("/projects", {
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

  function newProject(data: NewProject) {
    newProjectMutation.mutate(data);
  }

  const { status } = newProjectMutation;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="gap-2 rounded-full px-5 shadow-md hover:shadow-lg"
        >
          <FilePlus className="size-5" weight="fill" />
          Novo projeto
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/15 text-primary">
              <FilePlus className="size-5" weight="fill" />
            </span>
            Criar novo projeto
          </DialogTitle>
          <DialogDescription>
            Defina um nome para organizar melhor suas páginas e começar a editar
            em segundos.
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
              placeholder="Ex.: Landing page de produto"
            />
          </label>

          <Button type="submit" className="w-full gap-2">
            {status === "pending" ? (
              <CircleNotch className="animate-spin size-5" />
            ) : (
              "criar projeto"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
