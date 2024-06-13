import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import { CardProject } from './card-project'
import { LoadingCardProject } from './loading-card-project'

export type Project = {
  id: string
  name: string
  updatedAt: Date
}

interface ProjectsResponse {
  statusCode: number
  projects: Project[]
}

interface ProjectsErrorResponse {
  statusCode: number
  message: string
}

export function ListProjects() {
  const { data, status } = useQuery<ProjectsResponse, ProjectsErrorResponse>({
    queryKey: ['/projects'],
    queryFn: async () => {
      const { data } = await api.get<{
        statusCode: number
        projects: [
          {
            id: string
            name: string
            updated_at: Date
          },
        ]
      }>('/projects')

      const newProjects = data.projects.map((project) => ({
        id: project.id,
        name: project.name,
        updatedAt: project.updated_at,
      }))

      return {
        statusCode: data.statusCode,
        projects: newProjects,
      }
    },
  })

  return (
    <div className="grid grid-cols-5 gap-10 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
      {status === 'pending' && (
        <>
          <LoadingCardProject />
          <LoadingCardProject />
          <LoadingCardProject />
        </>
      )}

      {status === 'success' && (
        <>
          {data.projects.map((project) => (
            <CardProject key={project.id} project={project} />
          ))}
        </>
      )}

      {status === 'success' && data.projects.length <= 0 && (
        <h3 className="font-medium text-muted">
          Parece que você não possui nenhum projeto.
        </h3>
      )}
    </div>
  )
}
