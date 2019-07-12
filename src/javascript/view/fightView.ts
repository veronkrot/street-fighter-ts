import View from "./view";
import {IBootstrapModal, ViewUtils} from "../helpers/viewUtils";
import $ from 'jquery';
import {selectors} from "../helpers/selectors";
import FighterBattleView from "./fighterBattleView";
import {i18n} from "../helpers/i18n";
import FightResultsView from "./fightResultsView";
import SoundPlayer from "../services/soundPlayer";
import {sounds} from "../helpers/sounds";
import Fighter, {FighterUtils} from "../fighter";
import {BSButton} from "./BSButton";

class FightView extends View {

    fighter1: Fighter;
    fighter2: Fighter;
    player: SoundPlayer;

    constructor(fighter1: Fighter, fighter2: Fighter) {
        super();
        this.fighter1 = FightView._cloneFighter(fighter1);
        this.fighter2 = FightView._cloneFighter(fighter2);
        this.createView(this.fighter1, this.fighter2);
        this.handleStrikeBtnClick = this.handleStrikeBtnClick.bind(this);
        this.handleExitBtnClick = this.handleExitBtnClick.bind(this);
        $(document).off('click', '.' + selectors.fight.strike);
        $(document).off('click', '.' + selectors.fight.exit);
        $(document).on('click', '.' + selectors.fight.strike, (): void => this.handleStrikeBtnClick());
        $(document).on('click', '.' + selectors.fight.exit, (): void => this.handleExitBtnClick());
        this.fighter1.currentHealth = fighter1.health;
        this.fighter2.currentHealth = fighter2.health;
        this.player = new SoundPlayer(sounds.fight, true);
        this.player.play();
    }

    private static _cloneFighter(fighter: Fighter): Fighter {
        let clonedFighter = {...fighter};
        return clonedFighter as Fighter;
    }

    private createView(fighter1: Fighter, fighter2: Fighter): void {
        const btn: HTMLElement = this.createLogElement();

        const header: HTMLElement = this.createHeader(fighter1, fighter2);
        const body: HTMLElement = this.createBody(fighter1, fighter2);

        this.element = ViewUtils.createBSCard(header, body, btn);
    }

    private createLogElement(): HTMLElement {
        return this.createElement({
            tagName: 'span',
            className: 'log',
            attributes: {
                style: "overflow-y: auto; max-height:400px;"
            }
        });
    }

    private createBody(fighter1: Fighter, fighter2: Fighter): HTMLElement {
        const body: HTMLElement = this.createElement({
            tagName: 'div',
            className: 'container'
        });
        const row: HTMLElement = this.createElement({
            tagName: 'div',
            className: 'row'
        });


        const col1: Array<HTMLElement> = new FighterBattleView(fighter1).elements;
        const strikeBtn: HTMLElement = FightView.createButton(i18n.get('fight.strike'), ['btn-warning', selectors.fight.strike]);
        const col2: HTMLElement = this.createColumn(strikeBtn);
        col2.classList.add('d-flex', 'justify-content-center');
        const col3: Array<HTMLElement> = new FighterBattleView(fighter2, true).elements;

        col1.forEach(col => row.appendChild(col));
        row.appendChild(col2);
        col3.forEach(col => row.appendChild(col));
        body.appendChild(row);

        return body;
    }

    private static getStrikePower(fighter1: Fighter, fighter2: Fighter): number {
        const hitPower: number = FighterUtils.getHitPower(fighter1);
        const blockPower: number = FighterUtils.getBlockPower(fighter2);
        let power: number = hitPower - blockPower;
        if (power < 0) {
            power = 0;
        }
        return power as number;
    }

    fight(fighter1: Fighter, fighter2: Fighter): void {
        // lets assume that strikes are performed simultaneously, then 'draw' is possible
        const strikePow: number = FightView.getStrikePower(fighter1, fighter2);
        let healthBeforeStrike: number = fighter2.currentHealth;
        let healthAfterStrike: number = healthBeforeStrike - strikePow;
        const today: Date = new Date();
        const time: string = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
        const logMessage: string = `${time} ${fighter1.name} -> ${fighter2.name}: ${healthBeforeStrike.toFixed(2)} -> ${healthAfterStrike.toFixed(2)}`;
        console.debug(logMessage);
        fighter2.currentHealth = healthAfterStrike;
        FightView.updateHealthBar(fighter2);

        const $log: JQuery = $('.log');
        const logMsgEl: HTMLElement = this.createElement({
            tagName: 'p'
        });
        logMsgEl.innerText = logMessage;
        $log[0].appendChild(logMsgEl);
    }

