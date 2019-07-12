import FightersView from './view/fightersView';
import {fighterService} from './services/fightersService';
import {i18n} from "./helpers/i18n";
import Fighter from "./fighter";

class App {

    constructor() {
        App.startApp();
    }

    static rootElement: HTMLDivElement = document.getElementById('root') as HTMLDivElement;
    static loadingElement: HTMLDivElement = document.getElementById('loading-overlay') as HTMLDivElement;

    static async startApp(): Promise<void> {
        try {
            App.loadingElement.style.visibility = 'visible';
            const fighters: Array<Fighter> = await fighterService.getFighters();
            const fightersView: FightersView = new FightersView(fighters);
            const fightersElement: HTMLElement = fightersView.element;

            App.rootElement.appendChild(fightersElement);
        } catch (error) {
            console.warn(error);
            App.rootElement.innerText = i18n.get('failedToLoad');
        } finally {
            App.loadingElement.style.visibility = 'hidden';
        }
    }
}

export default App;
