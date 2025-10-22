/**
 * Represents a custom button that can be rendered inside the Search component.
 * Useful for adding actions, filters, or shortcuts alongside the search input.
 */
export interface SearchBarButton {
    /**
     * Text label of the button used for accessibility (`aria-label`).
     */
    title: string;
    /**
     * CSS class of the icon to display for the button.
     * Example: "icomoon-filter". Used when `iconUrl` is not provided.
     * Typically references a font icon.
     */
    icon?: string;
    /**
     * The URL or Base64 string of a custom image to use as the button icon.
     * Takes precedence over `icon` when provided.
     */
    iconUrl?: string;
    /**
     * Callback function executed when the button is clicked.
     * Should contain the logic for the button's action.
     */
    onClick: () => void;
}
