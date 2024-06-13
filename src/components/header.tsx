import { useAuthStore } from '@/store/useAuthStore'
import { Button } from './ui/button'
import { Avatar } from './avatar'
import { Link } from 'react-router-dom'
import { Browsers } from '@phosphor-icons/react'

export function Header() {
  const [isAuthenticate] = useAuthStore((store) => [store.isAuthenticate])

  return (
    <header className="w-full border-b py-2 flex items-center justify-between px-32 md:px-10">
      <Link to={'/'} className="flex items-center gap-2">
        <Browsers className="size-10" weight="fill" />
        <h1 className="font-black text-lg">CREATOR WEB</h1>
      </Link>

      <div>
        <nav className="w-full flex items-center">
          <ul className="flex items-center gap-2">
            <li className="text-base font-medium">
              <Link
                to={'/'}
                className="hover:border-border border-b-2 hover:text-muted-foreground py-2 border-transparent px-2 transition-all"
              >
                Home
              </Link>
            </li>
            <li className="text-base font-medium">
              <Link
                to={'/app/applications'}
                className="hover:border-border border-b-2 hover:text-muted-foreground py-2 border-transparent px-2 transition-all"
              >
                Minhas aplicações
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div>{isAuthenticate ? <Avatar /> : <Button>login</Button>}</div>
    </header>
  )
}
