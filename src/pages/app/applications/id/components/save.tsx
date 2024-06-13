import { api } from '@/lib/api'
import { useMutation } from '@tanstack/react-query'
import { useApplicationStore } from '../store/useApplicationStore'
import { CircleNotch, Play } from '@phosphor-icons/react'
import { useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function Save() {
  const { id } = useParams()
  const [html, css, javascript, setNewOutputValue, outputLanguagesValue] =
    useApplicationStore((store) => [
      store.html,
      store.css,
      store.javascript,
      store.setNewOutputValue,
      store.outputLanguagesValue,
    ])

  const saveMutation = useMutation<
    { message: string; statusCode: string },
    { response: { data: { statusCode: number; message: string } } },
    { html: string; css: string; javascript: string; projectId: string }
  >({
    mutationFn: async ({ html, css, javascript, projectId }) => {
      const { data } = await api.put(`/projects/${projectId}`, {
        html,
        css,
        javascript,
      })

      return data
    },
    onSuccess: (_, { html, css, javascript }) => {
      console.log(javascript)
      setNewOutputValue({ html, css, javascript })
    },
  })

  function save() {
    if (!html) {
      return
    }

    if (
      outputLanguagesValue.html === html &&
      outputLanguagesValue.css === css &&
      outputLanguagesValue.javascript === javascript
    ) {
      return
    }

    saveMutation.mutate({
      html,
      css: css || '',
      javascript: javascript || '',
      projectId: id as string,
    })
  }

  const { status } = saveMutation

  const isDisabled =
    (outputLanguagesValue.html === html &&
      outputLanguagesValue.css === css &&
      outputLanguagesValue.javascript === javascript) ||
    status === 'pending'

  return (
    <Button
      onClick={save}
      disabled={isDisabled}
      variant={'outline'}
      size={'sm'}
    >
      {status === 'pending' ? (
        <CircleNotch className="size-5 animate-spin" />
      ) : (
        <Play className="size-5" weight="fill" />
      )}
    </Button>
  )
}
