import View from "./view";
import {viewUtils} from "../helpers/viewUtils";

class StatView extends View {

    constructor(name, value, className) {
        super();
        this.element = this.createView(name, value, className);
    }

    createView(name, value, className) {
        const stat = viewUtils.createElement({
            tagName: 'div',
            classNames: ['stat', className]
        });
        const statName = viewUtils.createElement({
            tagName: 'span',
            classNames: ['capitalize', 'bold', 'stat-name']
        });
        statName.innerText = name;

        const statValue = this.createElement({
            tagName: 'span',
            className: 'stat-value'
        });
        statValue.innerText = value;
        stat.appendChild(statName);
        stat.appendChild(statValue);
        return stat;
    }


}

export default StatView;
