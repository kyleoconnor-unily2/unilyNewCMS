import { Observable } from 'rxjs';
import { AvatarData } from './interfaces/avatar-data.interface';
/**
 * UDL Avatar Service
 *
 * Fetches user avatar data from remote UserService via module federation.
 * Provides fallback mechanisms when services are unavailable.
 *
 * @example
 * ```typescript
 * constructor(private avatarService: AvatarService) {}
 *
 * ngOnInit() {
 *   this.avatarService.getCurrentUserAvatar().subscribe(data => {
 *     this.avatarData = data;
 *   });
 * }
 * ```
 */
export declare class AvatarService {
    /**
     * Remote UserService instance loaded via module federation.
     */
    private userService;
    /**
     * Remote TermsService instance loaded via module federation.
     */
    private termsService;
    /**
     * Emits services readiness state. Uses ReplaySubject to ensure late subscribers
     * receive the last emitted value even if they subscribe after initialization.
     */
    private readonly servicesReady$;
    /**
     * Flag to track if services initialization has been started
     */
    private initializationStarted;
    /**
     * Loads UserService and TermsService from remote unily-common module.
     * Now public to allow external initialization if needed.
     */
    /**
     * Gets avatar data for current user including image URL, initials, and alt text.
     * Returns fallback data if services unavailable.
     * Triggers service initialization if not already started.
     *
     * @returns Observable<AvatarData> - Stream of avatar data
     */
    getCurrentUserAvatar(): Observable<AvatarData>;
    private initializeServices;
    /**
     * Generates initials from first and last name.
     */
    private generateInitials;
    /**
     * Creates localized alt text for accessibility using TermsService.
     * Falls back to simple concatenation if terms are unavailable.
     */
    private getLocalizedAltText;
    /**
     * Creates fallback alt text when localization is unavailable.
     */
    private getFallbackAltText;
    /**
     * Fallback data when services unavailable.
     */
    private getFallbackAvatarData;
}
