import { Link, useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  const err = useRouteError()
  const error = err as { statusText: string; status: number }

  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col gap-5">
      <div className="w-[650px]">
        <h1 className="text-3xl font-bold mb-5">
          {error.status === 404
            ? '404 - Página Não Encontrada'
            : `${error.status} - erro inesperado.`}
        </h1>

        <p className="mb-3 font-medium">
          {error.status === 404
            ? 'Ops! A página que você está procurando não existe.'
            : 'Desculpe, ocorreu um erro inesperado.'}
        </p>

        {error.status === 404 && (
          <>
            <p className="mb-5">
              Parece que algo deu errado ou o link que você seguiu pode estar
              desatualizado ou incorreto. Vamos ajudá-lo a voltar ao caminho
              certo:
            </p>

            <ul className="list-disc ml-6 space-y-1 mb-5">
              <li className="space-x-1">
                <span className="font-bold">Verifique o URL:</span>{' '}
                Certifique-se de que o endereço digitado está correto.
              </li>
              <li className="space-x-1">
                <span className="font-bold">Volte à página inicial:</span>
                {'  '}
                <Link
                  to={'/'}
                  className="underline hover:opacity-80 transition-all"
                >
                  Clique aqui para retornar à página inicial.
                </Link>
              </li>
              <li className="space-x-1">
                <span className="font-bold">Navegue pelo nosso site:</span> Use
                o menu de navegação para encontrar o que você precisa.
              </li>
            </ul>

            <p>Agradecemos pela sua compreensão e paciência.</p>
          </>
        )}
      </div>
    </div>
  )
}
