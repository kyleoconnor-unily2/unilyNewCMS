/**
 * Model describing updated user property.
 */
export interface UserUpdatedPropertyModel {
    /**
     * User property alias.
     */
    readonly alias: string;
    /**
     * Property value before update.
     */
    readonly oldValue: string;
    /**
     * Property value after update.
     */
    readonly newValue: string;
}
