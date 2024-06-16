import { GithubLogo } from '@phosphor-icons/react'

export function Footer() {
  return (
    <footer className="w-full border-t py-5 flex items-center justify-center">
      <div className="container mx-auto sm:flex-col flex items-center justify-between px-4">
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
  )
}
