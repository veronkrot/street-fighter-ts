export class BSButton {
    label: string;
    cssClass: string;
    action: Function;


    constructor(label: string, cssClass: string, action: Function) {
        this.label = label;
        this.cssClass = cssClass;
        this.action = action;
    }

}
