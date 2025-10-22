import { DialogButtonV2Model } from '../../models/dialog-button-v2.model';
export declare class DialogButtonComponent {
    disabled: import("@angular/core").InputSignal<boolean | undefined>;
    button: import("@angular/core").InputSignal<DialogButtonV2Model | undefined>;
    buttonClick: import("@angular/core").OutputEmitterRef<unknown>;
    get buttonClass(): string;
    onButtonClick(event: MouseEvent): void;
}
