import * as fs from 'fs';
import * as crypto from 'crypto';

/** */
export class FileDigest {
  /** */
  constructor(private readonly file: string) {
  }

  /** */
  generateDigest(): string {
    const hash = crypto.createHash('md5');

  // read & update
    const content = fs.readFileSync(this.file);
    hash.update(content);

    return hash.digest('hex');
  }
}