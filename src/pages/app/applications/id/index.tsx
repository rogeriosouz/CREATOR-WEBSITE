import { Header } from '@/components/header'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { Languages } from './components/languages'
import { Save } from './components/save'
import { Browser } from './components/browser'
import { Editor } from './components/editor'
import { ConfigEditor } from './components/config-editor'
import { Code } from './components/code'
import { OpenNewBrowser } from './components/open-new-browser'
import { Browsers } from '@phosphor-icons/react'
import { Helmet } from 'react-helmet-async'
import { useEffect } from 'react'
import { useApplicationStore } from './store/useApplicationStore'

export function Application() {
  const [setLanguageSelect] = useApplicationStore((store) => [
    store.setLanguageSelect,
  ])

  useEffect(() => {
    setLanguageSelect('html')
  }, [setLanguageSelect])

  return (
    <>
      <Header />

      <Helmet>
        <title>Projeto</title>
      </Helmet>

      <ResizablePanelGroup direction="horizontal" className="min-h-[93vh]">
        <ResizablePanel defaultSize={25} minSize={25}>
          <div className="w-full h-[5vh] flex pr-2 items-center justify-between">
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
          <div className="w-full h-[5vh] flex-1 flex items-center justify-between py-2 px-3 border-b">
            <div className="flex items-center gap-2">
              <Browsers className="size-5" weight="fill" />

              <h2 className="font-black uppercase">Browser</h2>
            </div>
            <div className="flex items-center gap-2">
              <OpenNewBrowser />

              <Code />
            </div>
          </div>

          <div className="w-full h-[88vh]">
            <Browser />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  )
}
