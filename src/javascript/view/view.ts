import {ViewUtils} from "../helpers/viewUtils";

class View {
    element: HTMLElement;

    public constructor() {
        this.element = {} as HTMLElement;
    }

    protected createElement({tagName, className = '', attributes = {}}: {
        tagName: string,
        className?: string,
        attributes?: object
    }): HTMLElement {
        return ViewUtils.createElement({tagName, classNames: [className], attributes}) as HTMLElement;
    }
}

export default View;
