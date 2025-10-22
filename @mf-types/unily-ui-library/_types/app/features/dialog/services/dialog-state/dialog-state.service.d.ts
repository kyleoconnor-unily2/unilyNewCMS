import { DialogV2State } from '../../models/dialog-v2.state';
import { DialogV2Model } from '../../models/dialog-v2.model';
import { DialogContainerState } from '../dialog-manager/dialog-manager.service';
import { OverlayModel } from '../../../../shared/services/overlay/overlay.model';
export declare class DialogStateService {
    /**
     * Set dialog state and handle side effects
     */
    setState(state: DialogContainerState, overlay: OverlayModel<DialogV2Model<any>>, newState: DialogV2State): void;
    /**
     * Get style classes for dialog
     */
    getStyleClasses(state: DialogContainerState): string;
    private updateSize;
    private updateBackdropClass;
    private updatePosition;
    private getDimensions;
    private getDefinedDimensions;
    private hasSizeChanged;
    private hasBackdropChanged;
    private hasPositionChanged;
}
