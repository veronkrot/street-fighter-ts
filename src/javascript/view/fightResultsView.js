import View from "./view";
import {selectors} from "../helpers/selectors";
import {viewUtils} from "../helpers/viewUtils";
import {i18n} from "../helpers/i18n";

class FightResultsView extends View {
    constructor(winners) {
        super();
        winners = [...winners];
        this.element = this.createView(winners);
    }

    createView(winners) {
        const body = this.createElement({
            tagName: 'div',
            className: 'container'
        });
        const textResultRow = viewUtils.createElement({
            tagName: 'span',
            classNames: ['row', 'justify-content-center', 'd-flex']
        });
        let message = '';
        if (winners && winners.length > 1) {
            message = i18n.get('fight.result.winner.multiple') + winners.map(winner => winner.name).join(", ") + "!";
        } else if (winners.length === 1) {
            message = i18n.get('fight.result.winner.single') + winners[0].name + "!";
        }
        textResultRow.innerText = message;
        const winnersRow = viewUtils.createElement({
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

    createWinnerView(winner, reverse = false) {
        const col = viewUtils.createElement({
            tagName: 'div',
            classNames: ['col']
        });
        const row1 = viewUtils.createElement({
            tagName: 'div',
            classNames: ['row', 'justify-content-center', 'd-flex']
        });
        const row2 = viewUtils.createElement({
            tagName: 'div',
            classNames: ['row', 'justify-content-center', 'd-flex']
        });
        let imgClass = undefined;
        if (reverse) {
            imgClass = selectors.fight.secondFighter;
        }
        const image = viewUtils.createElement({
            tagName: 'img',
            classNames: [selectors.fight.img, imgClass],
            attributes: {
                src: winner.source
            }
        });
        const name = this.createElement({
            tagName: 'span',
            className: selectors.fighter.name
        });
        name.innerText = winner.name;
        row1.appendChild(name);
        row2.appendChild(image);
        col.appendChild(row1);
        col.appendChild(row2);
        return col;
    }
}

export default FightResultsView;
