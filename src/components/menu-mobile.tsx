import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet'
import { Button } from './ui/button'
import { Browsers, List, User } from '@phosphor-icons/react'
import { Link, useResolvedPath } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'
import { links } from './header'
import clsx from 'clsx'

export function MenuMobile() {
  const [isAuthenticate] = useAuthStore((store) => [store.isAuthenticate])
  const { pathname } = useResolvedPath('')

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={'outline'} size={'sm'} className="hidden md:flex">
          <List className="size-5" weight="bold" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={'left'}
        className="w-full flex flex-col justify-between"
      >
        <div>
          <SheetHeader className="mb-10">
            <SheetTitle>
              <Link to={'/'} className="flex items-center gap-2">
                <Browsers className="size-10" weight="fill" />
                <h1 className="font-black text-lg">CREATOR WEB</h1>
              </Link>
            </SheetTitle>
          </SheetHeader>

          <div>
            {isAuthenticate && (
              <nav className="w-full">
                <ul className="items-center space-y-3">
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

            {!isAuthenticate && (
              <nav className="w-full">
                <ul className="items-center space-y-3">
                  <li className="text-base font-medium">
                    <Link
                      to={'/'}
                      className={clsx(
                        'hover:border-primary border-b-2 hover:text-muted-foreground py-2 border-transparent px-2 transition-all',
                        {
                          'border-primary': pathname === 'home',
                        },
                      )}
                    >
                      home
                    </Link>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>

        {!isAuthenticate && (
          <SheetFooter className="w-full flex flex-col">
            <Button asChild variant={'outline'} className="w-full gap-2">
              <Link to={'/auth/login'}>
                <User className="size-5" weight="bold" />
                Login
              </Link>
            </Button>

            <Button asChild variant={'outline'} className="w-full gap-2">
              <Link to={'/auth/register'}>Register</Link>
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}
