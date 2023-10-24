import { FileDigest } from './FileDigest';

/** */
interface FileEntry {
  /** */
  fileDigest: FileDigest;

  /** */
  digest: string;
}

/** */
export class FileChangeTracker {
  /** */
  private readonly entries: FileEntry[] = [];

  /** */
  constructor(private readonly files: string[]) {
    for (const file of this.files) {
      const fileDigest = new FileDigest(file);
      const entry: FileEntry = {
        fileDigest,
        digest: fileDigest.generateDigest()
      };
      this.entries.push(entry);
    }
  }

  /** */
  isChanged(): boolean {
    let changed = false;

  // for each entry
    for (const entry of this.entries) {
      const entryDigest = entry.fileDigest.generateDigest();
      const entryChanged = entryDigest !== entry.digest;
      if (entryChanged) {
        entry.digest = entryDigest;
        changed = true;
      }
    }

    return changed;
  }
}