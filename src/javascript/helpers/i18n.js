import {messages} from "./messages";
import {cookieUtils} from "./cookieUtils";

class I18n {

    locale;

    constructor() {
        let savedLocale = cookieUtils.getCookie('locale');
        this.locale = savedLocale ? savedLocale : 'en';
    }

    changeLocale(locale) {
        cookieUtils.setCookie('locale', locale);
        this.locale = locale;
    }

    get(key) {
        return this._eval(messages, key);
    }

    _eval(messages, key) {
        const fullKey = 'messages.' + this.locale + '.' + key;
        try {
            return eval('messages.' + this.locale + '.' + key);
        } catch (e) {
            console.error('Error getting message key', key, e);
            return '${' + fullKey + '}';
        }

    }
}

export const i18n = new I18n();
