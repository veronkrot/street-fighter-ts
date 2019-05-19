import FightersView from './view/fightersView';
import {fighterService} from './services/fightersService';
import {i18n} from "./helpers/i18n";

class App {
    constructor() {
        this.startApp();
    }

  static rootElement = document.getElementById('root');
  static loadingElement = document.getElementById('loading-overlay');

    async startApp() {
        try {
            App.loadingElement.style.visibility = 'visible';
            const fighters = await fighterService.getFighters();
            const fightersView = new FightersView(fighters);
            const fightersElement = fightersView.element;

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
