import { Injectable, NgZone } from '@angular/core';

declare global {
  interface Window {
    pendingEvents?: CustomEvent[];
    isAngularReady?: boolean;
  }
}

@Injectable({
  providedIn: 'root'
})
export class FederatedEventService {

  constructor(private ngZone: NgZone) {
    // Automatically start listening for events when the service is instantiated
    this.listenToFederatedEvent();
    
    // Optionally, handle any pending events if they've been fired before the service was initialized
    this.processPendingEvents();

    // Set a global flag to indicate Angular is ready to handle events
    window.isAngularReady = true;
  }

  private listenToFederatedEvent(): void {
    const eventHandler = (event: CustomEvent) => {
      // Ensure Angular's change detection runs properly
      this.ngZone.run(() => this.handleFederatedEvent(event));
    };

    // Listen for the 'federatedEvent' globally
    window.addEventListener('federatedEvent', eventHandler as EventListener);
  }

  private processPendingEvents(): void {
    if (window.pendingEvents && window.pendingEvents.length > 0) {
      // Handle any events that were fired before the service was ready
      window.pendingEvents.forEach((event) => this.handleFederatedEvent(event));
      // Clear the pending events after processing
      window.pendingEvents = [];
    }
  }

  handleFederatedEvent(event: CustomEvent): void {
    console.log('Event data from AngularJS:', event.detail.data);
    // Add additional handling logic here if necessary
  }
}
