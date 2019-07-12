import View from './view';
import {ViewUtils} from "../helpers/viewUtils";
import {selectors} from "../helpers/selectors";
import {i18n} from "../helpers/i18n";
import Fighter from "../fighter";

class FighterView extends View {

    constructor(fighter: Fighter, handleClick: Function, handleSelectFighter: Function) {
        super();

        this.createFighter(fighter, handleClick, handleSelectFighter);
    }

    private createFighter(fighter: Fighter, handleClick: Function, handleSelectFighter: Function): void {
        const {name, source}: { name: string, source: string } = fighter;
        const nameElement: HTMLElement = this.createName(name);
        const imageElement: HTMLElement = this.createImage(source);
        const checkboxElement = ViewUtils.createBSCheckbox(
            i18n.get('fighter.select'),
            selectors.fighter.checkbox,
            (e: Event): void => handleSelectFighter(e, fighter));

        this.element = this.createElement({tagName: 'div', className: selectors.fighter.fighter});
        this.element.append(imageElement, nameElement, checkboxElement);

        this.element.addEventListener('click', event => handleClick(event, fighter), false);
    }

   private createName(name: string): HTMLElement {
        const nameElement: HTMLElement = this.createElement({tagName: 'span', className: selectors.fighter.name});
        nameElement.innerText = name;

        return nameElement;
    }

    private createImage(source: string): HTMLElement {
        const attributes: object = {src: source};
        return this.createElement({
            tagName: 'img',
            className: selectors.fighter.image,
            attributes
        });
    }
}

export default FighterView;
