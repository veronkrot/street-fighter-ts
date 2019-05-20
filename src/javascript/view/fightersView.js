import View from './view';
import FighterView from './fighterView';
import {fighterService} from '../services/fightersService';
import FighterDetailsView from './fighterDetailsView';
import {selectors} from "../helpers/selectors";
import FightView from "./fightView";
import {viewUtils} from "../helpers/viewUtils";
import $ from 'jquery/dist/jquery.min';
import {fightersCache} from "../services/fightersCache";
import {i18n} from '../helpers/i18n';
import NavBarView from './navBarView';

class FightersView extends View {

    selectedFighters = [];

    constructor(fighters) {
        super();
        this.handleFighterClick = this.handleFighterClick.bind(this);
        this.handleSelectFighter = this.handleSelectFighter.bind(this);
        this.createFighters(fighters);
    }

    createFighters(fighters) {
        const fighterElements = fighters.map(fighter => {
            const fighterView = new FighterView(fighter, this.handleFighterClick, this.handleSelectFighter);
            return fighterView.element;
        });

        this.element = viewUtils.createElement({tagName: 'div'});
        const fightersEls = this.createElement({tagName: 'div', className: selectors.fighter.fighters});
        fightersEls.append(...fighterElements);
        const startFightBtn = this.createStartFightButton();
        const navBar = new NavBarView();
        this.element.appendChild(navBar.element);
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
            classNames: ['btn-success', 'btn', selectors.buttons.startFight],
            attributes: {
                type: 'button'
            }
        });
        startFightBtn.innerText = i18n.get('fight.start');
        startFightBtn.addEventListener('click', (e) => this.handleStartFight(e));
        div.appendChild(startFightBtn);
        return div;
    }

    getFighterDetails(_id) {
        return new Promise((resolve, reject) => {
            if (fightersCache.has(_id)) {
                resolve(fightersCache.get(_id));
                return;
            }
            fighterService.getFighterDetails(_id).then(fighterDetails => {
                fightersCache.updateCache(fighterDetails, _id);
                resolve(fighterDetails);
            }).catch(e => reject(e));
        });
    }

    handleStartFight(e) {
        const $fightElement = $('#' + selectors.fight.view);
        $fightElement[0].innerHTML = new FightView(this.selectedFighters[0], this.selectedFighters[1]).element.innerHTML;
        $fightElement.show();
        $('#root').hide();
        const startBtn = $('.' + selectors.buttons.startFight)[0];
        startBtn.style.visibility = 'hidden';
        this.clearSelectedFighters();
    }

    clearSelectedFighters() {
        let el = $('.' + selectors.fighter.selected);
        el.removeClass(selectors.fighter.selected);
        el.removeClass(FightersView.selectFighterBtn.selected);
        el.removeClass('active');
        el.addClass(FightersView.selectFighterBtn.deselected);
        this.selectedFighters = [];
    }

    static selectFighterBtn = {
        selected: 'btn-warning',
        deselected: 'btn-info',
    };

    async handleSelectFighter(e, fighter) {
        const el = $(e.target);
        const isSelected = el.hasClass(selectors.fighter.selected);
        if (!isSelected && this.selectedFighters.length >= 2) {
            return;
        }
        if (isSelected) {
            this.selectedFighters = this.selectedFighters.filter(f => f._id !== fighter._id);
            el.removeClass(selectors.fighter.selected);
            el.removeClass(FightersView.selectFighterBtn.selected);
            el.addClass(FightersView.selectFighterBtn.deselected);
        } else {
            const fighterDetails = await this.getFighterDetails(fighter._id);
            this.selectedFighters.push(fighterDetails);
            el.addClass(selectors.fighter.selected);
            el.removeClass(FightersView.selectFighterBtn.deselected);
            el.addClass(FightersView.selectFighterBtn.selected);
        }
        this.toggleStartFightBtn();
    }

    toggleStartFightBtn() {
        const startBtn = $('.' + selectors.buttons.startFight)[0];
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
        const fighterDetailsView = new FighterDetailsView(fighterDetails, fightersCache.updateCache);
        fighterDetailsView.show();
    }
}

export default FightersView;
