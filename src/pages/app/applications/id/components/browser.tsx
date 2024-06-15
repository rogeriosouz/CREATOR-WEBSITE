import { useQuery } from '@tanstack/react-query'
import {
  generateOutputBrowser,
  generateOutputView,
  useApplicationStore,
} from '../store/useApplicationStore'
import { useParams } from 'react-router-dom'
import { api } from '@/lib/api'
import { useEffect } from 'react'

export type Project = {
  id: string
  name: string
  html: string
  css: string
  javascript: string
}

export interface ApplicationResponse {
  statusCode: number
  project: Project
}

export interface ApplicationErrorResponse {
  statusCode: number
  message: string
}

export function Browser() {
  const { id } = useParams()

  const [
    setHtml,
    setCss,
    setJavascript,
    setOutputLanguagesValue,
    setCodeValue,
  ] = useApplicationStore((store) => [
    store.setHtml,
    store.setCss,
    store.setJavascript,
    store.setOutputLanguagesValue,
    store.setCodeValue,
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
      const html = data.project.html ? data.project.html : ''
      const css = data.project.css ? data.project.css : ''
      const javascript = data.project.javascript ? data.project.javascript : ''

      setCodeValue(generateOutputView({ html, css, javascript }))

      setHtml(html)
      setCss(css)
      setJavascript(javascript)

      setOutputLanguagesValue({
        html,
        css,
        javascript,
      })
    }
  }, [
    status,
    data,
    setHtml,
    setCss,
    setJavascript,
    setOutputLanguagesValue,
    setCodeValue,
  ])

  return (
    <>
      {status === 'success' && (
        <iframe
          title="browser"
          name="browser"
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
    </>
  )
}
