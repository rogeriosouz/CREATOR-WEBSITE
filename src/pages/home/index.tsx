import { Header } from '@/components/header'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import { GithubLogo } from '@phosphor-icons/react'
import { Browsers } from '@phosphor-icons/react/dist/ssr'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import heroPhoto from '@/assets/images/hero-section-photo.png'

export function Home() {
  return (
    <>
      <Helmet>
        <title>home</title>
      </Helmet>

      <Header />

      <section className="w-full mt-20 flex items-center justify-center flex-col max-w-[650px] mx-auto space-y-5 text-center">
        <h1 className="font-black text-6xl">Crie páginas web com facilidade</h1>

        <div className="flex items-center gap-2">
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

      <section className="w-full px-32 mb-32  py-20 relative">
        <div className="rounded z-[999] overflow-hidden box-shadow-card max-w-[1300px] mx-auto">
          <AspectRatio ratio={16 / 9}>
            <img
              src={heroPhoto}
              className="w-full h-full"
              alt="image hero section"
            />
          </AspectRatio>
        </div>
      </section>

      <footer className="w-full border-t py-5 flex items-center justify-center">
        <div className="container mx-auto flex items-center justify-between px-4">
          <p className="text-sm">
            © 2024 Creator-Web. Todos os direitos reservados.
          </p>
          <div className="flex items-center">
            <p className="text-sm mr-4">Desenvolvido por Rogério.</p>
            <a
              href="https://github.com/rogeriosouz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 flex items-center gap-2 hover:text-blue-300 transition duration-300"
            >
              <GithubLogo className="size-5" />
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}
