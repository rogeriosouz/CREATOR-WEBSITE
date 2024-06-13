import { Link } from 'react-router-dom'
import { Project } from './list-projects'
import { formatDate } from '@/utils/format-date'

import { UpdateProject } from './update-project'

interface CardProjectProps {
  project: Project
}

export function CardProject({
  project: { id, name, updatedAt },
}: CardProjectProps) {
  return (
    <div className="w-full relative hover:border-primary hover:bg-secondary transition-all py-10 flex flex-col items-center justify-center border rounded">
      <UpdateProject nameProject={name} projectId={id} />

      <Link className="text-center mt-2" to={`/app/applications/${id}`}>
        <h2 className="font-normal mb-1">{name}</h2>
        <p className="text-center ">
          última atualização: {formatDate(updatedAt)}
        </p>
      </Link>
    </div>
  )
}
