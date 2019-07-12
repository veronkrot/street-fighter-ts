import View from "./view";
import {ViewUtils} from "../helpers/viewUtils";

class StatView extends View {

    constructor(name: string, value: string | number, className: string) {
        super();
        this.element = this.createView(name, value, className);
    }

    private createView(name: string, value: string | number, className: string): HTMLElement {
        const stat: HTMLElement = ViewUtils.createElement({
            tagName: 'div',
            classNames: ['stat', className]
        });
        const statName: HTMLElement = ViewUtils.createElement({
            tagName: 'span',
            classNames: ['capitalize', 'bold', 'stat-name']
        });
        statName.innerText = name;

        const statValue: HTMLElement = this.createElement({
            tagName: 'span',
            className: 'stat-value'
        });

        statValue.innerText = (value as string);
        stat.appendChild(statName);
        stat.appendChild(statValue);
        return stat as HTMLElement;
    }


}

export default StatView;
