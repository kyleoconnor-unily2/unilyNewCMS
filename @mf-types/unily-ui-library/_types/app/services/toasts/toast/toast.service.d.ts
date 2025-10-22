import { ToastModel } from './toast.model';
/**
 * The Toast service.
 */
export declare class ToastService {
    private readonly toastService;
    constructor(toastService: any);
    /**
     * Push a success toast with the supplied model.
     */
    success(toast: ToastModel): void;
    /**
     * Push an error toast with the supplied model.
     */
    error(toast: ToastModel): void;
    /**
     * Push an information toast with the supplied model.
     */
    info(toast: ToastModel): void;
    /**
     * Push a warning toast with the supplied model.
     */
    warning(toast: ToastModel): void;
}
