/**
 * DialogPosition defines the possible positions for the dialog relative to its trigger element.
 *
 * - Origin - The position on the element the dialog is being added to
 * - Overlay - The point on the dialog (overlay) which will be appended to the origin
 * - Offset - By how much the overlay is shifted
 */
export interface DialogPosition {
    /**
     * The position of the origin element in the x-axis
     */
    originX: 'start' | 'center' | 'end';
    /**
     * The position of the origin element in the y-axis
     */
    originY: 'top' | 'center' | 'bottom';
    /**
     * The overlay position that is anchored to the origin element in the x-axis
     */
    overlayX: 'start' | 'center' | 'end';
    /**
     * The overlay position that is anchored to the origin element in the y-axis
     */
    overlayY: 'top' | 'center' | 'bottom';
    /**
     * By how much should the overlay be offset in the x-axis.
     */
    offsetX?: number;
    /**
     * By how much should the overlay be offset in the y-axis.
     */
    offsetY?: number;
}
