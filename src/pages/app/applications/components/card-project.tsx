import { Link } from 'react-router-dom'
import { Project } from './list-projects'
import { formatDate } from '@/utils/format-date'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { DotsThree } from '@phosphor-icons/react'
import { UpdateProject } from './update-project'
import { DeleteProject } from './delete-project'

interface CardProjectProps {
  project: Project
}

export function CardProject({
  project: { id, name, updatedAt },
}: CardProjectProps) {
  return (
    <div className="w-full relative   flex flex-col items-center justify-center ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={'outline'}
            className="absolute hover:bg-secondary border hover:border-primary transition-all top-4 right-2"
          >
            <DotsThree className="size-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="py-1 px-1 flex flex-col gap-1">
          <UpdateProject nameProject={name} projectId={id} />

          <DeleteProject nameProject={name} projectId={id} />
        </DropdownMenuContent>
      </DropdownMenu>

      <Link
        className="text-center mt-2  w-full py-10 border rounded hover:border-primary hover:bg-secondary transition-all"
        to={`/app/applications/${id}`}
      >
        <h2 className="font-normal mb-1">{name}</h2>
        <p className="text-center ">
          última atualização: {formatDate(updatedAt)}
        </p>
      </Link>
    </div>
  )
}
