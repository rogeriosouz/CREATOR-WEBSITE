import { Button } from '@/components/ui/button'
import { Check, Code as CodeIcon, Copy } from '@phosphor-icons/react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import EditorMonaco, { Monaco, OnMount } from '@monaco-editor/react'
import { useApplicationStore } from '../store/useApplicationStore'
import { html as beautifyHtml } from 'js-beautify'
import { useCopyToClipboard } from 'usehooks-ts'
import { useEffect, useState } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useEditorStore } from '../store/useEditorStore'
import Blackboard from 'monaco-themes/themes/Blackboard.json'
import Cobalt from 'monaco-themes/themes/Cobalt.json'
import Dracula from 'monaco-themes/themes/Dracula.json'
import Tomorrow from 'monaco-themes/themes/Tomorrow.json'

export function Code() {
  const [codeValue] = useApplicationStore((store) => [store.codeValue])
  const [theme] = useEditorStore((store) => [store.theme])
  const [, copy] = useCopyToClipboard()
  const [isCopy, setIsCopy] = useState(false)
  const [monaco, setMonaco] = useState<Monaco | null>(null)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let id: any
    if (isCopy) {
      id = setTimeout(() => {
        setIsCopy(false)
      }, 2000)
    }

    return () => {
      clearTimeout(id)
    }
  }, [isCopy])

  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        console.log('Copied!', { text })
        setIsCopy(true)
      })
      .catch((error) => {
        console.error('Failed to copy!', error)
      })
  }

  useEffect(() => {
    if (monaco) {
      monaco.editor.setTheme(theme)
    }
  }, [theme, monaco])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditorDidMount: OnMount = (_, monaco: any) => {
    monaco.editor.defineTheme('Tomorrow', Tomorrow)
    monaco.editor.defineTheme('Blackboard', Blackboard)
    monaco.editor.defineTheme('Dracula', Dracula)
    monaco.editor.defineTheme('Cobalt', Cobalt)

    setMonaco(monaco)
  }

  const outputFormat = beautifyHtml(codeValue, {
    indent_size: 2,
    indent_body_inner_html: true,
  })

  return (
    <TooltipProvider>
      <Tooltip>
        <Dialog>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button variant={'outline'} size={'sm'}>
                <CodeIcon className="size-5" weight="bold" />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <DialogContent className="min-w-[300px] py-10 min-h-[300px]">
            <div className="border rounded overflow-hidden">
              <div className="flex border-b items-center justify-end py-2 px-1">
                <button
                  onClick={handleCopy(outputFormat)}
                  className="flex items-center gap-2 hover:bg-secondary transition-all rounded px-2"
                >
                  {isCopy ? (
                    <Check className="size-4" weight="bold" />
                  ) : (
                    <Copy className="size-5" weight="bold" />
                  )}
                  Copiar código
                </button>
              </div>
              <EditorMonaco
                height={'400px'}
                width={'100%'}
                theme={theme}
                onMount={handleEditorDidMount}
                defaultLanguage={'html'}
                language={'html'}
                value={outputFormat}
                options={{
                  fontSize: 14,
                  readOnly: true,
                  padding: {
                    top: 12,
                  },
                  lineNumbers: 'off',
                  minimap: {
                    enabled: false,
                  },
                }}
              />
            </div>
          </DialogContent>
        </Dialog>
        <TooltipContent>
          <p>visualizar código completo</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
