/**
 * Avatar data structure returned by the AvatarService.
 * Contains all necessary information to display a user avatar with progressive fallback options.
 */
export interface AvatarData {
    /**
     * URL of the user's profile image.
     * When provided, this will be the primary avatar display.
     * If the image fails to load, the component will fall back to initials or default icon.
     */
    imageUrl?: string;
    /**
     * Fallback/placeholder image URL used when the primary image fails to load.
     * Typically a generic placeholder or default avatar image provided by the system.
     */
    fallbackUrl?: string;
    /**
     * User's initials (1-3 characters) displayed when both imageUrl and fallbackUrl are unavailable.
     * Usually generated from the user's first and last name (e.g., "John Doe" → "JD").
     * Automatically styled as uppercase in the UI component.
     */
    initials?: string;
    /**
     * Accessible alternative text for screen readers and assistive technologies.
     * Should describe the user or purpose of the avatar (e.g., "John Doe avatar").
     * Used to ensure the component meets accessibility standards (WCAG).
     */
    altText?: string;
}
