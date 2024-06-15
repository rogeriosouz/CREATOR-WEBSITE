import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { api } from '@/lib/api'
import { Helmet } from 'react-helmet-async'
import {
  ApplicationErrorResponse,
  ApplicationResponse,
} from '../id/components/browser'
import { generateOutputBrowser } from '../id/store/useApplicationStore'

export function Browser() {
  const { id } = useParams()

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

      {status === 'success' && (
        <iframe
          title="output-browser"
          srcDoc={generateOutputBrowser({
            html: data.project.html.length >= 1 ? data.project.html : '',
            css: data.project.css.length >= 1 ? data.project.css : '',
            javascript:
              data.project.javascript.length >= 1
                ? data.project.javascript
                : '',
          })}
          style={{ width: '100%', height: '100%' }}
          sandbox="allow-scripts allow-same-origin allow-top-navigation"
        />
      )}
    </section>
  )
}
