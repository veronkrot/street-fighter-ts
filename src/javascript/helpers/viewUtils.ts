import {utils} from './utils';
// @ts-ignore 3rd-party library
import BootstrapModalWrapperFactory from 'bootstrap-modal-wrapper/dist/bootstrap-modal-wrapper-factory.min';
import $ from 'jquery';
import {BSButton} from "../view/BSButton";

export interface IBootstrapModal extends JQuery {
    originalModal: JQuery
}

export class ViewUtils {
    static createLabelledInput(name: string, value: string,
                               isReadOnly: boolean, validMsgTxt: string,
                               invalidMsgTxt: string, onChange: Function): HTMLElement {
        const wrapper: HTMLElement = this.createElement({
            tagName: 'div',
            classNames: ['input-group', 'mb-3']
        });
        const spanDiv: HTMLElement = this.createElement({
            tagName: 'div',
            classNames: ['input-group-prepend']
        });
        const spanId: string = utils.generateRandomId();
        const spanEl: HTMLElement = this.createElement({
            tagName: 'div',
            classNames: ['input-group-text', 'capitalize'],
            attributes: {
                id: spanId
            }
        });
        spanEl.innerText = name;
        spanDiv.appendChild(spanEl);

        const inputId: string = utils.generateRandomId();
        const inputEl: HTMLElement = this.createElement({
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
            const callback = (e: object): void => {
                onChange(e);
            };
            const eventName: string = 'keyup';
            const selector: string = '#' + inputId;
            $(document).on(eventName, selector, callback);
        }
        wrapper.appendChild(spanDiv);
        wrapper.appendChild(inputEl);
        if (validMsgTxt) {
            const validMsg: HTMLElement = this.createElement({
                tagName: 'div',
                classNames: ['valid-feedback']
            });
            validMsg.innerText = validMsgTxt;
            wrapper.appendChild(validMsg);
        }
        if (invalidMsgTxt) {
            const invalidMsg: HTMLElement = this.createElement({
                tagName: 'div',
                classNames: ['invalid-feedback']
            });
            invalidMsg.innerText = invalidMsgTxt;
            wrapper.appendChild(invalidMsg);
        }

        return wrapper as HTMLDivElement;
    }

    static createElement({tagName, classNames = [], attributes = {}}:
                             {
                                 tagName: string,
                                 classNames?: Array<string>,
                                 attributes?: object
                             }
    ): HTMLElement {
        const element: HTMLElement = document.createElement(tagName);
        classNames.forEach(className => {
            if (className) {
                element.classList.add(className);
            }
        });
        for (let [key, value] of Object.entries(attributes)) {
            element.setAttribute(key, value);
        }
        return element as HTMLElement;
    }

    static createModalDialog(title: string, content: string | HTMLElement, buttons: Array<BSButton>): IBootstrapModal {
        return BootstrapModalWrapperFactory.createModal({
            message: content,
            title,
            closable: true,
            closeByBackdrop: true,
            buttons
        }) as IBootstrapModal;
    }

    static createBSCheckbox(btnName: string, className: string, onClick: Function): HTMLElement {
        const id: string = utils.generateRandomId();
        const divWrapper: HTMLElement = this.createElement({
            tagName: 'div',
            classNames: ['btn-group-toggle', 'd-flex', 'justify-content-center'],
            attributes: {
                'data-toggle': 'buttons',
            }
        });
        const label: HTMLElement = this.createElement({
            tagName: 'label',
            classNames: ['btn', 'btn-info'],
            attributes: {
                id,
                'data-item': className
            }
        });
        const btn: HTMLElement = this.createElement({
            tagName: 'input',
            classNames: [className],
            attributes: {
                type: 'checkbox',
                autocomplete: 'autocomplete',
                'data-item': className
            }
        });
        const callback = (e: object): void => {
            onClick(e);
        };
        $(document).on('click', '#' + id, callback);
        label.innerText = btnName;
        label.appendChild(btn);
        divWrapper.appendChild(label);
        return divWrapper as HTMLDivElement;
    }

    static createBSCard(headerContent: HTMLElement, bodyContent: HTMLElement, footerContent: HTMLElement): HTMLElement {
        const divWrapper: HTMLElement = this.createElement({
            tagName: 'div',
            classNames: ['card', 'text-center']
        });

        const headerDiv: HTMLElement = this.createElement({
            tagName: 'div',
            classNames: ['card-header']
        });
        headerDiv.appendChild(headerContent);
        const bodyDiv: HTMLElement = this.createElement({
            tagName: 'div',
            classNames: ['card-body']
        });
        bodyDiv.appendChild(bodyContent);
        const footerDiv: HTMLElement = this.createElement({
            tagName: 'div',
            classNames: ['card-footer', 'text-muted', 'd-flex', 'justify-content-center']
        });
        footerDiv.appendChild(footerContent);

        divWrapper.appendChild(headerDiv);
        divWrapper.appendChild(bodyDiv);
        divWrapper.appendChild(footerDiv);
        return divWrapper as HTMLDivElement;
    }

}
