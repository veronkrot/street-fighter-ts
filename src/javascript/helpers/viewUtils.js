import {utils} from './utils';
import BootstrapModalWrapperFactory from 'bootstrap-modal-wrapper/dist/bootstrap-modal-wrapper-factory.min';
import $ from 'jquery/dist/jquery.min';
import {i18n} from "./i18n";

class ViewUtils {
    createLabelledInput(name, value, isReadOnly, validMsgTxt, invalidMsgTxt, onChange) {
        const wrapper = this.createElement({
            tagName: 'div',
            classNames: ['input-group', 'mb-3']
        });
        const spanDiv = this.createElement({
            tagName: 'div',
            classNames: ['input-group-prepend']
        });
        const spanId = utils.generateRandomId();
        const spanEl = this.createElement({
            tagName: 'div',
            classNames: ['input-group-text', 'capitalize'],
            attributes: {
                id: spanId
            }
        });
        spanEl.innerText = name;
        spanDiv.appendChild(spanEl);

        const inputId = utils.generateRandomId();
        const inputEl = this.createElement({
            tagName: 'input',
            classNames: ['form-control'],
            attributes: {
                'aria-describedby': spanId,
                type: 'text',
                value,
                id: inputId
            }
        });
        if (isReadOnly) {
            inputEl.setAttribute('readonly', 'readonly');
        } else {
            $(document).on('keyup', '#' + inputId, e => onChange(e));
        }
        wrapper.appendChild(spanDiv);
        wrapper.appendChild(inputEl);
        if (validMsgTxt) {
            const validMsg = this.createElement({
                tagName: 'div',
                classNames: ['valid-feedback']
            });
            validMsg.innerText = validMsgTxt;
            wrapper.appendChild(validMsg);
        }
        if (invalidMsgTxt) {
            const invalidMsg = this.createElement({
                tagName: 'div',
                classNames: ['invalid-feedback']
            });
            invalidMsg.innerText = invalidMsgTxt;
            wrapper.appendChild(invalidMsg);
        }

        return wrapper;
    }

    createElement({tagName, classNames = [], attributes = {}}) {
        const element = document.createElement(tagName);
        classNames.forEach(className => {
            if (className) {
                element.classList.add(className);
            }
        });
        Object.keys(attributes).forEach(key => element.setAttribute(key, attributes[key]));

        return element;
    }

    createModalDialog(title, content, buttons) {
        return BootstrapModalWrapperFactory.createModal({
            message: content,
            title,
            closable: true,
            closeByBackdrop: true,
            buttons
        });
    }

    createBSCheckbox(btnName, className, onClick) {
        const id = utils.generateRandomId();
        const divWrapper = this.createElement({
            tagName: 'div',
            classNames: ['btn-group-toggle', 'd-flex', 'justify-content-center'],
            attributes: {
                'data-toggle': 'buttons',
            }
        });
        const label = this.createElement({
            tagName: 'label',
            classNames: ['btn', 'btn-info'],
            attributes: {
                id,
                'data-item': className
            }
        });
        const btn = this.createElement({
            tagName: 'input',
            classNames: [className],
            attributes: {
                type: 'checkbox',
                autocomplete: 'autocomplete',
                'data-item': className
            }
        });
        $(document).on('click', '#' + id, e => onClick(e));
        label.innerText = btnName;
        label.appendChild(btn);
        divWrapper.appendChild(label);
        return divWrapper;
    }

    createBSCard(headerContent, bodyContent, footerContent) {
        const divWrapper = this.createElement({
            tagName: 'div',
            classNames: ['card', 'text-center']
        });

        const headerDiv = this.createElement({
            tagName: 'div',
            classNames: ['card-header']
        });
        headerDiv.appendChild(headerContent);
        const bodyDiv = this.createElement({
            tagName: 'div',
            classNames: ['card-body']
        });
        bodyDiv.appendChild(bodyContent);
        const footerDiv = this.createElement({
            tagName: 'div',
            classNames: ['card-footer', 'text-muted', 'd-flex', 'justify-content-center']
        });
        footerDiv.appendChild(footerContent);

        divWrapper.appendChild(headerDiv);
        divWrapper.appendChild(bodyDiv);
        divWrapper.appendChild(footerDiv);
        return divWrapper;
    }

}

export const viewUtils = new ViewUtils();
