import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CmsNavigationService, NavigationItem } from '../../../services/cms-core/cms-navigation.service';
import { CmsStateService, CmsState } from '../../../services/cms-core/cms-state.service';

@Component({
  selector: 'cms-sidebar',
  templateUrl: './cms-sidebar.component.html',
  styleUrls: ['./cms-sidebar.component.scss']
})
export class CmsSidebarComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  navigationItems: NavigationItem[] = [];
  sidebarCollapsed = false;
  currentUser$: Observable<CmsState>;
  pendingReviews = 0;

  constructor(
    private navigationService: CmsNavigationService,
    private cmsState: CmsStateService,
    private router: Router
  ) {
    this.currentUser$ = this.cmsState.state$;
  }

  ngOnInit(): void {
    this.navigationService.navigationItems$
      .pipe(takeUntil(this.destroy$))
      .subscribe(items => {
        this.navigationItems = this.filterItemsByPermissions(items);
      });

    this.navigationService.sidebarCollapsed$
      .pipe(takeUntil(this.destroy$))
      .subscribe(collapsed => {
        this.sidebarCollapsed = collapsed;
      });

    this.cmsState.state$
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => {
        this.pendingReviews = state.pendingReviews;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleSidebar(): void {
    this.navigationService.toggleSidebar();
  }

  onNavigationClick(item: NavigationItem): void {
    if (this.hasChildren(item)) {
      this.navigationService.toggleSubMenu(item.id);
    } else {
      this.navigationService.setActiveItem(item.id);
      if (item.route) {
        this.router.navigate([item.route]);
      }
    }
  }

  hasChildren(item: NavigationItem): boolean {
    return item.children !== undefined && item.children.length > 0;
  }

  getUserInitials(user: any): string {
    if (!user || !user.name) return '';
    return user.name.split(' ')
      .map((part: string) => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  private filterItemsByPermissions(items: NavigationItem[]): NavigationItem[] {
    return items.filter(item => {
      // If item has permissions, check them
      if (item.permissions && item.permissions.length > 0) {
        if (!this.cmsState.hasAnyPermission(item.permissions)) {
          return false;
        }
      }

      // Filter children recursively
      if (item.children) {
        item.children = this.filterItemsByPermissions(item.children);
      }

      return true;
    });
  }
}