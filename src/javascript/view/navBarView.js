import View from "./view";
import {viewUtils} from "../helpers/viewUtils";
import {i18n} from "../helpers/i18n";

class NavBarView extends View {
    constructor() {
        super();
        this.element = this.createNavBar();
    }

    createNavBar() {
        const nav = viewUtils.createElement({
            tagName: 'nav',
            classNames: ['navbar', 'navbar-light', 'bg-light', 'fixed-top']
        });
        const a = viewUtils.createElement({
            tagName: 'a',
            classNames: ['navbar-brand'],
            attributes: {
                href: '#'
            }
        });
        const img = viewUtils.createElement({
            tagName: 'img',
            attributes: {
                src: './../../resources/logo.png',
                width: '100',
                height: '50',
            }
        });
        a.appendChild(img);
        nav.appendChild(a);

        const form = viewUtils.createElement({
            tagName: 'form',
            classNames: ['form-inline', 'my-2', 'my-lg-0'],
        });

        const uaFlag = viewUtils.createElement({
            tagName: 'span',
            classNames: ['btn', 'btn-outline-dark', 'btn-margin', 'btn-sm'],
            attributes: {
                locale: 'ua'
            }
        });
        uaFlag.innerText = '🇺🇦';

        const usFlag = viewUtils.createElement({
            tagName: 'span',
            classNames: ['btn', 'btn-outline-dark', 'btn-sm', 'btn-margin'],
            attributes: {
                locale: 'en'
            }
        });
        usFlag.innerText = '🇺🇸';

        let localeClickHandler = e => {
          const locale = e.target.getAttribute('locale');
          i18n.changeLocale(locale);
          window.location.reload();
        };
        usFlag.addEventListener('click', e => localeClickHandler(e));
        uaFlag.addEventListener('click', e => localeClickHandler(e));

        form.appendChild(uaFlag);
        form.appendChild(usFlag);
        nav.appendChild(form);
        return nav;
    }
}

export default NavBarView;
