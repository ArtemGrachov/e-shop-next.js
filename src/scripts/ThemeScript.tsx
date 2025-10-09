import { ComponentType } from 'react';

import type { ETheme } from '@/constants/theme';

declare global {
  interface Window {
    __setTheme: (theme: ETheme) => void;
  }
}

function initTheme() {
  var theme;

  window.__setTheme = function(theme: ETheme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  try {
    theme = localStorage.getItem('theme') as ETheme;
  } catch (err) {
    console.log(err);
  }

  if (theme) {
    window.__setTheme(theme);
  }
}

const ThemeScript: ComponentType = () => {
  return (
    <script dangerouslySetInnerHTML={{ __html: `(${initTheme})();` }} />
  )
}

export default ThemeScript;
