import { DEFAULT_THEME } from '@zendeskgarden/react-theming';
import { FLORA_FONT_STACK, floraPalette } from './floraTokens';

const mergeHue = (baseHue, overrides) => ({
  ...baseHue,
  ...overrides,
});

export const floraTheme = {
  ...DEFAULT_THEME,
  fonts: {
    ...DEFAULT_THEME.fonts,
    system: FLORA_FONT_STACK,
  },
  borderRadii: {
    sm: '4px',
    md: '8px',
    lg: '8px',
  },
  palette: {
    ...DEFAULT_THEME.palette,
    grey: mergeHue(DEFAULT_THEME.palette.grey, floraPalette.grey),
    azure: mergeHue(DEFAULT_THEME.palette.azure, floraPalette.azure),
    floraEmphasis: floraPalette.emphasis,
  },
  colors: {
    ...DEFAULT_THEME.colors,
    primaryHue: 'azure',
    variables: {
      ...DEFAULT_THEME.colors.variables,
      light: {
        ...DEFAULT_THEME.colors.variables.light,
        background: {
          ...DEFAULT_THEME.colors.variables.light.background,
          primaryEmphasis: 'floraEmphasis.700',
          recessed: 'grey.100',
          subtle: 'grey.100',
        },
        foreground: {
          ...DEFAULT_THEME.colors.variables.light.foreground,
          primary: 'azure.600',
          default: 'floraEmphasis.700',
          subtle: 'grey.600',
        },
        border: {
          ...DEFAULT_THEME.colors.variables.light.border,
          default: 'grey.300',
          subtle: 'grey.200',
          primaryEmphasis: 'azure.600',
        },
      },
    },
  },
  components: {
    'buttons.button': `
      border-radius: 99px;
      font-family: ${FLORA_FONT_STACK};
      letter-spacing: -0.154px;
    `,
    'buttons.anchor': `
      font-family: ${FLORA_FONT_STACK};
      letter-spacing: -0.154px;
    `,
    'forms.input': `
      border-radius: 8px;
      font-family: ${FLORA_FONT_STACK};
      letter-spacing: -0.154px;
    `,
    'forms.faux_input': `
      border-radius: 8px;
    `,
    'forms.textarea': `
      border-radius: 8px;
      font-family: ${FLORA_FONT_STACK};
      letter-spacing: -0.154px;
    `,
    'forms.select_wrapper': `
      border-radius: 8px;
    `,
    'forms.input_group': `
      [data-garden-id='forms.input'],
      [data-garden-id='forms.faux_input'],
      [data-garden-id='forms.select_wrapper'] {
        border-radius: 8px;
      }
    `,
    'forms.checkbox': `
      & ~ [data-garden-id='forms.checkbox_label']::before {
        border-radius: 4px;
      }
    `,
    'forms.radio': `
      & ~ [data-garden-id='forms.radio_label']::before {
        border-radius: 50%;
      }
    `,
    'tags.tag': `
      border-radius: 4px;
    `,
    'modals.modal': `
      border-radius: 8px;
    `,
    'notifications.well': `
      border-radius: 8px;
    `,
    'notifications.alert': `
      border-radius: 8px;
    `,
  },
};
