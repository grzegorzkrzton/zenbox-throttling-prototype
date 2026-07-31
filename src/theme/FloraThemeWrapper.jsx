import { ThemeProvider } from '@zendeskgarden/react-theming';
import { floraTheme } from './floraTheme';
import './flora.css';

export default function FloraThemeWrapper({ children, className = '' }) {
  return (
    <ThemeProvider theme={floraTheme} colorScheme="light">
      <div className={['flora-theme', className].filter(Boolean).join(' ')}>{children}</div>
    </ThemeProvider>
  );
}
