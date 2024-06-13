import { Header } from '@/components/header'
import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { useEffect } from 'react'
import { useApplicationStore } from './store/useApplicationStore'
import { Languages } from './components/languages'
import { Save } from './components/save'
import { Browser } from './components/browser'
import { Editor } from './components/editor'
import { ConfigEditor } from './components/config-editor'
import { Code } from './components/code'
import { OpenNewBrowser } from './components/open-new-browser'
import { Browsers } from '@phosphor-icons/react'

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

export function Application() {
  const { id } = useParams<{ id: string }>()

  const [setHtml, setCss, setJavascript, setNewOutputValue] =
    useApplicationStore((store) => [
      store.setHtml,
      store.setCss,
      store.setJavascript,
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
      setHtml(data.project.html ? data.project.html : '')
      setCss(data.project.css ? data.project.css : '')
      setJavascript(data.project.javascript ? data.project.javascript : '')

      setNewOutputValue({
        html: data.project.html ? data.project.html : '',
        css: data.project.css ? data.project.css : '',
        javascript: data.project.javascript ? data.project.javascript : '',
      })
    }
  }, [data, setCss, setHtml, setJavascript, setNewOutputValue, status])

  return (
    <>
      <Header />

      {status === 'success' && (
        <ResizablePanelGroup direction="horizontal" className="min-h-[93vh]">
          <ResizablePanel defaultSize={25} minSize={25}>
            <div className="w-full h-[5vh] flex pr-2 items-center border-b justify-between">
              <Languages />

              <div className="flex items-center gap-2">
                <Save />

                <ConfigEditor />
              </div>
            </div>

            <div className="w-full h-full">
              <Editor />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={75} minSize={25}>
            <div className="w-full h-[5vh] flex items-center justify-between py-2 px-3 border-b">
              <div className="flex items-center gap-2">
                <Browsers className="size-5" weight="fill" />

                <h2 className="font-black uppercase">Browser</h2>
              </div>
              <div className="flex items-center gap-2">
                <OpenNewBrowser />

                <Code />
              </div>
            </div>
            <Browser />
          </ResizablePanel>
        </ResizablePanelGroup>
      )}
    </>
  )
}
