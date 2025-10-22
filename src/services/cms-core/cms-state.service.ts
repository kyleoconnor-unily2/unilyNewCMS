import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  location: string;
  timezone?: string;
  avatar?: string;
  lastLogin?: Date;
  status: 'active' | 'inactive';
  permissions: string[];
}

export interface CmsState {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  pendingReviews: number;
  notifications: number;
}

@Injectable({
  providedIn: 'root'
})
export class CmsStateService {
  private stateSubject = new BehaviorSubject<CmsState>({
    currentUser: {
      id: 1,
      name: 'Kyle Anderson',
      email: 'kyle.anderson@company.com',
      role: 'CMS Administrator',
      location: 'London, UK',
      timezone: 'GMT+0',
      lastLogin: new Date(),
      status: 'active',
      permissions: ['*'] // Admin has all permissions
    },
    loading: false,
    error: null,
    pendingReviews: 8,
    notifications: 3
  });

  state$ = this.stateSubject.asObservable();

  get currentState(): CmsState {
    return this.stateSubject.value;
  }

  get currentUser(): User | null {
    return this.currentState.currentUser;
  }

  get pendingReviews(): number {
    return this.currentState.pendingReviews;
  }

  get notifications(): number {
    return this.currentState.notifications;
  }

  setLoading(loading: boolean): void {
    this.updateState({ loading });
  }

  setError(error: string | null): void {
    this.updateState({ error });
  }

  setCurrentUser(user: User | null): void {
    this.updateState({ currentUser: user });
  }

  setPendingReviews(count: number): void {
    this.updateState({ pendingReviews: count });
  }

  setNotifications(count: number): void {
    this.updateState({ notifications: count });
  }

  getUserInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('');
  }

  hasPermission(permission: string): boolean {
    const user = this.currentUser;
    if (!user) return false;
    
    // Admin wildcard permission
    if (user.permissions.includes('*')) return true;
    
    // Check specific permission
    return user.permissions.includes(permission);
  }

  hasAnyPermission(permissions: string[]): boolean {
    return permissions.some(permission => this.hasPermission(permission));
  }

  private updateState(partial: Partial<CmsState>): void {
    const currentState = this.stateSubject.value;
    this.stateSubject.next({ ...currentState, ...partial });
  }
}