import { Html } from '@/components/icons/html'
import { Css } from '@/components/icons/css'
import { Javascript } from '@/components/icons/javascript'
import clsx from 'clsx'
import { useApplicationStore } from '../store/useApplicationStore'

export function Languages() {
  const [
    languageSelect,
    setLanguageSelect,
    outputLanguagesValue,
    html,
    css,
    javascript,
  ] = useApplicationStore((store) => [
    store.languageSelect,
    store.setLanguageSelect,
    store.outputLanguagesValue,
    store.html,
    store.css,
    store.javascript,
  ])

  return (
    <div className="w-full flex">
      <button
        onClick={() => setLanguageSelect('html')}
        className={clsx(
          'flex items-center hover:bg-secondary border-b-2 transition-all hover:border-b-primary gap-2 h-full py-2 px-5 border-r',
          {
            'bg-secondary border-b-primary': languageSelect === 'html',
          },
        )}
      >
        <Html className="size-5" />
        html
        {outputLanguagesValue.html !== html && (
          <div className="w-1 h-1 rounded-full bg-secondary-foreground"></div>
        )}
      </button>

      <button
        onClick={() => setLanguageSelect('css')}
        className={clsx(
          'flex items-center hover:bg-secondary border-b-2 transition-all hover:border-b-primary gap-2 h-full py-2 px-5 border-r',
          {
            'bg-secondary border-b-primary': languageSelect === 'css',
          },
        )}
      >
        <Css className="size-5" />
        css
        {outputLanguagesValue.css !== css && (
          <div className="w-1 h-1 rounded-full bg-secondary-foreground"></div>
        )}
      </button>

      <button
        onClick={() => setLanguageSelect('javascript')}
        className={clsx(
          'flex items-center hover:bg-secondary border-b-2 transition-all hover:border-b-primary gap-2 h-full py-2 px-5 border-r',
          {
            'bg-secondary border-b-primary': languageSelect === 'javascript',
          },
        )}
      >
        <Javascript className="size-5" />
        javascript
        {outputLanguagesValue.javascript !== javascript && (
          <div className="w-1 h-1 rounded-full bg-secondary-foreground"></div>
        )}
      </button>
    </div>
  )
}
