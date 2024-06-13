import EditorMonaco from '@monaco-editor/react'
import { useApplicationStore } from '../store/useApplicationStore'

export function Editor() {
  const [
    html,
    css,
    javascript,
    setHtml,
    setCss,
    setJavascript,
    languageSelect,
    fontSizeEditor,
  ] = useApplicationStore((store) => [
    store.html,
    store.css,
    store.javascript,
    store.setHtml,
    store.setCss,
    store.setJavascript,
    store.languageSelect,
    store.fontSizeEditor,
  ])

  const valueEditor: { html: string; css: string; javascript: string } = {
    html,
    css,
    javascript,
  }

  return (
    <EditorMonaco
      height={'90%'}
      width={'100%'}
      defaultLanguage={'html'}
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
        padding: {
          top: 12,
        },
      }}
    />
  )
}
