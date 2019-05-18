import $ from './../../../node_modules/jquery/dist/jquery.min';
import View from './view';
import {viewUtils} from "./viewUtils";

require('./../../../node_modules/bootstrap/dist/js/bootstrap');
import {selectors} from "../selectors";

class FighterView extends View {

    constructor(fighter, handleClick) {
        super();

        this.createFighter(fighter, handleClick);
    }

    createFighter(fighter, handleClick) {
        const {name, source} = fighter;
        const nameElement = this.createName(name);
        const imageElement = this.createImage(source);
        const selectedFighterClass = selectors.fighter.checkbox;
        const checkboxElement = viewUtils.createBSCheckbox('Select', selectedFighterClass, e => {
            const el = $(e.target);
            el.toggleClass('btn-success');
            el.toggleClass('btn-danger');
            const selectedElements = $(`label[data-item='${selectedFighterClass}'].active`).length;
            if (selectedElements > 2) {
                el.toggleClass('btn-success');
                el.toggleClass('btn-danger');
                el.toggleClass('active');
            }
        });

        this.element = this.createElement({tagName: 'div', className: 'fighter'});
        this.element.append(imageElement, nameElement, checkboxElement);

        this.element.addEventListener('click', event => handleClick(event, fighter), false);
    }

    createName(name) {
        const nameElement = this.createElement({tagName: 'span', className: 'name'});
        nameElement.innerText = name;

        return nameElement;
    }

    createImage(source) {
        const attributes = {src: source};
        const imgElement = this.createElement({
            tagName: 'img',
            className: 'fighter-image',
            attributes
        });

        return imgElement;
    }
}

export default FighterView;
