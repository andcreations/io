import { DirectoryDigest } from './DirectoryDigest';
import { WalkSyncFilter } from './walk';

/** */
export interface TreeChangeTrackerOptions {
  /** */
  filter?: WalkSyncFilter;
}

/** */
export class TreeChangeTracker {
  /** */
  private readonly directoryDigest: DirectoryDigest;

  /** */
  private digest: string;

  /** */
  constructor(
    private readonly dir: string,
    options?: TreeChangeTrackerOptions,
  ) {
    this.directoryDigest = new DirectoryDigest(
      this.dir,
      {
        filter: options?.filter,
      },
    );
    this.digest = this.directoryDigest.generateDigest();
  }

  /** */
  isChanged(): boolean {
    const digest = this.directoryDigest.generateDigest();
    const changed = digest !== this.digest;
    if (changed) {
      this.digest = digest;
    }
    return changed;
  }
}