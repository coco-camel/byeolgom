import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ThemeState = {
  isDarkMode: boolean;
  toggleTheme: () => void;
  setTheme: (item: boolean) => void;
};

export const useThemeStore = create(
  persist<ThemeState>(
    (set) => ({
      isDarkMode: true,

      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

      setTheme: (item) => set(() => ({ isDarkMode: item })),
    }),
    {
      name: 'DarkMode',
    },
  ),
);
