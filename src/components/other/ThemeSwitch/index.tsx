'use client';

import { ComponentType, useMemo } from 'react';
import { SunFill, Moon } from 'react-bootstrap-icons';

import { ETheme } from '@/constants/theme';

import { useThemeStore } from '@/providers/theme/hooks/use-theme-store';
import { useThemeCtx } from '@/providers/theme/hooks/use-theme-ctx';

import { useMounted } from '@/hooks/other/use-mounted';

import IconButton from '@/components/buttons/IconButton';

const ThemeSwitch: ComponentType = () => {
  const currentTheme = useThemeStore(s => s.theme);
  const { setTheme } = useThemeCtx();
  const isMounted = useMounted();

  const iconEl = useMemo(() => {
    if (!isMounted) {
      return null;
    }

    switch (currentTheme) {
      case ETheme.DARK: {
        return <Moon size={42} />
      }
      case ETheme.LIGHT: {
        return <SunFill size={42} />
      }
      default: {
        return null;
      }
    }
  }, [isMounted, currentTheme]);

  const toggleHandler = () => {
    if (currentTheme === ETheme.DARK) {
      setTheme(ETheme.LIGHT);
    } else {
      setTheme(ETheme.DARK);
    }
  }

  return (
    <IconButton
      type="button"
      tag={'button'}
      onClick={toggleHandler}
    >
      {iconEl}
    </IconButton>
  )
}

export default ThemeSwitch;
