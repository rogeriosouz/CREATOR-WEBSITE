import { Button } from '@/components/ui/button'
import { Gear } from '@phosphor-icons/react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Themes, themes, useEditorStore } from '../store/useEditorStore'

const fonts = [
  {
    id: 1,
    font: 14,
  },
  {
    id: 2,
    font: 16,
  },
  {
    id: 3,
    font: 18,
  },

  {
    id: 4,
    font: 20,
  },

  {
    id: 5,
    font: 22,
  },
  {
    id: 6,
    font: 24,
  },
  {
    id: 7,
    font: 26,
  },
]

export function ConfigEditor() {
  const [fontSizeEditor, setFontSizeEditor, theme, setNewTheme] =
    useEditorStore((store) => [
      store.fontSizeEditor,
      store.setFontSizeEditor,
      store.theme,
      store.setNewTheme,
    ])

  return (
    <TooltipProvider>
      <Tooltip>
        <Dialog>
          <DialogTrigger asChild>
            <TooltipTrigger asChild>
              <Button variant={'outline'} size={'sm'}>
                <Gear className="size-5" weight="fill" />
              </Button>
            </TooltipTrigger>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Configuração do editor</DialogTitle>
            </DialogHeader>

            <div className="w-full flex items-center justify-between mt-2">
              <p className="font-medium text-base">font-size:</p>

              <Select
                value={String(fontSizeEditor)}
                defaultValue={String(fonts[0].font)}
                onValueChange={(value) => setFontSizeEditor(Number(value))}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="font" />
                </SelectTrigger>
                <SelectContent>
                  {fonts.map((font) => (
                    <SelectItem key={font.id} value={String(font.font)}>
                      {font.font}px
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-full flex items-center justify-between mt-2">
              <p className="font-medium text-base">tema:</p>

              <Select
                value={theme}
                defaultValue={String(fonts[0].font)}
                onValueChange={(value: Themes) => setNewTheme(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="tema" />
                </SelectTrigger>
                <SelectContent>
                  {themes.map((theme) => (
                    <SelectItem key={theme} value={theme}>
                      {theme}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </DialogContent>
        </Dialog>
        <TooltipContent>
          <p>Configuração do editor</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
