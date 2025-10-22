import { Subscription } from 'rxjs';
export declare class AccessibilityService {
    private readonly mainAriaStatusSubject;
    setAriaLabelOnMain(status?: boolean | null): void;
    subscribeToAriaLabelChangeOnMain(next?: (value: boolean | null) => void, error?: (error: any) => void, complete?: () => void): Subscription;
}
