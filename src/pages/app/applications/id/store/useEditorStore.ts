import { create } from 'zustand'

export type Themes = 'Blackboard' | 'Tomorrow' | 'Dracula' | 'Cobalt'

export const themes = ['Blackboard', 'Tomorrow', 'Dracula', 'Cobalt']

interface UseEditorStoreProps {
  fontSizeEditor: number
  setFontSizeEditor: (fontSizeEditor: number) => void

  theme: Themes
  setNewTheme: (theme: Themes) => void
}

export const useEditorStore = create<UseEditorStoreProps>((set) => ({
  fontSizeEditor: 14,
  theme: 'Tomorrow',
  setFontSizeEditor: (fontSizeEditor) => set(() => ({ fontSizeEditor })),
  setNewTheme: (theme) => set(() => ({ theme })),
}))
