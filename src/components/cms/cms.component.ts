import { Component, OnInit, ViewEncapsulation } from '@angular/core';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  active?: boolean;
  expanded?: boolean;
  children?: MenuItem[];
}

interface ForexRate {
  pair: string;
  rate: number;
  change: number;
  changePercent: number;
}

@Component({
  selector: 'app-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: false
})
export class CmsComponent implements OnInit {
  
  showLanguagePopup = false;
  languages = [
    { name: 'English', native: 'English', flags: ['flag-us', 'flag-gb'] },
    { name: 'Spanish', native: 'Español', flags: ['flag-es', 'flag-mx'] },
    { name: 'French', native: 'Français', flags: ['flag-fr', 'flag-ca'] },
    { name: 'German', native: 'Deutsch', flags: ['flag-de', 'flag-at'] },
    { name: 'Mandarin', native: '中文', flags: ['flag-cn', 'flag-tw'] },
    { name: 'Arabic', native: 'العربية', flags: ['flag-sa', 'flag-eg'] }
  ];
    // Removed duplicate selectedLanguage and selectLanguage
  
    // Only one selectedLanguage and selectLanguage should exist

  // getFlagClass removed, now handled by flags array in languages
  selectedLanguage = 'English';

  selectLanguage(lang: { name: string; flags: string[] }) {
    this.selectedLanguage = lang.name;
    this.showLanguagePopup = false;
    // TODO: Add translation logic here
    // For now, just log the selected language
    console.log('Selected language:', lang.name);
  }
  activeSection = 'dashboard';
  isDarkMode = true; // Default to dark mode
  userOnlineStatus = true; // Track user online status
  accessibilityMode = false; // Track accessibility mode
  
  // Forex widget properties
  forexRates: ForexRate[] = [
    { pair: 'EUR/USD', rate: 1.0850, change: 0.0025, changePercent: 0.23 },
    { pair: 'GBP/USD', rate: 1.2630, change: -0.0045, changePercent: -0.35 },
    { pair: 'USD/JPY', rate: 149.85, change: 0.75, changePercent: 0.50 },
    { pair: 'USD/CAD', rate: 1.3720, change: -0.0020, changePercent: -0.15 }
  ];
  forexUpdateTime = new Date();
  
  menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'dashboard',
      active: true
    },
    {
      id: 'content',
      label: 'Content Management',
      icon: 'article',
      expanded: false,
      children: [
        { 
          id: 'posts', 
          label: 'Posts', 
          icon: 'description',
          children: [
            { id: 'create-post', label: 'Create New Post', icon: 'add_circle' },
            { id: 'all-posts', label: 'All Posts', icon: 'list' },
            { id: 'draft-posts', label: 'Draft Posts', icon: 'edit_note' },
            { id: 'published-posts', label: 'Published Posts', icon: 'publish' }
          ]
        },
        { 
          id: 'pages', 
          label: 'Pages', 
          icon: 'web',
          children: [
            { id: 'create-page', label: 'Create New Page', icon: 'add_circle' },
            { id: 'existing-pages', label: 'Existing Pages', icon: 'list' },
            { id: 'page-templates', label: 'Page Templates', icon: 'view_quilt' },
            { id: 'landing-pages', label: 'Landing Pages', icon: 'flight_land' }
          ]
        },
        { 
          id: 'categories', 
          label: 'Categories', 
          icon: 'category',
          children: [
            { id: 'create-category', label: 'Create New Category', icon: 'add_circle' },
            { id: 'manage-categories', label: 'Manage Categories', icon: 'category' },
            { id: 'category-hierarchy', label: 'Category Hierarchy', icon: 'account_tree' }
          ]
        },
        { 
          id: 'tags', 
          label: 'Tags', 
          icon: 'local_offer',
          children: [
            { id: 'create-tag', label: 'Create New Tag', icon: 'add_circle' },
            { id: 'manage-tags', label: 'Manage Tags', icon: 'local_offer' },
            { id: 'tag-analytics', label: 'Tag Analytics', icon: 'analytics' }
          ]
        },
        { 
          id: 'content-store', 
          label: 'Content Store', 
          icon: 'inventory_2',
          children: [
            { id: 'browse-content', label: 'Browse Content', icon: 'search' },
            { id: 'featured-content', label: 'Featured Content', icon: 'star' },
            { id: 'content-collections', label: 'Content Collections', icon: 'collections' }
          ]
        },
        { 
          id: 'apps-tools', 
          label: 'Apps and Tools', 
          icon: 'apps',
          children: [
            { id: 'app-gallery', label: 'App Gallery', icon: 'apps' },
            { id: 'custom-tools', label: 'Custom Tools', icon: 'build' },
            { id: 'integrations', label: 'Integrations', icon: 'extension' }
          ]
        },
        { 
          id: 'announcements', 
          label: 'Announcements', 
          icon: 'campaign',
          children: [
            { id: 'create-announcement', label: 'Create New Announcement', icon: 'add_circle' },
            { id: 'active-announcements', label: 'Active Announcements', icon: 'notifications_active' },
            { id: 'scheduled-announcements', label: 'Scheduled Announcements', icon: 'schedule' },
            { id: 'announcement-analytics', label: 'Announcement Analytics', icon: 'analytics' }
          ]
        },
        { id: 'essential-links', label: 'Essential Links', icon: 'link' },
        { 
          id: 'events', 
          label: 'Events', 
          icon: 'event',
          children: [
            { id: 'create-event', label: 'Create New Event', icon: 'add_circle' },
            { id: 'upcoming-events', label: 'Upcoming Events', icon: 'event' },
            { id: 'past-events', label: 'Past Events', icon: 'history' },
            { id: 'event-calendar', label: 'Event Calendar', icon: 'calendar_month' }
          ]
        },
        { 
          id: 'news', 
          label: 'News', 
          icon: 'newspaper',
          children: [
            { id: 'create-news', label: 'Create News Article', icon: 'add_circle' },
            { id: 'published-news', label: 'Published News', icon: 'newspaper' },
            { id: 'news-drafts', label: 'News Drafts', icon: 'edit_note' },
            { id: 'news-archive', label: 'News Archive', icon: 'archive' }
          ]
        },
        { id: 'videos-content', label: 'Videos', icon: 'video_library' },
        { id: 'insights', label: 'Insights', icon: 'insights' },
        { id: 'workspaces', label: 'Workspaces', icon: 'workspaces' },
        { id: 'locations', label: 'Locations', icon: 'location_on' },
        { id: 'homepage-targeting', label: 'Homepage Targeting Rules', icon: 'rule' },
        { id: 'social-channels', label: 'Social Channels', icon: 'share' },
        { id: 'link-repository', label: 'Link Repository', icon: 'folder_shared' }
      ]
    },
    {
      id: 'users',
      label: 'User Management',
      icon: 'people',
      expanded: false,
      children: [
        { id: 'all-users', label: 'All Users', icon: 'person' },
        { id: 'roles', label: 'Roles & Permissions', icon: 'security' },
        { id: 'user-groups', label: 'User Groups', icon: 'group' },
        { id: 'recognition', label: 'Recognition', icon: 'emoji_events' },
        { id: 'awards', label: 'Awards', icon: 'workspace_premium' },
        { id: 'nominations', label: 'Nominations', icon: 'how_to_vote' },
        { id: 'leaderboard', label: 'Leaderboard', icon: 'leaderboard' }
      ]
    },
    {
      id: 'media',
      label: 'Media Library',
      icon: 'perm_media',
      expanded: false,
      children: [
        { id: 'images', label: 'Images', icon: 'image' },
        { id: 'videos', label: 'Videos', icon: 'videocam' },
        { id: 'documents', label: 'Documents', icon: 'description' },
        { id: 'document-library', label: 'Document Library', icon: 'folder' },
        { id: 'shared-documents', label: 'Shared Documents', icon: 'folder_shared' },
        { id: 'recent-uploads', label: 'Recent Uploads', icon: 'upload' },
        { id: 'archived', label: 'Archived', icon: 'archive' }
      ]
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: 'analytics',
      expanded: false,
      children: [
        { id: 'overview', label: 'Overview', icon: 'insights' },
        { id: 'traffic', label: 'Traffic', icon: 'trending_up' },
        { id: 'reports', label: 'Reports', icon: 'assessment' },
        { id: 'reporting', label: 'Reporting', icon: 'bar_chart' },
        { id: 'feature-store', label: 'Feature Store', icon: 'store' },
        { id: 'broadcast-center', label: 'Broadcast Center', icon: 'broadcast_on_home' }
      ]
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'settings',
      expanded: false,
      children: [
        { id: 'general', label: 'General', icon: 'tune' },
        { id: 'security', label: 'Security', icon: 'shield' },
        { id: 'integrations', label: 'Integrations', icon: 'extension' },
        { id: 'backup', label: 'Backup', icon: 'backup' },
        { id: 'configuration', label: 'Configuration', icon: 'build_circle' },
        { id: 'system', label: 'System', icon: 'computer' },
        { id: 'mandatory-content', label: 'Mandatory Content Reads', icon: 'priority_high' },
        { id: 'managed-metadata', label: 'Managed Metadata', icon: 'schema' },
        { id: 'sites', label: 'Sites', icon: 'language' },
        { id: 'planning', label: 'Planning', icon: 'event_note' },
        { id: 'targeting', label: 'Targeting', icon: 'my_location' },
        { id: 'journeys', label: 'Journeys', icon: 'route' }
      ]
    }
  ];

  constructor() {}

  ngOnInit(): void {
    console.log('CMS Component initialized with interactive menu');
    console.log('Initial theme state - isDarkMode:', this.isDarkMode);
    
    // Update forex rates every 5 seconds
    setInterval(() => {
      this.updateForexRates();
    }, 5000);
  }

  toggleMenuItem(item: MenuItem): void {
    if (item.children && item.children.length > 0) {
      item.expanded = !item.expanded;
      
      // Close other expanded items
      this.menuItems.forEach(menuItem => {
        if (menuItem.id !== item.id && menuItem.children) {
          menuItem.expanded = false;
        }
      });
    } else {
      this.setActiveItem(item.id);
    }
  }

  setActiveItem(itemId: string): void {
    // Remove active state from all items
    this.menuItems.forEach(item => {
      item.active = false;
      if (item.children) {
        item.children.forEach(child => child.active = false);
      }
    });

    // Set active state for selected item
    this.menuItems.forEach(item => {
      if (item.id === itemId) {
        item.active = true;
        this.activeSection = itemId;
      } else if (item.children) {
        const child = item.children.find(c => c.id === itemId);
        if (child) {
          child.active = true;
          item.expanded = true;
          this.activeSection = itemId;
        }
      }
    });
  }

  setActiveSubItem(parentItem: MenuItem, subItem: MenuItem): void {
    // Remove active state from all items
    this.menuItems.forEach(item => {
      item.active = false;
      if (item.children) {
        item.children.forEach(child => {
          child.active = false;
          if (child.children) {
            child.children.forEach(grandChild => grandChild.active = false);
          }
        });
      }
    });

    // Set active state for selected sub-item
    subItem.active = true;
    this.activeSection = subItem.id;
  }

  toggleSubMenuItem(parentItem: MenuItem, subItem: MenuItem): void {
    if (subItem.children && subItem.children.length > 0) {
      subItem.expanded = !subItem.expanded;
    } else {
      this.setActiveSubItem(parentItem, subItem);
    }
  }

  setActiveSubSubItem(parentItem: MenuItem, subItem: MenuItem, subSubItem: MenuItem): void {
    // Remove active state from all items
    this.menuItems.forEach(item => {
      item.active = false;
      if (item.children) {
        item.children.forEach(child => {
          child.active = false;
          if (child.children) {
            child.children.forEach(grandChild => grandChild.active = false);
          }
        });
      }
    });

    // Set active state for selected sub-sub-item
    subSubItem.active = true;
    this.activeSection = subSubItem.id;
  }

  isItemActive(item: MenuItem): boolean {
    return item.active || (item.children && item.children.some(child => child.active)) || false;
  }

  hasActiveChildren(item: MenuItem): boolean {
    return item.children ? item.children.some(child => child.active) : false;
  }

  getActiveTitle(): string {
    // Find the active main menu item
    const activeMainItem = this.menuItems.find(item => 
      item.active || (item.children && item.children.some(child => child.active))
    );
    
    if (activeMainItem && activeMainItem.children) {
      // Find the active sub-item
      const activeSubItem = activeMainItem.children.find(child => child.active);
      if (activeSubItem) {
        return activeSubItem.label;
      }
    }
    
    // If no sub-item is active, return the main item label
    return activeMainItem ? activeMainItem.label : 'Dashboard';
  }

  getTimeOfDay(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Morning';
    if (hour < 17) return 'Afternoon';
    return 'Evening';
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    console.log('Theme toggled to:', this.isDarkMode ? 'Dark' : 'Light');
  }

  toggleUserStatus(): void {
    this.userOnlineStatus = !this.userOnlineStatus;
    console.log('User status toggled to:', this.userOnlineStatus ? 'Online' : 'Offline');
  }

  toggleAccessibility(): void {
    this.accessibilityMode = !this.accessibilityMode;
    console.log('Accessibility mode toggled to:', this.accessibilityMode ? 'Enabled' : 'Disabled');
  }

  // Forex widget methods
  updateForexRates(): void {
    // Simulate live data updates with small random changes
    this.forexRates = this.forexRates.map(rate => {
      const change = (Math.random() - 0.5) * 0.01; // Random change between -0.005 and 0.005
      const newRate = parseFloat((rate.rate + change).toFixed(4));
      const changePercent = parseFloat(((change / rate.rate) * 100).toFixed(2));
      
      return {
        ...rate,
        rate: newRate,
        change: parseFloat(change.toFixed(4)),
        changePercent: changePercent
      };
    });
    this.forexUpdateTime = new Date();
  }
}