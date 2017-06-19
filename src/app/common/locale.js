import React from 'react';
import {I18nManager} from 'react-native';
import I18n from 'react-native-i18n';

I18n.fallbacks = true;
I18n.defaultLocale = 'en';
I18n.locale = I18nManager.isRTL ? 'ar' : 'en';

I18n.translations = {
  en: require('../../../assets/lang/en.json'),
  ar: require('../../../assets/lang/ar.json'),
};

// export function addTranslatedProperties(obj, language, ...properties) {
//   // return Object.assign({}, obj,
//     properties.forEach(p => {
//       Object.defineProperty(obj, p, {
//         enumerable: false,
//         configurable: false,
//         get: () => obj[`${p}_${language}`] || obj[`${p}_en`],
//         set: v => obj[`${p}_${language}`] = v,
//       })
//     })
//   // )
// };

export const isRTL = I18nManager.isRTL;
export default I18n;
