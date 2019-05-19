import View from "./view";
import {viewUtils} from "../helpers/viewUtils";
import {selectors} from "../helpers/selectors";
import {i18n} from "../helpers/i18n";

class FighterDetailsView extends View {

    static ignoredFields = ['_id', 'name', '_changes', 'source'];
    static readonlyFields = ['defense'];

    constructor(details, onUpdate) {
        super();
        this.element = this.createModal(details, onUpdate);
    }

    createModalContent(details) {
        const modalContent = this.createElement({
            tagName: 'div',
            className: [selectors.fighter.details, 'needs-validation'],
            attributes: {
                novalidate: 'novalidate'
            }
        });
        Object.keys(details).forEach(prop => {
            if (FighterDetailsView.ignoredFields.includes(prop)) {
                return;
            }
            const isReadOnly = FighterDetailsView.readonlyFields.includes(prop);
            const detail = viewUtils.createLabelledInput(prop, details[prop], isReadOnly, i18n.get('validation.valid'), i18n.get('validation.invalid.' + prop),e => {
                if (!details._changes) {
                    details._changes = {};
                }
                details._changes[prop] = e.target.value;
                e.target.classList.remove('is-valid');
                e.target.classList.remove('is-invalid');
                if (FighterDetailsView.validateFighterDetails(details)) {
                    e.target.classList.add('is-valid');
                } else {
                    e.target.classList.add('is-invalid');
                }
            });
            modalContent.appendChild(detail);
        });
        return modalContent;
    }

    static isValidHealth(fighterDetails) {
        const newParams = fighterDetails._changes;
        if (!newParams || !newParams.health) {
            return true;
        }
        let validHealth = false;
        newParams.health = Number(newParams.health);
        if (!Number.isNaN(newParams.health)) {
            validHealth = newParams.health >= 20 && newParams.health <= 80;
        }
        return validHealth;
    }

    static isValidAttack(fighterDetails) {
        const newParams = fighterDetails._changes;
        if (!newParams || !newParams.attack) {
            return true;
        }
        let validAttack = false;
        newParams.attack = Number(newParams.attack);
        if (!Number.isNaN(newParams.attack)) {
            validAttack = newParams.attack > 0 && newParams.attack <= 10;
        }
        return validAttack;
    }

    static validateFighterDetails(fighterDetails) {
        let validHealth = FighterDetailsView.isValidHealth(fighterDetails);
        let validAttack = FighterDetailsView.isValidAttack(fighterDetails);
        return validAttack && validHealth;
    }

    createModal(fighterDetails, onUpdate) {
        const modalContent = this.createModalContent(fighterDetails);
        const modalDialog = viewUtils.createModalDialog(fighterDetails.name, modalContent, [
            {
                label: i18n.get('fighter.saveChanges'),
                cssClass: "btn btn-sm btn-outline-info " + selectors.buttons.save,
                action: (modalWrapper) => {
                    const isValid = FighterDetailsView.validateFighterDetails(fighterDetails);
                    if (isValid) {
                        Object.keys(fighterDetails._changes).forEach(key => {
                            fighterDetails[key] = fighterDetails._changes[key];
                        });
                        delete fighterDetails._changes;
                        onUpdate(fighterDetails);
                        return modalWrapper.hide();
                    }
                }
            },
            {
                label: i18n.get('fighter.cancel'),
                cssClass: "btn btn-sm btn-outline-secondary " + selectors.buttons.cancel,
                action: (modalWrapper) => {
                    return modalWrapper.hide();
                }
            },
        ]);
        modalDialog.originalModal.on('hidden.bs.modal', () => delete fighterDetails._changes);
        return modalDialog;
    }

    show() {
        this.element.show();
    }

}

export default FighterDetailsView;
