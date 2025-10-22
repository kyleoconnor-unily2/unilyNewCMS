import { AvatarData } from '@mf-types/unily-ui-library/types';
export declare const AvatarStore: import("@angular/core").Type<{
    imageUrl: import("@angular/core").Signal<string | undefined>;
    initials: import("@angular/core").Signal<string | undefined>;
    altText: import("@angular/core").Signal<string | undefined>;
    remoteAvatarServiceReady: import("@angular/core").Signal<boolean>;
    setAvatarData: ({ imageUrl, initials, altText }: AvatarData) => void;
    setAvatarImageUrl: (imageUrl: string) => void;
    setAvatarInitials: (initials: string) => void;
    setAvatarAltText: (altText: string) => void;
} & import("@ngrx/signals").StateSource<{
    imageUrl: string | undefined;
    initials: string | undefined;
    altText: string | undefined;
    remoteAvatarServiceReady: boolean;
}>>;
export type AvatarStoreInstance = InstanceType<typeof AvatarStore>;
