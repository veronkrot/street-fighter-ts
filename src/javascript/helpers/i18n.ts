import {messages} from "./messages";
import {cookieUtils} from "./cookieUtils";
import _ from 'lodash';

class I18n {

    locale: string;

    constructor() {
        let savedLocale: string = cookieUtils.getCookie('locale');
        this.locale = savedLocale ? savedLocale : 'en';
        console.log("Loaded bundle", messages);
    }

    changeLocale(locale: string): void {
        cookieUtils.setCookie('locale', locale);
        this.locale = locale;
        console.log("Changed bundle", messages);
    }

    get(key: string): string {
        const fullKey: string = this.locale + '.' + key;
        try {
            return _.get(messages, fullKey);
        } catch (e) {
            console.error('Error getting message key', key, e);
            return '${' + fullKey + '}';
        }
    }
}

export const i18n: I18n = new I18n();
