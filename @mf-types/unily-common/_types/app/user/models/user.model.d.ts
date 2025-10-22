/**
 * A model for a front-end user.
 */
export interface UserModel {
    /**
     * The user's ID.
     */
    id: number;
    /**
     * The user's display name (example: "John Smith").
     */
    displayName: string;
    /**
     * The user's first name.
     */
    firstName: string;
    /**
     * The user's last name.
     */
    lastName: string;
    /**
     * The user's email.
     */
    email: string;
    /**
     * The user's job title.
     */
    jobTitle: string;
    /**
     * Whether the user has administrative rights.
     */
    isAdmin: boolean;
    /**
     * The user's account name.
     */
    accountName: string;
    /**
     * The URL for the user's profile.
     */
    profileUrl: string;
    /**
     * The user's display language.
     */
    displayLanguage: string;
    /**
     * A global CMS key.
     */
    userKey: string;
    /**
     * Whether the user has an Office 365 license.
     */
    hasOffice365License: string;
    /**
     * The current user's session Id
     */
    sessionId: string;
}
