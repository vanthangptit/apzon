import React from 'react';
import { DefaultTheme, ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';
import {
  Colors,
  FontFamilies,
  FontSizes
} from '@src/themes/styled';

const white = '#FFFFFF';
const black = '#000000';
const robotoLight = 'Roboto-Light, sans-serif';
const robotoRegular = 'Roboto-Regular, sans-serif';
const robotoBold = 'Roboto-Bold, sans-serif';
const robotoBlack = 'Roboto-Black, sans-serif';

function colors(): Colors {
  return {
    // base
    white,
    black,
    transparent: 'rgba(255,255,255,0)',

    // text
    text1: black,

    // Backgrounds / greys
    bg0: white,
    bg1: '#f1f1f1',

    //primary colors
    primary1: '#333333',

    //gray colors
    gray: '#cccccc',
    gray1: '#f8f9fa',
    gray2: '#e9ecef',
    gray3: '#dee2e6',
    gray4: '#ced4da',
    gray5: '#adb5bd',
    gray6: '#6c757d',
    gray7: '#495057',
    gray8: '#343a40',
    gray9: '#212529'
  };
}

function fontSizes(): FontSizes {
  return {
    fontSizeText0: '24px',
    fontSizeText1: '20px',
    fontSizeText2: '16px',
    fontSizeText3: '14px',
    fontSizeText4: '12px',
    display1: '80px',
    display2: '64px',
    display3: '48px',
    display4: '32px',
    caps1: '36px',
    caps2: '52px'
  };
}

function fontFamilies(): FontFamilies {
  return {
    fontRobotoLight: robotoLight,
    fontRobotoRegular: robotoRegular,
    fontRobotoBold: robotoBold,
    fontRobotoBlack: robotoBlack,
  };
}

export function themeMode(): DefaultTheme {
  return {
    ...colors(),
    ...fontSizes(),
    ...fontFamilies(),
    grids: {
      sm: 8,
      md: 12,
      lg: 24
    }
  };
}

export default function ThemeProvider({
  themeObject,
  children
}: {
  themeObject: DefaultTheme
  children: React.ReactNode
}) {
  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>;
}
