import View from "./view";
import {selectors} from "../helpers/selectors";
import {ViewUtils} from "../helpers/viewUtils";
import {i18n} from "../helpers/i18n";
import Fighter from "../fighter";

class FightResultsView extends View {
    constructor(winners: Array<Fighter>) {
        super();
        winners = [...winners];
        this.element = this.createView(winners);
    }

    private createView(winners: Array<Fighter>): HTMLElement {
        const body: HTMLElement = this.createElement({
            tagName: 'div',
            className: 'container'
        });
        const textResultRow: HTMLElement = ViewUtils.createElement({
            tagName: 'span',
            classNames: ['row', 'justify-content-center', 'd-flex']
        });
        let message: string = '';
        if (winners && winners.length > 1) {
            message = i18n.get('fight.result.winner.multiple') + winners.map(winner => winner.name).join(", ") + "!";
        } else if (winners.length === 1) {
            message = i18n.get('fight.result.winner.single') + winners[0].name + "!";
        }
        textResultRow.innerText = message;
        const winnersRow: HTMLElement = ViewUtils.createElement({
            tagName: 'div',
            classNames: ['row', 'justify-content-center', 'd-flex']
        });
        winners.forEach((winner, i) => {
            winnersRow.appendChild(this.createWinnerView(winner, i !== 0));
        });
        body.appendChild(textResultRow);
        body.appendChild(winnersRow);
        return body;
    }

    private createWinnerView(winner: Fighter , reverse: boolean = false): HTMLElement {
        const col: HTMLElement = ViewUtils.createElement({
            tagName: 'div',
            classNames: ['col']
        });
        const row1: HTMLElement = ViewUtils.createElement({
            tagName: 'div',
            classNames: ['row', 'justify-content-center', 'd-flex']
        });
        const row2: HTMLElement = ViewUtils.createElement({
            tagName: 'div',
            classNames: ['row', 'justify-content-center', 'd-flex']
        });
        let imgClass: string = '';
        if (reverse) {
            imgClass = selectors.fight.secondFighter;
        }
        const image: HTMLElement = ViewUtils.createElement({
            tagName: 'img',
            classNames: [selectors.fight.img, imgClass],
            attributes: {
                src: winner.source
            }
        });
        const name: HTMLElement = this.createElement({
            tagName: 'span',
            className: selectors.fighter.name
        });
        name.innerText = winner.name;
        row1.appendChild(name);
        row2.appendChild(image);
        col.appendChild(row1);
        col.appendChild(row2);
        return col as HTMLElement;
    }
}

export default FightResultsView;
