import { ref, onMounted } from 'vue'

export type Theme = 'dark' | 'light'

const THEME_KEY = 'cinevault_theme'

const theme = ref<Theme>('dark')

function applyTheme(newTheme: Theme) {
  theme.value = newTheme
  localStorage.setItem(THEME_KEY, newTheme)

  document.documentElement.setAttribute('data-bs-theme', newTheme)

  // const root = document.documentElement
  // if (newTheme === 'dark') {
  //   root.classList.add('dark')
  //   root.classList.remove('light')
  // } else {
  //   root.classList.remove('dark')
  //   root.classList.add('light')
  // }
}

export function useTheme() {
  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) as Theme | null
    if (savedTheme === 'dark' || savedTheme === 'light') {
      applyTheme(savedTheme)
    } else {
      // Default to dark mode
      applyTheme('dark')
    }
  }

  function toggleTheme() {
    const nextTheme = theme.value === 'dark' ? 'light' : 'dark'
    applyTheme(nextTheme)
  }

  return {
    theme,
    toggleTheme,
    initTheme,
  }
}
