import { Button } from '@/components/ui/button'
import { Browsers } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

export function Hero() {
  return (
    <section className="w-full mt-20 flex sm:px-5 items-center justify-center flex-col max-w-[650px] mx-auto space-y-5 text-center">
      <h1 className="font-black text-6xl sm:text-4xl">
        Crie páginas web com facilidade
      </h1>

      <div className="sm:w-full sm:flex-col flex items-center gap-2">
        <Button asChild size={'lg'} variant={'outline'} className="gap-2">
          <Link to={'/auth/login'}>
            {' '}
            <Browsers className="size-5" /> Criar Página Web
          </Link>
        </Button>

        <Button asChild size={'lg'} variant={'default'}>
          <Link to={'/auth/login'}> Explorar Recursos</Link>
        </Button>
      </div>
      <p className="text-muted-foreground text-base font-normal">
        Creator-Web: Seu Editor Online de HTML, CSS e JavaScript
      </p>
    </section>
  )
}
