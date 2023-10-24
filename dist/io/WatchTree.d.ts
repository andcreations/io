/** */
export interface WatchTreeOptions {
    /** */
    interval?: number;
}
/** */
export declare class WatchTree {
    private readonly dir;
    private readonly changed;
    private readonly options?;
    /** */
    private interval;
    /** */
    constructor(dir: string, changed: () => void, options?: WatchTreeOptions);
    /** */
    private generateDigest;
    /** */
    watch(): void;
    /** */
    unwatch(): void;
}
