import { DialogPosition } from '../../../features/dialog/models/dialog-position.interface';
import { DialogDimensions } from '../../../features/dialog/models/dialog-dimensions.interface';
import { DialogButtonAlignment } from '../../../features/dialog/models/dialog-button-alignment.type';
export declare enum VerticalPosition {
    Top = 1,
    Center = 2,
    Bottom = 3
}
export declare enum HorizontalPosition {
    Left = 1,
    Center = 2,
    Right = 3
}
export declare enum ScrollStrategy {
    Block = 1,
    Close = 2,
    Noop = 3,
    Reposition = 4
}
export interface CustomOverlayConfig {
    panelClass?: string;
    hasBackdrop?: boolean;
    onBackdropCancelData?: any;
    cancelOnBackdropClick?: boolean;
    closeOnBackdropClick?: boolean;
    closeOnPopState?: boolean;
    onBackDropClick?: Function;
    backdropClass?: string;
    verticalPosition?: VerticalPosition;
    horizontalPosition?: HorizontalPosition;
    appendTo?: HTMLElement | string;
    dimensions?: DialogDimensions;
    position?: DialogPosition;
    withPush?: boolean;
    disableBackdropColor?: boolean;
    footerButtonAlignment?: DialogButtonAlignment;
}
