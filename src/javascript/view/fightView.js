import View from "./view";
import {viewUtils} from "./viewUtils";

class FightView extends View {
    constructor(fighter1, fighter2) {
        super();
        this.createView(fighter1, fighter2);
    }

    createView(fighter1, fighter2) {
        const btn = this.createFightButton();

        const header = this.createHeader(fighter1, fighter2);
        const body = this.createBody(fighter1, fighter2);

        this.element = viewUtils.createBSCard(header, body, btn);
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


        const col1 = this.createrFighterInfo(fighter1);
        const col2 = this.createColumn();
        const col3 = this.createrFighterInfo(fighter2);

        row.appendChild(col1);
        row.appendChild(col2);
        row.appendChild(col3);
        body.appendChild(row);

        return body;
    }

    createrFighterInfo(fighter) {
        const element = this.createElement({
            tagName: 'img',
            attributes: {
                src: fighter.source
            }
        });


        return element;
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
        const col2 = this.createColumn();
        const col3 = this.createFighterHeader(fighter2);
        row.appendChild(col1);
        row.appendChild(col2);
        row.appendChild(col3);
        header.appendChild(row);
        return header;
    }

    createFighterHeader(fighter) {
        const healthBar = this.createHealthBar();
        const name = this.createElement({
            tagName: 'span'
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


    createHealthBar() {
        const healthBar = this.createElement({
            tagName: 'div',
            className: 'progress'
        });

        const nestedBar = viewUtils.createElement({
            tagName: 'div',
            classNames: ['progress-bar', 'progress-bar-striped', 'progress-bar-animated', 'bg-info'],
            attributes: {
                role: "progressbar",
                'aria-valuenow': 75,
                'aria-valuemin': 0,
                'aria-valuemax': 100,
                'style': 'width: 75%',
            }
        });

        healthBar.appendChild(nestedBar);
        return healthBar;
    }


    createFightButton() {
        const btn = viewUtils.createElement({
            tagName: 'button',
            classNames: ['btn', 'btn-warning'],
            attributes: {
                type: 'button'
            }
        });
        btn.innerText = 'Strike';
        return btn;
    }

}

export default FightView;
