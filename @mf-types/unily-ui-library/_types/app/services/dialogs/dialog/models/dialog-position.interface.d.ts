/**
 * DialogPosition defines the possible positions for the dialog relative to its trigger element.
 *
 * - Origin - The position on the element the dialog is being added to
 * - Overlay - The point on the dialog (overlay) which will be appended to the origin
 * - Offset - By how much the overlay is shifted
 */
export interface DialogPosition {
    originX: 'start' | 'center' | 'end';
    originY: 'top' | 'center' | 'bottom';
    overlayX: 'start' | 'center' | 'end';
    overlayY: 'top' | 'center' | 'bottom';
    offsetX?: number;
    offsetY?: number;
}
