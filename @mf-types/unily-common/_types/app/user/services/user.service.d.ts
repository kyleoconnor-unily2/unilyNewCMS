import { BaseUserEventModel } from '../models/base-user-event.model';
import { UserModel } from '../models/user.model';
import { UpdateUserModel } from '../models/update-user.model';
import { UpdateUserResultModel } from '../models/update-user-result.model';
export declare class UserService {
    private readonly ts;
    private readonly userService;
    constructor();
    /**
     *  Subscribes to events raised in response to user updates.
     *  The subscription can return any of the following models depending on the event from which they are raised:
     *      - UserUpdateEventModel
     *
     * @param success The callback function to execute on success when a user event takes place.
     * @param error The callback function to execute on error.
     *
     * @returns The event subscription unsubscribe function.The consumer of this event should
     * de-register the event by calling the returned function when the subscription is no longer needed.
     * Failure to do so may result in memory leaks which slow down the SPA performance.
     */
    subscribe(success: (value: BaseUserEventModel) => void, error?: (error: any) => void): Function;
    /**
     * @returns The audiences of the currently logged-in user.
     */
    getCurrentUserAudiences(): Promise<Array<string>>;
    /**
     * @param id The user ID to whom the profile image URL belongs.
     * @returns Resolves to the URL of the user's profile image.
     */
    getProfileImageUrl(id: number): Promise<string>;
    /**
     * Returns a model representing the currently logged-in user.
     *
     * @returns The currently logged-in user.
     */
    getCurrentUser(): Promise<UserModel>;
    /**
     * @returns Resolves to the URL of the placeholder profile image.
     */
    getPlaceholderImageUrl(): Promise<string>;
    /**
     * Updates the currently logged-in user.
     *
     * @param model A model containing the user properties to be updated.
     * @param suppressAnalyticsEvents If true, analytics events will be suppressed.
     *
     * @returns The newly updated currently logged-in user.
     */
    updateUser(model: UpdateUserModel, suppressAnalyticsEvents?: boolean): Promise<UpdateUserResultModel>;
}
