import { AnalyticsEventModel } from './models/analytics-event.model';
import { PageImpressionModel } from './models/page-impression.model';
/**
 * The Analytics service
 */
export declare class AnalyticsService {
    private readonly analyticsService;
    constructor(analyticsService: any);
    /**
     * Record an analytics event with the supplied model.
     * @param analyticsEvent The analytics event data to record.
     */
    recordEvent(analyticsEvent: AnalyticsEventModel): Promise<void>;
    /**
     * Record a page impression with the supplied model.
     * @param pageImpression The page impression data to record.
     */
    recordPageImpression(pageImpression: PageImpressionModel): Promise<void>;
}
