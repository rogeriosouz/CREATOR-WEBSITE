import EditorMonaco, { Monaco, OnMount } from '@monaco-editor/react'
import { useApplicationStore } from '../store/useApplicationStore'
import { useEditorStore } from '../store/useEditorStore'
import { useEffect, useState } from 'react'
import Blackboard from 'monaco-themes/themes/Blackboard.json'
import Cobalt from 'monaco-themes/themes/Cobalt.json'
import Dracula from 'monaco-themes/themes/Dracula.json'
import Tomorrow from 'monaco-themes/themes/Tomorrow.json'
import { useTheme } from '@/components/theme-provider'

export function Editor() {
  const [
    html,
    css,
    javascript,
    setHtml,
    setCss,
    setJavascript,
    languageSelect,
  ] = useApplicationStore((store) => [
    store.html,
    store.css,
    store.javascript,
    store.setHtml,
    store.setCss,
    store.setJavascript,
    store.languageSelect,
  ])
  const { theme: themeApplication } = useTheme()
  const [monaco, setMonaco] = useState<Monaco | null>(null)

  const [fontSizeEditor, theme, setNewTheme] = useEditorStore((store) => [
    store.fontSizeEditor,
    store.theme,
    store.setNewTheme,
  ])

  const valueEditor: { html: string; css: string; javascript: string } = {
    html,
    css,
    javascript,
  }

  useEffect(() => {
    if (monaco) {
      monaco.editor.setTheme(theme)
    }
  }, [theme, monaco])

  useEffect(() => {
    if (themeApplication === 'dark') {
      setNewTheme('Dracula')
      return
    }

    setNewTheme('Tomorrow')
  }, [setNewTheme, themeApplication])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditorDidMount: OnMount = (_, monaco: any) => {
    monaco.editor.defineTheme('Tomorrow', Tomorrow)
    monaco.editor.defineTheme('Blackboard', Blackboard)
    monaco.editor.defineTheme('Dracula', Dracula)
    monaco.editor.defineTheme('Cobalt', Cobalt)

    setMonaco(monaco)
  }

  return (
    <EditorMonaco
      height={'100%'}
      width={'100%'}
      defaultLanguage={'html'}
      theme={theme}
      onMount={handleEditorDidMount}
      value={valueEditor[languageSelect as 'html' | 'css' | 'javascript']}
      onChange={(value) => {
        if (languageSelect === 'html') {
          setHtml(value as string)
          return
        }

        if (languageSelect === 'css') {
          setCss(value as string)
          return
        }

        if (languageSelect === 'javascript') {
          setJavascript(value as string)
        }
      }}
      language={languageSelect}
      defaultValue={html}
      options={{
        fontSize: fontSizeEditor,
      }}
    />
  )
}
