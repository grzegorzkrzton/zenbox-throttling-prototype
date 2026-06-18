import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider as GardenThemeProvider } from '@zendeskgarden/react-theming'
import { ThemeProvider, useTheme } from './contexts'
import PasswordGate from './components/PasswordGate'
import './index.css'
import App from './App.jsx'

function GardenThemeWrapper({ children }) {
  const { theme, currentProduct } = useTheme()
  const effectiveTheme = currentProduct === 'support' ? theme : 'light'
  return (
    <GardenThemeProvider colorScheme={effectiveTheme}>
      {children}
    </GardenThemeProvider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <GardenThemeWrapper>
        <PasswordGate>
          <App />
        </PasswordGate>
      </GardenThemeWrapper>
    </ThemeProvider>
  </StrictMode>,
)
