import View from "./view";
import {selectors} from "../selectors";
import {viewUtils} from "./viewUtils";
import StatsView from "./StatsView";

class FighterBattleView extends View {
    constructor(fighter, reverse) {
        super();
        this.elements = this.createView(fighter, reverse);
    }

    createView(fighter, reverse = false) {
        let imgClass = undefined;
        if (reverse) {
            imgClass = selectors.fight.secondFighter;
        }

        const col1 = this.createElement({
            tagName: 'div',
            className: 'col'
        });
        const col2 = this.createElement({
            tagName: 'div',
            className: 'col'
        });
        const image = viewUtils.createElement({
            tagName: 'img',
            classNames: ['fight-view-fighter-image', imgClass],
            attributes: {
                src: fighter.source
            }
        });

        const statsWrapper = new StatsView(fighter, reverse);
        col1.appendChild(statsWrapper.element);
        col2.appendChild(image);
        if (reverse) {
            return [col2, col1];
        }
        return [col1, col2];
    }

}

export default FighterBattleView;
