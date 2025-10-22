import { DialogButtonType } from '../../models/dialog-button.type';
import { DialogButtonV2Model } from '../../models/dialog-button-v2.model';
export default class ButtonFactoryService {
    getButton(type: DialogButtonType): DialogButtonV2Model;
    private getNextButton;
    private getPreviousButton;
    private getSubmitButton;
    private getCloseButton;
    private getCancelButton;
    private getConfirmButton;
}