    private handleStrikeBtnClick(): void {
        this.fight(this.fighter1, this.fighter2);
        this.fight(this.fighter2, this.fighter1);
        let winners = [];
        if (this.fighter1.currentHealth <= 0) {
            winners.push(this.fighter2);
        }
        if (this.fighter2.currentHealth <= 0) {
            winners.push(this.fighter1);
        }
        if (winners && winners.length > 0) {
            this.player.stop();
            const winPlayer: SoundPlayer = new SoundPlayer(sounds.victory);
            winPlayer.play();
            FightView.hideFightView();
            const modalDialog: IBootstrapModal = ViewUtils.createModalDialog(
                i18n.get('fight.result.title'), new FightResultsView(winners).element,
                [
                    new BSButton(i18n.get('fight.startAgain'), "btn btn-sm btn-outline-info btn-block", (modalWrapper: IBootstrapModal) => {
                        $('#root').show();
                        return modalWrapper.hide();
                    })
                ]).show();
            modalDialog.originalModal.on('hidden.bs.modal', () => {
                winPlayer.stop();
                $('#root').show();
            });
            delete this.fighter1.currentHealth;
            delete this.fighter2.currentHealth;
        }
    }

    private static updateHealthBar(fighter: Fighter): void {
        const $el: JQuery = $('.' + FightView.getFighterHealthBarSelector(fighter));
        let percentage: number = (fighter.currentHealth * 100) / fighter.health;
        if (Number.isNaN(percentage) || percentage < 0) {
            percentage = 0;
        }
        $el.removeClass('bg-info');
        $el.removeClass('bg-warning');
        $el.removeClass('bg-danger');
        if (percentage > 60) {
            $el.addClass('bg-info');
        }
        if (percentage <= 60) {
            $el.addClass('bg-warning');
        }
        if (percentage < 20) {
            $el.addClass('bg-danger');
        }
        $el[0].style.width = percentage + '%';
        $el.text(Math.floor(fighter.currentHealth) + '/' + Math.floor(fighter.health));
    }

    private static getFighterHealthBarSelector(fighter: Fighter): string {
        return 'fighter-' + fighter._id;
    }

    private static hideFightView(): void {
        $('#' + selectors.fight.view).hide();
    }

    private handleExitBtnClick(): void {
        FightView.hideFightView();
        $('#root').show();
        this.player.stop();
    }

    private createHeader(fighter1: Fighter, fighter2: Fighter): HTMLElement {
        const header: HTMLElement = this.createElement({
            tagName: 'div',
            className: 'container'
        });
        const row: HTMLElement = this.createElement({
            tagName: 'div',
            className: 'row'
        });

        const col1: HTMLElement = this.createFighterHeader(fighter1);
        const btn: HTMLElement = FightView.createButton(
            i18n.get('fight.exit'),
            ['btn-outline-danger', selectors.fight.exit]
        );
        const col2: HTMLElement = this.createColumn(btn);
        col2.classList.add('d-flex', 'justify-content-center');
        const col3: HTMLElement = this.createFighterHeader(fighter2, true);
        row.appendChild(col1);
        row.appendChild(col2);
        row.appendChild(col3);
        header.appendChild(row);
        return header as HTMLElement;
    }

    private createFighterHeader(fighter: Fighter, reverse?: boolean): HTMLElement {
        const healthBar: HTMLElement = FightView.createHealthBar(fighter, reverse);
        let classNames: Array<string> = ['bold'];
        if (reverse) {
            classNames = [...classNames, 'd-flex', 'justify-content-end'];
        }
        const name: HTMLElement = ViewUtils.createElement({
            tagName: 'span',
            classNames
        });
        name.innerText = fighter.name;
        const header: HTMLElement = this.createElement({
            tagName: 'div'
        });
        header.appendChild(name);
        header.appendChild(healthBar);
        return this.createColumn(header) as HTMLElement;
    }

    private createColumn(colContent: HTMLElement): HTMLElement {
        const col: HTMLElement = this.createElement({
            tagName: 'div',
            className: 'col'
        });
        if (colContent) {
            col.appendChild(colContent);
        }
        return col as HTMLElement;
    }


    private static createHealthBar(fighter: Fighter, reverse: boolean = false): HTMLElement {
        let className: string = '';
        let barClass: string = '';
        if (reverse) {
            className = selectors.fighter.second;
            barClass = selectors.fighter.health;
        }
        const healthBar: HTMLElement = ViewUtils.createElement({
            tagName: 'div',
            classNames: ['progress', className]
        });

        let healthBarClassName: string = FightView.getFighterHealthBarSelector(fighter);
        const nestedBar: HTMLElement = ViewUtils.createElement({
            tagName: 'div',
            classNames: ['progress-bar', 'progress-bar-striped', 'progress-bar-animated', 'bg-info', healthBarClassName, barClass],
            attributes: {
                role: "progressbar",
                'aria-valuenow': fighter.health,
                'aria-valuemin': 0,
                'aria-valuemax': fighter.health,
                'style': 'width: 100%',
            }
        });
        nestedBar.innerText = Math.floor(fighter.health) + '/' + Math.floor(fighter.health);

        healthBar.appendChild(nestedBar);
        return healthBar as HTMLElement;
    }


    private static createButton(text: string, classNames: Array<string>): HTMLElement {
        classNames = ['btn', ...classNames];
        const btn: HTMLElement = ViewUtils.createElement({
            tagName: 'button',
            classNames,
            attributes: {
                type: 'button'
            }
        });
        btn.innerText = text;
        return btn as HTMLElement;
    }

}

export default FightView;
