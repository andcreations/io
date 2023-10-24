import { WalkSyncFilter } from './walk';
/** */
export interface TreeChangeTrackerOptions {
    /** */
    filter?: WalkSyncFilter;
}
/** */
export declare class TreeChangeTracker {
    private readonly dir;
    /** */
    private readonly directoryDigest;
    /** */
    private digest;
    /** */
    constructor(dir: string, options?: TreeChangeTrackerOptions);
    /** */
    isChanged(): boolean;
}
