import View from "./view";
import {viewUtils} from "./viewUtils";

class FighterDetailsView extends View {

    static ignoredFields = ['_id', 'name', '_changes'];
    static readonlyFields = ['defense'];

    modalDialog;

    constructor(details, onUpdate) {
        super();
        this.modalDialog = this.createModal(details, onUpdate);
    }

    createModalContent(details) {
        const modalContent = this.createElement({
            tagName: 'div',
            className: 'fighter-details'
        });
        Object.keys(details).forEach(prop => {
            if (FighterDetailsView.ignoredFields.includes(prop)) {
                return;
            }
            const isReadOnly = FighterDetailsView.readonlyFields.includes(prop);
            const detail = viewUtils.createLabelledInput(prop, details[prop], isReadOnly, e => {
                if (!details._changes) {
                    details._changes = {};
                }
                details._changes[prop] = e.target.value;
            });
            modalContent.appendChild(detail);
        });
        return modalContent;
    }

    static validateFighterDetails(fighterDetails) {
        // TODO:
        return true;
    }

    createModal(fighterDetails, onUpdate) {
        const modalContent = this.createModalContent(fighterDetails);
        const modalDialog = viewUtils.createModalDialog(fighterDetails.name, modalContent, [
            {
                label: "Save changes",
                cssClass: "btn btn-sm btn-outline-info save-confirm",
                action: (modalWrapper) => {
                    const isValid = FighterDetailsView.validateFighterDetails(fighterDetails);
                    if (isValid) {
                        fighterDetails = {...fighterDetails, ...fighterDetails._changes};
                        delete fighterDetails._changes;
                        onUpdate(fighterDetails);
                    }
                    return modalWrapper.hide();
                }
            },
            {
                label: "Cancel",
                cssClass: "btn btn-sm btn-outline-secondary save-cancel",
                action: (modalWrapper) => {
                    return modalWrapper.hide();
                }
            },
        ]);
        modalDialog.originalModal.on('hidden.bs.modal', () => delete fighterDetails._changes);
        return modalDialog;
    }

    show() {
        this.modalDialog.show();
    }

}

export default FighterDetailsView;
