import { globSync } from 'fast-glob';
import fs from 'node:fs/promises';
import { basename } from 'node:path';
import { defineConfig, presetIcons, presetUno, transformerDirectives } from 'unocss';

const iconPaths = globSync('./icons/*.svg');

const collectionName = 'bolt';

const customIconCollection = iconPaths.reduce(
  (acc, iconPath) => {
    const [iconName] = basename(iconPath).split('.');

    acc[collectionName] ??= {};
    acc[collectionName][iconName] = async () => fs.readFile(iconPath, 'utf8');

    return acc;
  },
  {} as Record<string, Record<string, () => Promise<string>>>,
);

/* JARVIS Holographic Color Palette */
const BASE_COLORS = {
  white: '#FFFFFF',
  /* Holographic cyan spectrum */
  cyan: {
    50: '#E0FBFF',
    100: '#B3F5FF',
    200: '#80EEFF',
    300: '#4DE7FF',
    400: '#26E1FF',
    500: '#00D4FF', /* Primary JARVIS cyan */
    600: '#00AACC',
    700: '#008099',
    800: '#005566',
    900: '#002B33',
    950: '#001A1F',
  },
  /* Deep space backgrounds */
  gray: {
    50: '#E8F4F8',
    100: '#D0E8F0',
    200: '#A8D4E0',
    300: '#70B8C8',
    400: '#409CAA',
    500: '#207080',
    600: '#104050',
    700: '#082838',
    800: '#041820', /* JARVIS bg-panel */
    900: '#020C10', /* JARVIS bg-dark */
    950: '#000408', /* JARVIS bg-deepspace */
  },
  /* Accent gold for warnings/highlights */
  accent: {
    50: '#FFF8E6',
    100: '#FFEFC2',
    200: '#FFE08A',
    300: '#FFCC4D',
    400: '#FFB800',
    500: '#FFAA00', /* JARVIS gold */
    600: '#CC8800',
    700: '#996600',
    800: '#664400',
    900: '#332200',
    950: '#1A1100',
  },
  /* Alert green for success states */
  green: {
    50: '#E6FFF2',
    100: '#B3FFD9',
    200: '#80FFC0',
    300: '#4DFFA7',
    400: '#26FF94',
    500: '#00FF88', /* JARVIS success green */
    600: '#00CC6D',
    700: '#009952',
    800: '#006636',
    900: '#00331B',
    950: '#001A0E',
  },
  /* Warning/status orange */
  orange: {
    50: '#FFF4E6',
    100: '#FFE4C2',
    200: '#FFCC8A',
    300: '#FFB34D',
    400: '#FF9900',
    500: '#FF8000',
    600: '#CC6600',
    700: '#994D00',
    800: '#663300',
    900: '#331A00',
  },
  /* Alert red for errors/dangers */
  red: {
    50: '#FFE6E9',
    100: '#FFB3BB',
    200: '#FF808C',
    300: '#FF4D5E',
    400: '#FF334F', /* JARVIS alert red */
    500: '#FF1A3D',
    600: '#CC1530',
    700: '#991024',
    800: '#660A18',
    900: '#33050C',
    950: '#1A0306',
  },
  /* Electric blue for secondary accents */
  blue: {
    50: '#E6F4FF',
    100: '#B3DDFF',
    200: '#80C6FF',
    300: '#4DAFFF',
    400: '#2699FF',
    500: '#0088FF', /* JARVIS electric blue */
    600: '#006DCC',
    700: '#005299',
    800: '#003666',
    900: '#001B33',
    950: '#000E1A',
  },
  /* Purple for special effects */
  purple: {
    50: '#F2E6FF',
    100: '#D9B3FF',
    200: '#C080FF',
    300: '#A64DFF',
    400: '#9933FF',
    500: '#AA55FF', /* JARVIS purple */
    600: '#8844CC',
    700: '#663399',
    800: '#442266',
    900: '#221133',
    950: '#110A1A',
  },
};

const COLOR_PRIMITIVES = {
  ...BASE_COLORS,
  alpha: {
    white: generateAlphaPalette(BASE_COLORS.white),
    gray: generateAlphaPalette(BASE_COLORS.gray[900]),
    red: generateAlphaPalette(BASE_COLORS.red[400]),
    accent: generateAlphaPalette(BASE_COLORS.accent[500]),
    cyan: generateAlphaPalette(BASE_COLORS.cyan[500]),
    green: generateAlphaPalette(BASE_COLORS.green[500]),
    blue: generateAlphaPalette(BASE_COLORS.blue[500]),
  },
};

