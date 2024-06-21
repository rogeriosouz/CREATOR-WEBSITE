import { useTheme } from '@/components/theme-provider'
import { Button } from '@/components/ui/button'
import { MoonStars, Sun } from '@phosphor-icons/react'

export function ThemeButton() {
  const { setTheme, theme } = useTheme()
  function setNewTheme() {
    if (theme === 'dark') {
      setTheme('light')
      return
    }

    setTheme('dark')
  }

  return (
    <Button onClick={setNewTheme} variant={'ghost'} size={'icon'}>
      {theme === 'light' ? (
        <MoonStars className="size-6" weight="fill" />
      ) : (
        <Sun className="size-6" weight="fill" />
      )}
    </Button>
  )
}
