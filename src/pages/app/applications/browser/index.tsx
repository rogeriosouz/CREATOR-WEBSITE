import { useEffect } from 'react'
import { useApplicationStore } from '../id/store/useApplicationStore'
import { useQuery } from '@tanstack/react-query'
import { ApplicationErrorResponse, ApplicationResponse } from '../id'
import { useParams } from 'react-router-dom'
import { api } from '@/lib/api'
import { Helmet } from 'react-helmet-async'

export function Browser() {
  const { id } = useParams()
  const [outputValue, setNewOutputValue] = useApplicationStore((store) => [
    store.outputValue,
    store.setNewOutputValue,
  ])

  const { data, status } = useQuery<
    ApplicationResponse,
    ApplicationErrorResponse
  >({
    queryKey: ['/application', id],
    queryFn: async () => {
      const { data } = await api.get(`/projects/${id}`)

      return data
    },
  })

  useEffect(() => {
    if (status === 'success' && data) {
      setNewOutputValue({
        html: data.project.html ? data.project.html : '',
        css: data.project.css ? data.project.css : '',
        javascript: data.project.javascript ? data.project.javascript : '',
      })
    }
  }, [data, setNewOutputValue, status])

  return (
    <section className="w-full h-screen">
      {status === 'pending' && (
        <Helmet>
          <title>Loading..</title>
        </Helmet>
      )}

      {status === 'success' && (
        <Helmet>
          <title>Browser - {data.project.name}</title>
        </Helmet>
      )}

      <iframe
        title="output"
        srcDoc={outputValue}
        style={{ width: '100%', height: '100%' }}
        sandbox="allow-scripts"
      />
    </section>
  )
}
