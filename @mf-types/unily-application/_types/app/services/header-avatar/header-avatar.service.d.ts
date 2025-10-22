export declare class HeaderAvatarService {
    private readonly avatarStore;
    setImageUrl(imageUrl: string): void;
    setInitials(initials: string): void;
    setAltText(altText: string): void;
    handleAvatarClick(event: Event): void;
    handleAvatarImageLoaded(): void;
}
