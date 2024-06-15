import { api } from '@/lib/api'
import { useMutation } from '@tanstack/react-query'
import {
  generateOutputView,
  useApplicationStore,
} from '../store/useApplicationStore'
import { CircleNotch, Play } from '@phosphor-icons/react'
import { useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useEventListener } from 'usehooks-ts'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { queryClient } from '@/lib/querryClient'
import { ApplicationResponse } from './browser'

export function Save() {
  const { id } = useParams()
  const [
    html,
    css,
    javascript,
    setOutputLanguagesValue,
    outputLanguagesValue,
    setCodeValue,
  ] = useApplicationStore((store) => [
    store.html,
    store.css,
    store.javascript,
    store.setOutputLanguagesValue,
    store.outputLanguagesValue,
    store.setCodeValue,
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
      setOutputLanguagesValue({ html, css, javascript })

      const queryKey = ['/application', id]
      const data = queryClient.getQueryData<ApplicationResponse>(queryKey)

      const newData = {
        statusCode: data?.statusCode,
        project: {
          id: data?.project.id,
          name: data?.project.name,
          html,
          css,
          javascript,
        },
      }

      queryClient.setQueryData(queryKey, newData)

      setCodeValue(generateOutputView({ html, css, javascript }))
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

  useEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 's') {
      event.preventDefault()

      save()
    }
  })

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
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
        </TooltipTrigger>
        <TooltipContent>
          <p>Clique para salvar e executar. ou (ctrl + s)</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
