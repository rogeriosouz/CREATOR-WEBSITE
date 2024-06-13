import { SignOut } from '@phosphor-icons/react'
import { Avatar as AvatarRoot, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { useAuthStore } from '@/store/useAuthStore'

export function Avatar() {
  const [user, logout] = useAuthStore((store) => [store.user, store.logout])
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full">
        <AvatarRoot>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback className="bg-secondary animate-pulse"></AvatarFallback>
        </AvatarRoot>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px] px-0">
        <div className="w-full mb-2 py-2 border-b px-3">
          <h3 className="text-sm font-medium capitalize leading-none">
            {user?.name}
          </h3>
          <p className="text-muted-foreground text-xs">{user?.email}</p>
        </div>

        <div className="px-1 w-full">
          <button
            onClick={logout}
            className="flex px-3 items-center rounded justify-between hover:bg-secondary transition-all gap-2 w-full"
          >
            sair
            <SignOut className="size-5" />
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
