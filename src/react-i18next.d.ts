import 'react-i18next';
import translationEN from '../public/lang/en/translation.json';
import translationFR from '../public/lang/fr/translation.json';

type DefaultNamespace = typeof translationEN;

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: DefaultNamespace;
  }
}
