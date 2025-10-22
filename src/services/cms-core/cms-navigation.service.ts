import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface NavigationItem {
  id: string;
  icon: string;
  label: string;
  route?: string;
  active: boolean;
  expanded?: boolean;
  children?: NavigationItem[];
  permissions?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class CmsNavigationService {
  private sidebarCollapsedSubject = new BehaviorSubject<boolean>(false);
  private navigationItemsSubject = new BehaviorSubject<NavigationItem[]>([
    { 
      id: 'dashboard', 
      icon: 'dashboard', 
      label: 'Dashboard', 
      route: '/cms/dashboard',
      active: true 
    },
    { 
      id: 'content', 
      icon: 'article', 
      label: 'Content Management', 
      route: '/cms/content',
      active: false, 
      expanded: false,
      children: [
        { id: 'content-articles', icon: 'article', label: 'Articles', route: '/cms/content/articles', active: false },
        { id: 'content-pages', icon: 'description', label: 'Pages', route: '/cms/content/pages', active: false },
        { id: 'content-blog', icon: 'rss_feed', label: 'Blog Posts', route: '/cms/content/blog', active: false },
        { id: 'content-drafts', icon: 'edit_note', label: 'Drafts', route: '/cms/content/drafts', active: false },
        { id: 'content-templates', icon: 'layers', label: 'Templates', route: '/cms/content/templates', active: false },
        { id: 'content-categories', icon: 'category', label: 'Categories', route: '/cms/content/categories', active: false }
      ]
    },
    { 
      id: 'users', 
      icon: 'people', 
      label: 'User Management', 
      route: '/cms/users',
      active: false,
      expanded: false,
      permissions: ['users.read'],
      children: [
        { id: 'users-all', icon: 'people', label: 'All Users', route: '/cms/users/all', active: false },
        { id: 'users-admins', icon: 'admin_panel_settings', label: 'Administrators', route: '/cms/users/admins', active: false },
        { id: 'users-editors', icon: 'edit', label: 'Content Editors', route: '/cms/users/editors', active: false },
        { id: 'users-reviewers', icon: 'rate_review', label: 'Reviewers', route: '/cms/users/reviewers', active: false },
        { id: 'users-roles', icon: 'assignment_ind', label: 'Roles & Permissions', route: '/cms/users/roles', active: false, permissions: ['users.manage_roles'] }
      ]
    },
    { 
      id: 'media', 
      icon: 'perm_media', 
      label: 'Media Library', 
      route: '/cms/media',
      active: false,
      expanded: false,
      children: [
        { id: 'media-images', icon: 'image', label: 'Images', route: '/cms/media/images', active: false },
        { id: 'media-videos', icon: 'video_library', label: 'Videos', route: '/cms/media/videos', active: false },
        { id: 'media-documents', icon: 'description', label: 'Documents', route: '/cms/media/documents', active: false },
        { id: 'media-upload', icon: 'cloud_upload', label: 'Upload Files', route: '/cms/media/upload', active: false },
        { id: 'media-collections', icon: 'collections', label: 'Collections', route: '/cms/media/collections', active: false }
      ]
    },
    { 
      id: 'analytics', 
      icon: 'analytics', 
      label: 'Analytics', 
      route: '/cms/analytics',
      active: false,
      expanded: false,
      permissions: ['analytics.read'],
      children: [
        { id: 'analytics-overview', icon: 'dashboard', label: 'Overview', route: '/cms/analytics/overview', active: false },
        { id: 'analytics-traffic', icon: 'trending_up', label: 'Traffic', route: '/cms/analytics/traffic', active: false },
        { id: 'analytics-content', icon: 'bar_chart', label: 'Content Performance', route: '/cms/analytics/content', active: false },
        { id: 'analytics-users', icon: 'people_outline', label: 'User Analytics', route: '/cms/analytics/users', active: false },
        { id: 'analytics-reports', icon: 'assessment', label: 'Custom Reports', route: '/cms/analytics/reports', active: false }
      ]
    },
    { 
      id: 'settings', 
      icon: 'settings', 
      label: 'Settings', 
      route: '/cms/settings',
      active: false,
      expanded: false,
      permissions: ['settings.read'],
      children: [
        { id: 'settings-general', icon: 'tune', label: 'General Settings', route: '/cms/settings/general', active: false },
        { id: 'settings-security', icon: 'security', label: 'Security', route: '/cms/settings/security', active: false, permissions: ['settings.security'] },
        { id: 'settings-notifications', icon: 'notifications', label: 'Notifications', route: '/cms/settings/notifications', active: false },
        { id: 'settings-integrations', icon: 'extension', label: 'Integrations', route: '/cms/settings/integrations', active: false },
        { id: 'settings-backup', icon: 'backup', label: 'Backup & Restore', route: '/cms/settings/backup', active: false, permissions: ['settings.backup'] },
        { id: 'settings-appearance', icon: 'palette', label: 'Appearance', route: '/cms/settings/appearance', active: false }
      ]
    }
  ]);

  sidebarCollapsed$ = this.sidebarCollapsedSubject.asObservable();
  navigationItems$ = this.navigationItemsSubject.asObservable();

  get isSidebarCollapsed(): boolean {
    return this.sidebarCollapsedSubject.value;
  }

  get navigationItems(): NavigationItem[] {
    return this.navigationItemsSubject.value;
  }

  toggleSidebar(): void {
    this.sidebarCollapsedSubject.next(!this.sidebarCollapsedSubject.value);
  }

  setSidebarCollapsed(collapsed: boolean): void {
    this.sidebarCollapsedSubject.next(collapsed);
  }

  setActiveItem(itemId: string): void {
    const items = [...this.navigationItems];
    this.resetActiveStates(items);
    this.setActiveRecursive(items, itemId);
    this.navigationItemsSubject.next(items);
  }

  toggleSubMenu(itemId: string): void {
    const items = [...this.navigationItems];
    const item = this.findItemById(items, itemId);
    if (item && item.children && item.children.length > 0) {
      item.expanded = !item.expanded;
      this.navigationItemsSubject.next(items);
    }
  }

  getActiveItem(): NavigationItem | undefined {
    return this.findActiveItem(this.navigationItems);
  }

  private resetActiveStates(items: NavigationItem[]): void {
    items.forEach(item => {
      item.active = false;
      if (item.children) {
        this.resetActiveStates(item.children);
      }
    });
  }

  private setActiveRecursive(items: NavigationItem[], itemId: string): boolean {
    for (const item of items) {
      if (item.id === itemId) {
        item.active = true;
        return true;
      }
      
      if (item.children) {
        const found = this.setActiveRecursive(item.children, itemId);
        if (found) {
          item.expanded = true;
          return true;
        }
      }
    }
    return false;
  }

  private findItemById(items: NavigationItem[], itemId: string): NavigationItem | undefined {
    for (const item of items) {
      if (item.id === itemId) {
        return item;
      }
      if (item.children) {
        const found = this.findItemById(item.children, itemId);
        if (found) return found;
      }
    }
    return undefined;
  }

  private findActiveItem(items: NavigationItem[]): NavigationItem | undefined {
    for (const item of items) {
      if (item.active) {
        return item;
      }
      if (item.children) {
        const activeChild = this.findActiveItem(item.children);
        if (activeChild) {
          return activeChild;
        }
      }
    }
    return undefined;
  }
}