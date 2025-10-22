import { DialogV2Presets } from './dialog-presets-v2.enum';
/**
 * Converts DialogPresets flags to corresponding CSS class names.
 * Uses bitwise operations to handle flag combinations efficiently.
 *
 * @param presets - The DialogPresets flags to convert (can be combined with bitwise OR)
 * @returns A space-separated string of CSS class names, empty string if no valid presets
 *
 * @example
 * ```typescript
 * getPresetClasses(DialogPresets.NARROW | DialogPresets.OVERFLOW)
 * // Returns: "udl-modal--narrow udl-modal--overflow"
 *
 * getPresetClasses(DialogPresets.NONE)
 * // Returns: ""
 * ```
 */
export declare function getPresetClasses(presets: DialogV2Presets | undefined): string;
