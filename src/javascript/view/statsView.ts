import View from "./view";
import {ViewUtils} from "../helpers/viewUtils";
import StatView from "./statView";
import {selectors} from "../helpers/selectors";

class StatsView extends View {

    static ignoredStatFields: Array<string> = ['_id', 'name', '_changes', 'source', 'currentHealth'];

    constructor(fighter: object, reverse: boolean) {
        super();
        this.element = StatsView.createView(fighter, reverse)
    }

    private static createView(fighter: object, reverse: boolean = false): HTMLElement {
        let statsClass: string;
        let statClass: string;
        if (reverse) {
            statsClass = 'justify-content-end';
            statClass = selectors.stats.secondFighterStats;
        } else {
            statsClass = 'justify-content-start';
            statClass = selectors.stats.firstFighterStats;
        }
        const statsWrapper: HTMLElement = ViewUtils.createElement({
            tagName: 'div',
            classNames: [selectors.stats.firstFighterStats, 'd-flex', 'flex-column', statsClass]
        });

        for (let [key, value] of Object.entries(fighter)) {
            if (StatsView.ignoredStatFields.includes(key) || value instanceof Function || !value) {
                continue;
            }
            statsWrapper.appendChild(new StatView(key, value, statClass).element);
        }
        return statsWrapper as HTMLElement;
    }


}

export default StatsView;
