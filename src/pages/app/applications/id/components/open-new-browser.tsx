import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Browsers } from '@phosphor-icons/react'
import { Link, useParams } from 'react-router-dom'

export function OpenNewBrowser() {
  const { id } = useParams()

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button asChild variant={'outline'} size={'sm'}>
            <Link to={`/app/applications/browser/${id}`} target="_blank">
              <Browsers className="size-5" weight="bold" />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Abrir o browser em uma nova guia</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
