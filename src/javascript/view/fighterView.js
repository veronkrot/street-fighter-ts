import View from './view';
import {viewUtils} from "../helpers/viewUtils";
import {selectors} from "../helpers/selectors";
import {i18n} from "../helpers/i18n";

class FighterView extends View {

    constructor(fighter, handleClick, handleSelectFighter) {
        super();

        this.createFighter(fighter, handleClick, handleSelectFighter);
    }

    createFighter(fighter, handleClick, handleSelectFighter) {
        const {name, source} = fighter;
        const nameElement = this.createName(name);
        const imageElement = this.createImage(source);
        const checkboxElement = viewUtils.createBSCheckbox(
            i18n.get('fighter.select'),
            selectors.fighter.checkbox,
            e => handleSelectFighter(e, fighter));

        this.element = this.createElement({tagName: 'div', className: selectors.fighter.fighter});
        this.element.append(imageElement, nameElement, checkboxElement);

        this.element.addEventListener('click', event => handleClick(event, fighter), false);
    }

    createName(name) {
        const nameElement = this.createElement({tagName: 'span', className: selectors.fighter.name});
        nameElement.innerText = name;

        return nameElement;
    }

    createImage(source) {
        const attributes = {src: source};
        return this.createElement({
            tagName: 'img',
            className: selectors.fighter.image,
            attributes
        });
    }
}

export default FighterView;
