import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CmsNavigationService } from '../../../services/cms-core/cms-navigation.service';
import { CmsStateService, CmsState } from '../../../services/cms-core/cms-state.service';

@Component({
  selector: 'cms-header',
  templateUrl: './cms-header.component.html',
  styleUrls: ['./cms-header.component.scss']
})
export class CmsHeaderComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  currentPageTitle = 'Dashboard';
  currentUser$: Observable<CmsState>;
  pendingReviews = 0;

  constructor(
    private navigationService: CmsNavigationService,
    private cmsState: CmsStateService
  ) {
    this.currentUser$ = this.cmsState.state$;
  }

  ngOnInit(): void {
    // Watch for active navigation changes to update page title
    this.navigationService.navigationItems$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const activeItem = this.navigationService.getActiveItem();
        this.currentPageTitle = activeItem?.label || 'Dashboard';
      });

    // Watch for pending reviews count
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

  onNewContentClick(): void {
    // Navigate to content creation or emit event
    console.log('Navigate to new content creation');
  }

  onNotificationsClick(): void {
    // Open notifications panel or navigate to notifications
    console.log('Open notifications panel');
  }

  onUserMenuClick(): void {
    // Open user menu dropdown
    console.log('Open user menu');
  }

  getUserInitials(user: any): string {
    if (!user || !user.name) return '';
    return user.name.split(' ')
      .map((part: string) => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  getFirstName(user: any): string {
    if (!user || !user.name) return 'User';
    return user.name.split(' ')[0];
  }
}