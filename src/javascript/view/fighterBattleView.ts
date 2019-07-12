import View from "./view";
import {selectors} from "../helpers/selectors";
import {ViewUtils} from "../helpers/viewUtils";
import StatsView from "./statsView";
import Fighter from "../fighter";

class FighterBattleView extends View {
    elements: Array<HTMLElement>;

    constructor(fighter: Fighter, reverse?: boolean) {
        super();
        this.elements = this.createView(fighter, reverse);
    }

    private createView(fighter: Fighter, reverse: boolean = false): Array<HTMLElement> {
        let imgClass: string = '';
        if (reverse) {
            imgClass = selectors.fight.secondFighter;
        }

        const col1: HTMLElement = this.createElement({
            tagName: 'div',
            className: 'col'
        });
        const col2: HTMLElement = this.createElement({
            tagName: 'div',
            className: 'col'
        });
        const image: HTMLElement = ViewUtils.createElement({
            tagName: 'img',
            classNames: [selectors.fight.img, imgClass],
            attributes: {
                src: fighter.source
            }
        });

        const statsWrapper: StatsView = new StatsView(fighter, reverse);
        col1.appendChild(statsWrapper.element);
        col2.appendChild(image);
        if (reverse) {
            return [col2, col1];
        }
        return [col1, col2];
    }

}

export default FighterBattleView;
