import { BaseUserEventModel } from './base-user-event.model';
import { UserUpdatedPropertyModel } from './user-updated-property.model';
/**
 * This event is triggered whenever the current user is updated through the User service.
 */
export interface UserUpdateEventModel extends BaseUserEventModel {
    /**
     * Array of updated user properties.
     */
    properties: Array<UserUpdatedPropertyModel>;
}
