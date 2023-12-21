import * as translations from '../../i18n/translations';

class I18n {
  listeners = new Set();

  constructor (services, config={}, initialState={config: {lang: 'ru'}}) {
    this.services = services;
    this.config = config;
    if (this.config.lang) {
      this.setLang(this.config.lang);
    }

    this.setLang = this.setLang.bind(this);
    this.translate = this.translate.bind(this);
    this.notify = this.notify.bind(this);
  }

  setLang(lang) {
    this.config = {
      ...this.config,
      lang,
    }
    this.services.api.defaultHeaders = {
      ...this.services.api.defaultHeaders,
      'X-Lang': lang,
    }
    this.notify();
  }

  get lang() {
    return this.config.lang;
  }

  translate(lang, text, plural) {
    let result = translations[lang] && (text in  translations[lang])
                ? translations[lang][text]
                : text;

    if (typeof plural != 'undefined') {
      const key = new Intl.PluralRules(lang).select(plural);
      if (key in result) {
        result = result[key];
      }
    }
    return result;
  }

  t = (text, number) => {
    return this.translate(this.lang, text, number)
  }

  getState = () => {
    return this.config;
  }

  subscribe = (listener) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify = () => {
    this.listeners.forEach(listener => listener());
  }

}

export default I18n;