import { UserPropertyModel } from './user-property.model';
/**
 * Model to update user.
 */
export interface UpdateUserModel {
    /**
     * User unique id in GUID format.
     */
    readonly uniqueId?: string;
    /**
     * User email.
     */
    readonly email: string;
    /**
     * User name.
     */
    readonly name: string;
    /**
     * User properties.
     */
    readonly properties: Array<UserPropertyModel>;
}
