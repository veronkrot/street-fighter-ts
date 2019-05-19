import View from "./view";
import {viewUtils} from "../helpers/viewUtils";
import StatView from "./statView";
import {selectors} from "../helpers/selectors";

class StatsView extends View {

    static ignoredStatFields = ['_id', 'name', '_changes', 'source', 'currentHealth'];

    constructor(fighter, reverse) {
        super();
        this.element = this.createView(fighter, reverse)
    }

    createView(fighter, reverse = false) {
        let statsClass = undefined;
        let statClass = undefined;
        if (reverse) {
            statsClass = 'justify-content-end';
            statClass = selectors.stats.secondFighterStats;
        } else {
            statsClass = 'justify-content-start';
            statClass = selectors.stats.firstFighterStats;
        }
        const statsWrapper = viewUtils.createElement({
            tagName: 'div',
            classNames: [selectors.stats.firstFighterStats, 'd-flex', 'flex-column', statsClass]
        });
        Object.keys(fighter).forEach(prop => {
            const value = fighter[prop];
            if (StatsView.ignoredStatFields.includes(prop) || value instanceof Function || !value) {
                return;
            }
            statsWrapper.appendChild(new StatView(prop, value, statClass).element);
        });
        return statsWrapper;
    }


}

export default StatsView;
