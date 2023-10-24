import * as fs from 'fs';
import * as crypto from 'crypto';

import { walkSync, WalkSyncFilter } from './walk';

/** */
export interface DirectroryDigestOptions {
  /** */
  filter?: WalkSyncFilter;
}

/** */
export class DirectoryDigest {
  /** */
  constructor(
    private readonly dir: string,
    private readonly options?: DirectroryDigestOptions,
  ) {}

  /** */
  listFiles(): string[] {
  // list
    const files = walkSync(this.dir, this.options?.filter);

  // sort
    files.sort((a,b) => a.localeCompare(b));
    return files;
  }

  /** */
  private generateDigestFromFiles(files: string[]): string {
    const hash = crypto.createHash('md5');

  // paths
    for (const file of files) {
      hash.update(file);
    }

  // content
    for (const file of files) {
      if (fs.lstatSync(file).isDirectory()) {
        continue;
      }
      if (!fs.existsSync(file)) {
        continue;
      }
      const content = fs.readFileSync(file);
      hash.update(content);
    }

    return hash.digest('hex');
  }

  /** */
  generateDigest(): string {
    const files = this.listFiles();
    return this.generateDigestFromFiles(files);
  }
}