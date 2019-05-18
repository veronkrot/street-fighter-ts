import View from './view';
import FighterView from './fighterView';
import {fighterService} from '../services/fightersService';
import FighterDetailsView from './fighterDetailsView';
import {selectors} from "../selectors";

class FightersView extends View {

    static fighterDetailsCache = new Map();

    constructor(fighters) {
        super();
        this.handleClick = this.handleFighterClick.bind(this);
        this.createFighters(fighters);
    }

    createFighters(fighters) {
        const fighterElements = fighters.map(fighter => {
            const fighterView = new FighterView(fighter, this.handleClick);
            return fighterView.element;
        });

        this.element = this.createElement({tagName: 'div', className: 'fighters'});
        this.element.append(...fighterElements);
    }


    getFighterDetails(_id) {
        return new Promise((resolve, reject) => {
            if (FightersView.fighterDetailsCache.has(_id)) {
                resolve(FightersView.fighterDetailsCache.get(_id));
                return;
            }
            fighterService.getFighterDetails(_id).then(fighterDetails => {
                FightersView.updateCache(_id, fighterDetails);
                resolve(fighterDetails);
            });
        });
    }

    static updateCache(fighterDetails) {
        FightersView.fighterDetailsCache.set(fighterDetails._id, fighterDetails);
    }

    async handleFighterClick(event, fighter) {
        if (event.target.getAttribute('data-item') === selectors.fighter.checkbox) {
            return;
        }
        let fighterDetails = await this.getFighterDetails(fighter._id);
        const fighterDetailsView = new FighterDetailsView(fighterDetails, FightersView.updateCache);
        fighterDetailsView.show();
    }
}

export default FightersView;
