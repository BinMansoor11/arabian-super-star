// @flow
// Android
// title 20
// Heading 16
// desc 14

// ios
// title 20
// Heading 20
// desc 17

import Metrics from './Metrics';

const type = {
  LatoBlack: 'Lato-Black',
  LatoBlackItalic: 'Lato-BlackItalic',
  LatoBold: 'Lato-Bold',
  LatoBoldItalic: 'Lato-BoldItalic',
  LatoHairline: 'Lato-Hairline',
  LatoHairlineItalic: 'Lato-HairlineItalic',
  LatoHeavy: 'Lato-Heavy',
  LatoHeavyItalic: 'Lato-HeavyItalic',
  LatoItalic: 'Lato-Italic',
  LatoLight: 'Lato-Light',
  LatoLightItalic: 'Lato-LightItalic',
  LatoMedium: 'Lato-Medium',
  LatoMediumItalic: 'Lato-MediumItalic',
  LatoRegular: 'Lato-Regular',
  LatoSemibold: 'Lato-Semibold',
  LatoSemiboldItalic: 'Lato-SemiboldItalic',
  LatoThin: 'Lato-Thin',
  LatoThinItalic: 'Lato-ThinItalic',
  Arial: 'arial',
  ArialBold: 'arialbd',
  ArialBoldItalic: 'arialbi',
  ArialItalic: 'ariali',
  ArialBlackBold: 'ariblk',


  RobotoBlack: 'Roboto-Black',
  RobotoBlackItalic: 'Roboto-BlackItalic',
  RobotoBold: 'Roboto-Bold',
  RobotoBoldItalic: 'Roboto-BoldItalic',
  RobotoItalic: 'Roboto-Italic',
  RobotoLight: 'Roboto-Light',
  RobotoLightItalic: 'Roboto-LightItalic',
  RobotoMedium: 'Roboto-Medium',
  RobotoMediumItalic: 'Roboto-MediumItalic',
  RobotoRegular: 'Roboto-Regular',
  RobotoThin: 'Roboto-Thin',
  RobotoThinItalic: 'Roboto-ThinItalic',
};

const size = {
  tiny: Metrics.generatedFontSize(8),
  ten: Metrics.generatedFontSize(10),
  xxxSmall: Metrics.generatedFontSize(11),
  xxSmall: Metrics.generatedFontSize(12),
  twelve: Metrics.generatedFontSize(12),
  thirteen: Metrics.generatedFontSize(13),
  fourteen: Metrics.generatedFontSize(14),
  xSmall: Metrics.generatedFontSize(14),
  small: Metrics.generatedFontSize(15),
  fifteen: Metrics.generatedFontSize(15.11),
  sixteen: Metrics.generatedFontSize(16),
  medium: Metrics.generatedFontSize(18),
  normal: Metrics.generatedFontSize(17),
  eighteen: Metrics.generatedFontSize(18),
  nighteen: Metrics.generatedFontSize(19),
  large: Metrics.generatedFontSize(20),
  xLarge: Metrics.generatedFontSize(25),
  xxLarge: Metrics.generatedFontSize(30),
  xxxLarge: Metrics.generatedFontSize(36),
  xxxxLarge: Metrics.generatedFontSize(50),
};

export default {
  type,
  size,
};
