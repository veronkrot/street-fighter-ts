import View from "./view";
import {IBootstrapModal, ViewUtils} from "../helpers/viewUtils";
import {selectors} from "../helpers/selectors";
import {i18n} from "../helpers/i18n";
import SoundPlayer from "../services/soundPlayer";
import {sounds} from "../helpers/sounds";
import Fighter, {IFighterParams} from "../fighter";
import {BSButton} from "./BSButton";

class FighterDetailsView extends View {

    static ignoredFields: Array<string> = ['_id', 'name', '_changes', 'source'];
    static readonlyFields: Array<string> = ['defense'];

    player: SoundPlayer;

    constructor(details: Fighter, onUpdate: Function) {
        super();
        this.element = this.createModal(details, onUpdate) as unknown as HTMLElement;
        const fighterSound: string = sounds.fighters[details._id];
        this.player = new SoundPlayer(fighterSound);
        this.player.play();
    }

    private createModalContent(details: Fighter): HTMLElement {
        const detailsClass: string = selectors.fighter.details;
        const modalContent: HTMLElement = ViewUtils.createElement({
            tagName: 'div',
            classNames: [detailsClass, 'needs-validation'],
            attributes: {
                novalidate: 'novalidate'
            }
        });
        for (let [key, value] of Object.entries(details)) {
            if (FighterDetailsView.ignoredFields.includes(key)) {
                continue;
            }
            const isReadOnly: boolean = FighterDetailsView.readonlyFields.includes(key);
            const validationValidMsg: string = i18n.get('validation.valid');
            const validationInvalidMsg: string = i18n.get('validation.invalid.' + key);
            const detail: HTMLElement = ViewUtils.createLabelledInput(
                key,
                value as string,
                isReadOnly,
                validationValidMsg,
                validationInvalidMsg, (e: Event): void => {
                    if (!details._changes) {
                        details._changes = {} as IFighterParams;
                    }
                    const eventTarget: HTMLInputElement = e.target as HTMLInputElement;
                    details._changes[key] = Number(eventTarget.value);
                    eventTarget.classList.remove('is-valid');
                    eventTarget.classList.remove('is-invalid');
                    if (FighterDetailsView.validateFighterDetails(details)) {
                        eventTarget.classList.add('is-valid');
                    } else {
                        eventTarget.classList.add('is-invalid');
                    }
                });
            modalContent.appendChild(detail);
        }
        return modalContent;
    }

    private static isValidHealth(fighterDetails: Fighter): boolean {
        const newParams: IFighterParams = fighterDetails._changes;
        if (!newParams || typeof newParams.health === 'undefined') {
            return true;
        }
        let validHealth: boolean = false;
        newParams.health = Number(newParams.health);
        if (!Number.isNaN(newParams.health)) {
            validHealth = newParams.health >= 20 && newParams.health <= 80;
        }
        return validHealth;
    }

    private static isValidAttack(fighterDetails: Fighter): boolean {
        const newParams: IFighterParams = fighterDetails._changes;
        if (!newParams || typeof newParams.attack === 'undefined') {
            return true;
        }
        let validAttack: boolean = false;
        newParams.attack = Number(newParams.attack);
        if (!Number.isNaN(newParams.attack)) {
            validAttack = newParams.attack > 0 && newParams.attack <= 10;
        }
        return validAttack;
    }

   private static validateFighterDetails(fighterDetails: Fighter): boolean {
        let validHealth: boolean = FighterDetailsView.isValidHealth(fighterDetails);
        let validAttack: boolean = FighterDetailsView.isValidAttack(fighterDetails);
        return validAttack && validHealth;
    }

    createModal(fighterDetails: Fighter, onUpdate: Function): IBootstrapModal {
        const modalContent: HTMLElement = this.createModalContent(fighterDetails);
        const saveChangesBtn: BSButton = new BSButton(i18n.get('fighter.saveChanges'),
            "btn btn-sm btn-outline-info " + selectors.buttons.save,
            (modalWrapper: IBootstrapModal) => {
                const isValid: boolean = FighterDetailsView.validateFighterDetails(fighterDetails);
                if (isValid) {
                    Object.keys(fighterDetails._changes).forEach(key => {
                        fighterDetails[key] = fighterDetails._changes[key];
                    });
                    delete fighterDetails._changes;
                    onUpdate(fighterDetails);
                    return modalWrapper.hide();
                }
            }
        );
        const cancelBtn: BSButton = new BSButton(
            i18n.get('fighter.cancel'),
            "btn btn-sm btn-outline-secondary " + selectors.buttons.cancel,
            (modalWrapper: IBootstrapModal) => {
                return modalWrapper.hide();
            }
        );
        const modalDialog: IBootstrapModal = ViewUtils.createModalDialog(fighterDetails.name, modalContent, [
            saveChangesBtn,
            cancelBtn,
        ]);
        modalDialog.originalModal.on('hidden.bs.modal', () => delete fighterDetails._changes);
        return modalDialog;
    }

    show(): void {
        (this.element as any).show();
    }

}

export default FighterDetailsView;
