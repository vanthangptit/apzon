export type Color = string
export interface Colors {
  // base
  white: Color
  black: Color
  transparent: Color
  placeholder: Color

  // Text
  text1: Color
  text2: Color
  text3: Color

  // Backgrounds / greys
  bg0: Color
  bg1: Color

  // primaries
  primary1: Color

  //error colors
  error1: Color

  gray: Color,
  gray1: Color,
  gray2: Color,
  gray3: Color,
  gray4: Color,
  gray5: Color,
  gray6: Color,
  gray7: Color,
  gray8: Color,
  gray9: Color
}

export type FontSize = string
export interface FontSizes {
  fontSizeText0: FontSize
  fontSizeText1: FontSize
  fontSizeText2: FontSize
  fontSizeText3: FontSize
  fontSizeText4: FontSize
  display1: FontSize
  display2: FontSize
  display3: FontSize
  display4: FontSize
  caps1: FontSize
  caps2: FontSize
}

export type FontFamily = string
export interface FontFamilies {
  fontRobotoLight: FontFamily
  fontRobotoRegular: FontFamily
  fontRobotoBold: FontFamily
  fontRobotoBlack: FontFamily
}
