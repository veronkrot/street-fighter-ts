import View from './view';
import {viewUtils} from "./viewUtils";
import {selectors} from "../selectors";

class FighterView extends View {

    static selectedFighterClass = selectors.fighter.checkbox;

    constructor(fighter, handleClick, handleSelectFighter) {
        super();

        this.createFighter(fighter, handleClick, handleSelectFighter);
    }

    createFighter(fighter, handleClick, handleSelectFighter) {
        const {name, source} = fighter;
        const nameElement = this.createName(name);
        const imageElement = this.createImage(source);
        const checkboxElement = viewUtils.createBSCheckbox(
            'Select',
            FighterView.selectedFighterClass,
            e => handleSelectFighter(e, fighter));

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
        return this.createElement({
            tagName: 'img',
            className: 'fighter-image',
            attributes
        });
    }
}

export default FighterView;
