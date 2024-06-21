import { Button } from '@/components/ui/button'
import { ArrowLeft } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

export function ReturnToHome() {
  return (
    <Button asChild variant={'outline'} size={'icon'}>
      <Link to={'/'}>
        <ArrowLeft className="size-5" weight="bold" />
      </Link>
    </Button>
  )
}
