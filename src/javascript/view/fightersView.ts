import View from './view';
import FighterView from './fighterView';
import {fighterService} from '../services/fightersService';
import FighterDetailsView from './fighterDetailsView';
import {selectors} from "../helpers/selectors";
import FightView from "./fightView";
import {ViewUtils} from "../helpers/viewUtils";
import $ from 'jquery';
import {fightersCache} from "../services/fightersCache";
import {i18n} from '../helpers/i18n';
import NavBarView from './navBarView';
import Fighter from "../fighter";

enum selectFighterBtn {
    selected = 'btn-warning',
    deselected = 'btn-info',
}

class FightersView extends View {

    selectedFighters: Array<Fighter> = [];

    constructor(fighters: Array<Fighter>) {
        super();
        this.handleFighterClick = this.handleFighterClick.bind(this);
        this.handleSelectFighter = this.handleSelectFighter.bind(this);
        this.createFighters(fighters);
    }

    private createFighters(fighters: Array<Fighter>): void {
        const fighterElements: Array<HTMLElement> = fighters.map(fighter => {
            const fighterView: FighterView = new FighterView(fighter, this.handleFighterClick, this.handleSelectFighter);
            return fighterView.element;
        });

        this.element = ViewUtils.createElement({tagName: 'div'});
        const fightersEls: HTMLElement = this.createElement({tagName: 'div', className: selectors.fighter.fighters});
        fightersEls.append(...fighterElements);
        const startFightBtn: HTMLElement = this.createStartFightButton();
        const navBar: NavBarView = new NavBarView();
        this.element.appendChild(navBar.element);
        this.element.appendChild(fightersEls);
        this.element.appendChild(startFightBtn);
    }

    private createStartFightButton(): HTMLElement {
        const div: HTMLElement = ViewUtils.createElement({
            tagName: 'div',
            classNames: ['justify-content-center', 'd-flex']
        });
        const startFightBtn: HTMLElement = ViewUtils.createElement({
            tagName: 'button',
            classNames: ['btn-success', 'btn', selectors.buttons.startFight],
            attributes: {
                type: 'button'
            }
        });
        startFightBtn.innerText = i18n.get('fight.start');
        startFightBtn.addEventListener('click', (): void => this.handleStartFight());
        div.appendChild(startFightBtn);
        return div as HTMLElement;
    }

    private getFighterDetails(_id: string | number): Promise<Fighter> {
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

    private handleStartFight(): void {
        const $fightElement: JQuery = $('#' + selectors.fight.view);
        $fightElement[0].innerHTML = new FightView(this.selectedFighters[0], this.selectedFighters[1]).element.innerHTML;
        $fightElement.show();
        $('#root').hide();
        const startBtn: HTMLElement = $('.' + selectors.buttons.startFight)[0];
        startBtn.style.visibility = 'hidden';
        this.clearSelectedFighters();
    }

    private clearSelectedFighters(): void {
        let el: JQuery = $('.' + selectors.fighter.selected);
        el.removeClass(selectors.fighter.selected);
        el.removeClass(selectFighterBtn.selected);
        el.removeClass('active');
        el.addClass(selectFighterBtn.deselected);
        this.selectedFighters = [];
    }


    private async handleSelectFighter(e: Event, fighter: Fighter): Promise<void> {
        const target: HTMLElement = e.target as HTMLElement;
        const el: JQuery = $(target);
        const isSelected: boolean = el.hasClass(selectors.fighter.selected);
        if (!isSelected && this.selectedFighters.length >= 2) {
            return;
        }
        if (isSelected) {
            this.selectedFighters = this.selectedFighters.filter(f => f._id !== fighter._id);
            el.removeClass(selectors.fighter.selected);
            el.removeClass(selectFighterBtn.selected);
            el.addClass(selectFighterBtn.deselected);
        } else {
            const fighterDetails = await this.getFighterDetails(fighter._id);
            this.selectedFighters.push(fighterDetails);
            el.addClass(selectors.fighter.selected);
            el.removeClass(selectFighterBtn.deselected);
            el.addClass(selectFighterBtn.selected);
        }
        this.toggleStartFightBtn();
    }

    private toggleStartFightBtn(): void {
        const startBtn: HTMLElement = $('.' + selectors.buttons.startFight)[0];
        if (this.selectedFighters.length === 2) {
            startBtn.style.visibility = 'visible';
        } else {
            startBtn.style.visibility = 'hidden';
        }
    }

    private async handleFighterClick(event: Event, fighter: Fighter): Promise<void> {
        const eventTarget: HTMLElement = (event.target as HTMLElement);
        if (eventTarget.getAttribute('data-item') === selectors.fighter.checkbox) {
            return;
        }
        let fighterDetails: Fighter = await this.getFighterDetails(fighter._id);
        const fighterDetailsView: FighterDetailsView = new FighterDetailsView(fighterDetails, fightersCache.updateCache);
        fighterDetailsView.show();
    }
}

export default FightersView;
