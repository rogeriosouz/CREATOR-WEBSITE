import { Link } from "react-router-dom";
import { Project } from "./list-projects";
import { formatDate } from "@/utils/format-date";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowSquareOut, DotsThree, Files, Users } from "@phosphor-icons/react";
import { UpdateProject } from "./update-project";
import { DeleteProject } from "./delete-project";
import { useAuthStore } from "@/store/useAuthStore";

interface CardProjectProps {
  project: Project;
  isCommunity?: boolean;
}

export function CardProject({
  project: { id, name, description, updatedAt },
  isCommunity = false,
}: CardProjectProps) {
  const { user } = useAuthStore();
  return (
    <div className="w-full relative">
      {!isCommunity && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={"outline"}
              size="icon"
              className="absolute top-4 right-2 rounded-full border border-border/60 bg-background/80 hover:bg-accent hover:border-primary transition-all shadow-sm"
            >
              <DotsThree className="size-5" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="py-1 px-1 flex flex-col gap-1">
            <UpdateProject nameProject={name} projectId={id} />

            <DeleteProject nameProject={name} projectId={id} />
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      <Link
        className="group mt-2 w-full rounded-md border border-border/70 bg-card/70 px-4 py-5 flex flex-col gap-4 shadow-sm hover:border-primary hover:bg-accent/40 hover:shadow-lg transition-all"
        to={`/app/applications/${id}`}
      >
        <div className="flex items-start gap-3">
          <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary group-hover:bg-primary/25 transition-colors">
            {isCommunity ? (
              <Users className="size-5" weight="fill" />
            ) : (
              <Files className="size-5" weight="fill" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <span className="inline-block text-[10px] font-medium uppercase tracking-wider text-primary bg-primary/15 px-2 py-0.5 rounded mb-1.5">
              {isCommunity ? "Comunidade" : "Meu projeto"}
            </span>
            <h2 className="truncate font-semibold text-base group-hover:text-primary transition-colors">
              {name}
            </h2>
            {description && (
              <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                {description}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 border-t border-border/50">
          {user && (
            <span className="truncate max-w-[50%]">por {user.name}</span>
          )}
          <span className="flex items-center gap-1 shrink-0">
            <ArrowSquareOut className="size-3.5" />
            Atualizado em {formatDate(updatedAt)}
          </span>
        </div>
      </Link>
    </div>
  );
}
