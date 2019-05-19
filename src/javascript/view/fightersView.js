import View from './view';
import FighterView from './fighterView';
import {fighterService} from '../services/fightersService';
import FighterDetailsView from './fighterDetailsView';
import {selectors} from "../selectors";
import FightView from "./fightView";
import {viewUtils} from "./viewUtils";
import $ from 'jquery/dist/jquery.min';

class FightersView extends View {

    static fighterDetailsCache = new Map();
    selectedFighters = [];

    constructor(fighters) {
        super();
        this.handleClick = this.handleFighterClick.bind(this);
        this.handleSelectFighter = this.handleSelectFighter.bind(this);
        this.createFighters(fighters);
    }

    createFighters(fighters) {
        const fighterElements = fighters.map(fighter => {
            const fighterView = new FighterView(fighter, this.handleClick, this.handleSelectFighter);
            return fighterView.element;
        });

        this.element = viewUtils.createElement({tagName: 'div'});
        const fightersEls = this.createElement({tagName: 'div', className: 'fighters'});
        fightersEls.append(...fighterElements);
        const startFightBtn = this.createStartFightButton();
        this.element.appendChild(fightersEls);
        this.element.appendChild(startFightBtn);
    }

    createStartFightButton() {
        const div = viewUtils.createElement({
            tagName: 'div',
            classNames: ['justify-content-center', 'd-flex']
        });
        const startFightBtn = viewUtils.createElement({
            tagName: 'button',
            classNames: ['btn-primary', 'btn', selectors.startFight],
            attributes: {
                type: 'button'
            }
        });
        startFightBtn.innerText = 'Start Fight';
        startFightBtn.addEventListener('click', (e) => this.handleStartFight(e));
        div.appendChild(startFightBtn);
        return div;
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
            }).catch(e => reject(e));
        });
    }

    static updateCache(fighterDetails) {
        FightersView.fighterDetailsCache.set(fighterDetails._id, fighterDetails);
    }

    handleStartFight(e) {
        const fightElement = document.getElementById(selectors.fight);
        fightElement.innerHTML = new FightView(this.selectedFighters[0], this.selectedFighters[1]).element.innerHTML;
        fightElement.style.visibility = 'visible';
        $('#root').hide();
        this.clearSelectedFighters();
    }

    clearSelectedFighters() {
        let el = $('.' + selectors.fighter.selected);
        el.removeClass(selectors.fighter.selected);
        el.removeClass('btn-danger');
        el.removeClass('active');
        el.addClass('btn-success');
        this.selectedFighters = [];
    }

    handleSelectFighter(e, fighter) {
        const el = $(e.target);
        const isSelected = el.hasClass(selectors.fighter.selected);
        if (!isSelected && this.selectedFighters.length >= 2) {
            return;
        }
        if (isSelected) {
            this.selectedFighters = this.selectedFighters.filter(f => f._id !== fighter._id);
            el.removeClass(selectors.fighter.selected);
            el.removeClass('btn-danger');
            el.addClass('btn-success');
        } else {
            this.selectedFighters.push(fighter);
            el.addClass(selectors.fighter.selected);
            el.removeClass('btn-success');
            el.addClass('btn-danger');
        }
        this.toggleStartFightBtn();
    }

    toggleStartFightBtn() {
        const startBtn = $('.' + selectors.startFight)[0];
        if (this.selectedFighters.length === 2) {
            startBtn.style.visibility = 'visible';
        } else {
            startBtn.style.visibility = 'hidden';
        }
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
