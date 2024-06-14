import { Header } from '@/components/header'
import { NewProject } from './components/new-project'
import { ListProjects } from './components/list-projects'
import { Helmet } from 'react-helmet-async'
import { Browsers } from '@phosphor-icons/react'

export function Applications() {
  return (
    <>
      <Helmet>
        <title>Meus projetos</title>
      </Helmet>

      <Header />

      <section className="w-full py-20 px-32 md:px-10">
        <div className="w-full flex items-center justify-between mb-20">
          <div className="flex items-center gap-2">
            <Browsers className="size-5" weight="fill" />
            <h1 className="text-3xl font-bold">Meus projetos</h1>
          </div>

          <NewProject />
        </div>

        <ListProjects />
      </section>
    </>
  )
}