export default defineConfig({
  safelist: [...Object.keys(customIconCollection[collectionName] || {}).map((x) => `i-bolt:${x}`)],
  shortcuts: {
    'bolt-ease-cubic-bezier': 'ease-[cubic-bezier(0.4,0,0.2,1)]',
    'transition-theme': 'transition-[background-color,border-color,color] duration-150 bolt-ease-cubic-bezier',
    kdb: 'bg-bolt-elements-code-background text-bolt-elements-code-text py-1 px-1.5 rounded-md',
    'max-w-chat': 'max-w-[var(--chat-max-width)]',
    /* JARVIS holographic shortcuts */
    'jarvis-glow': 'shadow-[0_0_20px_rgba(0,212,255,0.3)]',
    'jarvis-glow-intense': 'shadow-[0_0_30px_rgba(0,212,255,0.5),0_0_60px_rgba(0,212,255,0.2)]',
    'jarvis-border': 'border border-cyan-500/30 hover:border-cyan-500/60',
    'jarvis-glass': 'bg-gray-950/85 backdrop-blur-xl border border-cyan-500/20',
    'jarvis-text': 'text-cyan-500 [text-shadow:0_0_10px_rgba(0,212,255,0.5)]',
    'jarvis-panel': 'bg-gray-900/80 border border-cyan-500/25 rounded-lg backdrop-blur-md',
  },
  rules: [
    /**
     * This shorthand doesn't exist in Tailwind and we overwrite it to avoid
     * any conflicts with minified CSS classes.
     */
    ['b', {}],
    /* Custom JARVIS glow rules */
    ['glow-cyan', { 'box-shadow': '0 0 20px rgba(0, 212, 255, 0.4), 0 0 40px rgba(0, 212, 255, 0.2)' }],
    ['glow-cyan-text', { 'text-shadow': '0 0 10px rgba(0, 212, 255, 0.6), 0 0 20px rgba(0, 212, 255, 0.3)' }],
    ['glow-gold', { 'box-shadow': '0 0 20px rgba(255, 170, 0, 0.4), 0 0 40px rgba(255, 170, 0, 0.2)' }],
    ['glow-red', { 'box-shadow': '0 0 20px rgba(255, 51, 68, 0.4), 0 0 40px rgba(255, 51, 68, 0.2)' }],
    ['glow-green', { 'box-shadow': '0 0 20px rgba(0, 255, 136, 0.4), 0 0 40px rgba(0, 255, 136, 0.2)' }],
  ],
  theme: {
    colors: {
      ...COLOR_PRIMITIVES,
      bolt: {
        elements: {
          borderColor: 'var(--bolt-elements-borderColor)',
          borderColorActive: 'var(--bolt-elements-borderColorActive)',
          background: {
            depth: {
              1: 'var(--bolt-elements-bg-depth-1)',
              2: 'var(--bolt-elements-bg-depth-2)',
              3: 'var(--bolt-elements-bg-depth-3)',
              4: 'var(--bolt-elements-bg-depth-4)',
            },
          },
          textPrimary: 'var(--bolt-elements-textPrimary)',
          textSecondary: 'var(--bolt-elements-textSecondary)',
          textTertiary: 'var(--bolt-elements-textTertiary)',
          code: {
            background: 'var(--bolt-elements-code-background)',
            text: 'var(--bolt-elements-code-text)',
          },
          button: {
            primary: {
              background: 'var(--bolt-elements-button-primary-background)',
              backgroundHover: 'var(--bolt-elements-button-primary-backgroundHover)',
              text: 'var(--bolt-elements-button-primary-text)',
            },
            secondary: {
              background: 'var(--bolt-elements-button-secondary-background)',
              backgroundHover: 'var(--bolt-elements-button-secondary-backgroundHover)',
              text: 'var(--bolt-elements-button-secondary-text)',
            },
            danger: {
              background: 'var(--bolt-elements-button-danger-background)',
              backgroundHover: 'var(--bolt-elements-button-danger-backgroundHover)',
              text: 'var(--bolt-elements-button-danger-text)',
            },
          },
          item: {
            contentDefault: 'var(--bolt-elements-item-contentDefault)',
            contentActive: 'var(--bolt-elements-item-contentActive)',
            contentAccent: 'var(--bolt-elements-item-contentAccent)',
            contentDanger: 'var(--bolt-elements-item-contentDanger)',
            backgroundDefault: 'var(--bolt-elements-item-backgroundDefault)',
            backgroundActive: 'var(--bolt-elements-item-backgroundActive)',
            backgroundAccent: 'var(--bolt-elements-item-backgroundAccent)',
            backgroundDanger: 'var(--bolt-elements-item-backgroundDanger)',
          },
          actions: {
            background: 'var(--bolt-elements-actions-background)',
            code: {
              background: 'var(--bolt-elements-actions-code-background)',
            },
          },
          artifacts: {
            background: 'var(--bolt-elements-artifacts-background)',
            backgroundHover: 'var(--bolt-elements-artifacts-backgroundHover)',
            borderColor: 'var(--bolt-elements-artifacts-borderColor)',
            inlineCode: {
              background: 'var(--bolt-elements-artifacts-inlineCode-background)',
              text: 'var(--bolt-elements-artifacts-inlineCode-text)',
            },
          },
          messages: {
            background: 'var(--bolt-elements-messages-background)',
            linkColor: 'var(--bolt-elements-messages-linkColor)',
            code: {
              background: 'var(--bolt-elements-messages-code-background)',
            },
            inlineCode: {
              background: 'var(--bolt-elements-messages-inlineCode-background)',
              text: 'var(--bolt-elements-messages-inlineCode-text)',
            },
          },
          icon: {
            success: 'var(--bolt-elements-icon-success)',
            error: 'var(--bolt-elements-icon-error)',
            primary: 'var(--bolt-elements-icon-primary)',
            secondary: 'var(--bolt-elements-icon-secondary)',
            tertiary: 'var(--bolt-elements-icon-tertiary)',
          },
          preview: {
            addressBar: {
              background: 'var(--bolt-elements-preview-addressBar-background)',
              backgroundHover: 'var(--bolt-elements-preview-addressBar-backgroundHover)',
              backgroundActive: 'var(--bolt-elements-preview-addressBar-backgroundActive)',
              text: 'var(--bolt-elements-preview-addressBar-text)',
              textActive: 'var(--bolt-elements-preview-addressBar-textActive)',
            },
          },
          terminals: {
            background: 'var(--bolt-elements-terminals-background)',
            buttonBackground: 'var(--bolt-elements-terminals-buttonBackground)',
          },
          dividerColor: 'var(--bolt-elements-dividerColor)',
          loader: {
            background: 'var(--bolt-elements-loader-background)',
            progress: 'var(--bolt-elements-loader-progress)',
          },
          prompt: {
            background: 'var(--bolt-elements-prompt-background)',
          },
          sidebar: {
            dropdownShadow: 'var(--bolt-elements-sidebar-dropdownShadow)',
            buttonBackgroundDefault: 'var(--bolt-elements-sidebar-buttonBackgroundDefault)',
            buttonBackgroundHover: 'var(--bolt-elements-sidebar-buttonBackgroundHover)',
            buttonText: 'var(--bolt-elements-sidebar-buttonText)',
          },
          cta: {
            background: 'var(--bolt-elements-cta-background)',
            text: 'var(--bolt-elements-cta-text)',
          },
        },
      },
    },
    fontFamily: {
      jarvis: ['Orbitron', 'Rajdhani', 'Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
    },
  },
  transformers: [transformerDirectives()],
  presets: [
    presetUno({
      dark: {
        light: '[data-theme="light"]',
        dark: '[data-theme="dark"]',
      },
    }),
    presetIcons({
      warn: true,
      collections: {
        ...customIconCollection,
      },
      unit: 'em',
    }),
  ],
});

/**
 * Generates an alpha palette for a given hex color.
 *
 * @param hex - The hex color code (without alpha) to generate the palette from.
 * @returns An object where keys are opacity percentages and values are hex colors with alpha.
 *
 * Example:
 *
 * ```
 * {
 *   '1': '#FFFFFF03',
 *   '2': '#FFFFFF05',
 *   '3': '#FFFFFF08',
 * }
 * ```
 */
function generateAlphaPalette(hex: string) {
  return [1, 2, 3, 4, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].reduce(
    (acc, opacity) => {
      const alpha = Math.round((opacity / 100) * 255)
        .toString(16)
        .padStart(2, '0');

      acc[opacity] = `${hex}${alpha}`;

      return acc;
    },
    {} as Record<number, string>,
  );
}
