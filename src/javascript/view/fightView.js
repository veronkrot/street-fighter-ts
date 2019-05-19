import View from "./view";
import {viewUtils} from "../helpers/viewUtils";
import $ from 'jquery/dist/jquery.min';
import {selectors} from "../helpers/selectors";
import FighterBattleView from "./fighterBattleView";
import {i18n} from "../helpers/i18n";
import FightResultsView from "./fightResultsView";
import SoundPlayer from "../services/soundPlayer";

class FightView extends View {

    fighter1;
    fighter2;
    player;

    constructor(fighter1, fighter2) {
        super();
        this.fighter1 = FightView._cloneFighter(fighter1);
        this.fighter2 = FightView._cloneFighter(fighter2);
        this.createView(this.fighter1, this.fighter2);
        this.handleStrikeBtnClick = this.handleStrikeBtnClick.bind(this);
        FightView.handleExitBtnClick = FightView.handleExitBtnClick.bind(this);
        $(document).off('click', '.' + selectors.fight.strike);
        $(document).off('click', '.' + selectors.fight.exit);
        $(document).on('click', '.' + selectors.fight.strike, (e) => this.handleStrikeBtnClick(e));
        $(document).on('click', '.' + selectors.fight.exit, (e) => FightView.handleExitBtnClick(e));
        this.fighter1.currentHealth = fighter1.health;
        this.fighter2.currentHealth = fighter2.health;
        this.player = new SoundPlayer('./../../resources/audio/mk.mp3');
        this.player.play();
    }

    static _cloneFighter(fighter) {
        let clonedFighter = {...fighter};
        clonedFighter.getHitPower = fighter.getHitPower;
        clonedFighter.getBlockPower = fighter.getBlockPower;
        return clonedFighter;
    }

    createView(fighter1, fighter2) {
        const btn = this.createLogElement();

        const header = this.createHeader(fighter1, fighter2);
        const body = this.createBody(fighter1, fighter2);

        this.element = viewUtils.createBSCard(header, body, btn);
    }

    createLogElement() {
        return this.createElement({
            tagName: 'span',
            className: 'log',
            attributes: {
                style: "overflow-y: auto; max-height:400px;"
            }
        });
    }

    createBody(fighter1, fighter2) {
        const body = this.createElement({
            tagName: 'div',
            className: 'container'
        });
        const row = this.createElement({
            tagName: 'div',
            className: 'row'
        });


        const col1 = new FighterBattleView(fighter1).elements;
        const strikeBtn = this.createButton(i18n.get('fight.strike'), ['btn-warning', selectors.fight.strike]);
        const col2 = this.createColumn(strikeBtn);
        col2.classList.add('d-flex', 'justify-content-center');
        const col3 = new FighterBattleView(fighter2, true).elements;

        col1.forEach(col => row.appendChild(col));
        row.appendChild(col2);
        col3.forEach(col => row.appendChild(col));
        body.appendChild(row);

        return body;
    }

    getStrikePower(fighter1, fighter2) {
        let power = fighter1.getHitPower() - fighter2.getBlockPower();
        if (power < 0) {
            power = 0;
        }
        return power;
    }

    fight(fighter1, fighter2) {
        // lets assume that strikes are performed simultaneously, then 'draw' is possible
        const strikePow = this.getStrikePower(fighter1, fighter2);
        let healthBeforeStrike = fighter2.currentHealth;
        let healthAfterStrike = healthBeforeStrike - strikePow;
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const logMessage = time + ' ' + fighter1.name + ' -> ' + fighter2.name + ': ' + healthBeforeStrike.toFixed(2) + ' -> ' + healthAfterStrike.toFixed(2);
        console.debug(logMessage);
        fighter2.currentHealth = healthAfterStrike;
        this.updateHealthBar(fighter2);
        const $log = $('.log');
        const logMsgEl = this.createElement({
            tagName: 'p'
        });
        logMsgEl.innerText = logMessage;
        $log[0].appendChild(logMsgEl);
    }

    handleStrikeBtnClick(e) {
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
            FightView.hideFightView();
            const modalDialog = viewUtils.createModalDialog(i18n.get('fight.result.title'), new FightResultsView(winners).element,
                [
                    {
                        label: i18n.get('fight.startAgain'),
                        cssClass: "btn btn-sm btn-outline-info btn-block",
                        action: (modalWrapper) => {
                            $('#root').show();
                            return modalWrapper.hide();
                        }
                    },
                ]).show();
            modalDialog.originalModal.on('hidden.bs.modal', () => $('#root').show());
            delete this.fighter1.currentHealth;
            delete this.fighter2.currentHealth;
        }
    }

    updateHealthBar(fighter) {
        const $el = $('.' + this.getFighterHealthBarSelector(fighter));
        let percentage = (fighter.currentHealth * 100) / fighter.health;
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

    getFighterHealthBarSelector(fighter) {
        return 'fighter-' + fighter._id;
    }

    static hideFightView() {
        $('#' + selectors.fight.view).hide();
    }

    static handleExitBtnClick(e) {
        $('#root').show();
    }

    createHeader(fighter1, fighter2) {
        const header = this.createElement({
            tagName: 'div',
            className: 'container'
        });
        const row = this.createElement({
            tagName: 'div',
            className: 'row'
        });

        const col1 = this.createFighterHeader(fighter1);
        const btn = this.createButton(i18n.get('fight.exit'), ['btn-danger', selectors.fight.exit]);
        const col2 = this.createColumn(btn);
        col2.classList.add('d-flex', 'justify-content-center');
        const col3 = this.createFighterHeader(fighter2, true);
        row.appendChild(col1);
        row.appendChild(col2);
        row.appendChild(col3);
        header.appendChild(row);
        return header;
    }

    createFighterHeader(fighter, reverse) {
        const healthBar = this.createHealthBar(fighter, reverse);
        let classNames = ['bold'];
        if (reverse) {
            classNames = [...classNames, 'd-flex', 'justify-content-end'];
        }
        const name = viewUtils.createElement({
            tagName: 'span',
            classNames
        });
        name.innerText = fighter.name;
        const header = this.createElement({
            tagName: 'div'
        });
        header.appendChild(name);
        header.appendChild(healthBar);
        return this.createColumn(header);
    }

    createColumn(colContent) {
        const col = this.createElement({
            tagName: 'div',
            className: 'col'
        });
        if (colContent) {
            col.appendChild(colContent);
        }
        return col;
    }


    createHealthBar(fighter, reverse = false) {
        let className = '';
        let barClass = '';
        if (reverse) {
            className = selectors.fighter.second;
            barClass = selectors.fighter.health;
        }
        const healthBar = viewUtils.createElement({
            tagName: 'div',
            classNames: ['progress', className]
        });

        let healthBarClassName = this.getFighterHealthBarSelector(fighter);
        const nestedBar = viewUtils.createElement({
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
        return healthBar;
    }


    createButton(text, classNames) {
        classNames = ['btn', ...classNames];
        const btn = viewUtils.createElement({
            tagName: 'button',
            classNames,
            attributes: {
                type: 'button'
            }
        });
        btn.innerText = text;
        return btn;
    }

}

export default FightView;
