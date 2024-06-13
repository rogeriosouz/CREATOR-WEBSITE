import { Header } from '@/components/header'
import { NewProject } from './components/new-project'
import { ListProjects } from './components/list-projects'
import { Helmet } from 'react-helmet-async'

export function Applications() {
  return (
    <>
      <Helmet>
        <title>Meus projetos</title>
      </Helmet>

      <Header />

      <section className="w-full py-20 px-32 md:px-10">
        <div className="w-full flex items-center justify-between mb-20">
          <h1 className="text-3xl font-bold">Projetos.</h1>
          <NewProject />
        </div>

        <ListProjects />
      </section>
    </>
  )
}
