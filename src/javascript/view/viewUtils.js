import {utils} from '../utils';
import BootstrapModalWrapperFactory
    from './../../../node_modules/bootstrap-modal-wrapper/dist/bootstrap-modal-wrapper-factory.min';
import $ from './../../../node_modules/jquery/dist/jquery.min';

class ViewUtils {
    createLabelledInput(name, value, isReadOnly, onChange) {
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

        return wrapper;
    }

    createElement({tagName, classNames = [], attributes = {}}) {
        const element = document.createElement(tagName);
        classNames.forEach(className => element.classList.add(className));
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
            classNames: ['btn', 'btn-success'],
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
}

export const viewUtils = new ViewUtils();
