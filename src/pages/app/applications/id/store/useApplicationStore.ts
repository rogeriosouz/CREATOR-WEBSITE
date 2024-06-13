import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Languages = 'html' | 'css' | 'javascript'

const generateOutput = ({
  html,
  css,
  javascript,
}: {
  html: string
  css: string
  javascript: string
}) => {
  return `
    <html>
    <head>
      <style>${css}</style>
    </head>
    <body>
      ${html}
      <script>${javascript}</script>
    </body>
    </html>
  `
}

type OutputLanguagesValue = {
  html: string
  css: string
  javascript: string
}

interface UseApplicationStoreProps {
  html: string
  setHtml: (html: string) => void
  css: string
  setCss: (html: string) => void
  javascript: string
  setJavascript: (html: string) => void

  outputLanguagesValue: OutputLanguagesValue
  setNewOutputValue: (outputValue: OutputLanguagesValue) => void

  languageSelect: string
  setLanguageSelect: (language: Languages) => void

  outputValue: string

  fontSizeEditor: number
  setFontSizeEditor: (fontSizeEditor: number) => void
}

export const useApplicationStore = create<UseApplicationStoreProps>()(
  persist(
    (set) => ({
      html: '',
      css: '',
      javascript: '',
      languageSelect: 'html',
      outputLanguagesValue: { html: '', css: '', javascript: '' },
      outputValue: generateOutput({ html: '', css: '', javascript: '' }),
      fontSizeEditor: 14,
      setHtml: (html) => set(() => ({ html })),
      setCss: (css) => set(() => ({ css })),
      setJavascript: (javascript) => set(() => ({ javascript })),
      setLanguageSelect: (language) =>
        set(() => ({ languageSelect: language })),
      setNewOutputValue: (outputValue) => {
        set(() => ({
          outputLanguagesValue: outputValue,
          outputValue: generateOutput(outputValue),
        }))
      },
      setFontSizeEditor: (fontSizeEditor) => set(() => ({ fontSizeEditor })),
    }),
    {
      partialize: (state) => ({
        fontSizeEditor: state.fontSizeEditor,
      }),

      name: 'settings-editor-font-size',
    },
  ),
)
