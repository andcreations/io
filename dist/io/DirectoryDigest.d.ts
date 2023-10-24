import { WalkSyncFilter } from './walk';
/** */
export interface DirectroryDigestOptions {
    /** */
    filter?: WalkSyncFilter;
}
/** */
export declare class DirectoryDigest {
    private readonly dir;
    private readonly options?;
    /** */
    constructor(dir: string, options?: DirectroryDigestOptions);
    /** */
    listFiles(): string[];
    /** */
    private generateDigestFromFiles;
    /** */
    generateDigest(): string;
}
