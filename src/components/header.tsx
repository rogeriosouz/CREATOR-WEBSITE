import { useAuthStore } from '@/store/useAuthStore'
import { Button } from './ui/button'
import { Avatar } from './avatar'
import { Link, useResolvedPath } from 'react-router-dom'
import { Browsers, MoonStars, Sun, User } from '@phosphor-icons/react'
import clsx from 'clsx'
import { useTheme } from './theme-provider'

const links = [
  {
    id: 1,
    title: 'home',
    href: '/',
  },
  {
    id: 2,
    title: 'Minhas aplicações',
    href: '/app/applications',
  },
]

export function Header() {
  const { setTheme, theme } = useTheme()
  const { pathname } = useResolvedPath('')

  const [isAuthenticate] = useAuthStore((store) => [store.isAuthenticate])

  function setNewTheme() {
    if (theme === 'dark') {
      setTheme('light')
      return
    }

    setTheme('dark')
  }

  return (
    <header className="w-full border-b py-2 flex items-center justify-between px-32 md:px-10">
      <div className="flex items-center w-full gap-10">
        <Link to={'/'} className="flex items-center gap-2">
          <Browsers className="size-10" weight="fill" />
          <h1 className="font-black text-lg">CREATOR WEB</h1>
        </Link>

        {isAuthenticate && (
          <nav className="w-full flex items-center flex-1">
            <ul className="flex items-center gap-2">
              {links.map((link) => (
                <li className="text-base font-medium" key={link.id}>
                  <Link
                    to={link.href}
                    className={clsx(
                      'hover:border-primary border-b-2 hover:text-muted-foreground py-2 border-transparent px-2 transition-all',
                      {
                        'border-primary': link.href === pathname,
                      },
                    )}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      <div className="flex items-center gap-3">
        {isAuthenticate ? (
          <div className="flex items-center gap-3">
            <Avatar />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button asChild variant={'outline'} className="gap-2">
              <Link to={'/auth/login'}>
                <User className="size-5" weight="bold" />
                Login
              </Link>
            </Button>

            <Button asChild variant={'outline'} className="gap-2">
              <Link to={'/auth/register'}>Register</Link>
            </Button>
          </div>
        )}
        <Button onClick={setNewTheme} variant={'ghost'} size={'icon'}>
          {theme === 'light' ? (
            <MoonStars className="size-6" weight="fill" />
          ) : (
            <Sun className="size-6" weight="fill" />
          )}
        </Button>
      </div>
    </header>
  )
}
