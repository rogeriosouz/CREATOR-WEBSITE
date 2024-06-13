import { Header } from '@/components/header'
import { Helmet } from 'react-helmet-async'

export function Home() {
  return (
    <>
      <Helmet>
        <title>home</title>
      </Helmet>

      <Header />

      <div>
        <h1>Hello world</h1>
      </div>
    </>
  )
}
