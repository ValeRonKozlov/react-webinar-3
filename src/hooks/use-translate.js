import {useCallback, useContext, useSyncExternalStore} from 'react';
import {I18nContext} from '../i18n/context';
import useServices from './use-services';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  // return useContext(I18nContext);
  const i18n = useServices().i18n;
  const state = useSyncExternalStore(i18n.subscribe, i18n.getState)

  return {
    t: i18n.t,
    lang: state.lang,
    setLang: i18n.setLang,
  }
}
