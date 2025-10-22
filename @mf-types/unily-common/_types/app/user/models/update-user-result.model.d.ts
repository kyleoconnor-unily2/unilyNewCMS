import { UserPropertyModel } from './user-property.model';
/**
 * The result of the update user request.
 */
export interface UpdateUserResultModel {
    /**
     * User id.
     */
    id: number;
    /**
     * User unique id in GUID format.
     */
    uniqueId: string;
    /**
     * User name.
     */
    name: string;
    /**
     * User email.
     */
    email: string;
    /**
     * User login name.
     */
    loginName: string;
    /**
     * Last modified date of user.
     */
    lastModifiedDate: string;
    /**
     * Creation date of user.
     */
    createdDate: string;
    /**
     * User type alias.
     */
    userTypeAlias: string;
    /**
     * User properties.
     */
    properties: Array<UserPropertyModel>;
}
