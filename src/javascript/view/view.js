import {viewUtils} from "./viewUtils";

class View {
    element;

    createElement({tagName, className = '', attributes = {}}) {
        return viewUtils.createElement({tagName, classNames: [className], attributes});
    }
}

export default View;
