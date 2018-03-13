import { language } from '../../../config';

import englishLang from '../../../assets/images/flag/uk.svg';
import chineseLang from '../../../assets/images/flag/china.svg';
import spanishLang from '../../../assets/images/flag/spain.svg';
import frenchLang from '../../../assets/images/flag/france.svg';
import italianLang from '../../../assets/images/flag/italy.svg';

const config = {
  defaultLanguage: language,
  options: [
    {
      languageId: 'english',
      locale: 'en',
      text: 'English',
      icon: englishLang,
    },
    {
      languageId: 'chinese',
      locale: 'zh',
      text: 'Chinese',
      icon: chineseLang,
    },
    {
      languageId: 'spanish',
      locale: 'es',
      text: 'Spanish',
      icon: spanishLang,
    },
    {
      languageId: 'french',
      locale: 'fr',
      text: 'French',
      icon: frenchLang,
    },
    {
      languageId: 'italian',
      locale: 'it',
      text: 'Italian',
      icon: italianLang,
    },
  ],
};

export function getCurrentLanguage(lang) {
  let selecetedLanguage = config.options[0];
  config.options.forEach(l => {
    if (l.languageId === lang) {
      selecetedLanguage = l;
    }
  });
  return selecetedLanguage;
}
export default config;
