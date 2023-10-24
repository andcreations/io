/** */
export declare class FileChangeTracker {
    private readonly files;
    /** */
    private readonly entries;
    /** */
    constructor(files: string[]);
    /** */
    isChanged(): boolean;
}
