import { Link } from 'react-router-dom'
import { Project } from './list-projects'
import { formatDate } from '@/utils/format-date'

interface CardProjectProps {
  project: Project
}

export function CardProject({
  project: { id, name, updatedAt },
}: CardProjectProps) {
  return (
    <Link
      to={`/app/applications/${id}`}
      className="w-full hover:border-primary hover:bg-secondary transition-all py-10 flex flex-col items-center justify-center border rounded"
    >
      <h2 className="font-normal mb-1">{name}</h2>
      <p className="text-center ">
        última atualização: {formatDate(updatedAt)}
      </p>
    </Link>
  )
}
