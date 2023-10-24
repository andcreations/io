import { DirectoryDigest } from './DirectoryDigest';

/** */
export interface WatchTreeOptions {
  /** */
  interval?: number;
}

/** */
const DEFAULT_INTERVAL = 2400;
const SKIP_FILE_PREFIXES = ['.', '#'];

/** */
export class WatchTree {
  /** */
  private interval: NodeJS.Timeout;

  /** */
  constructor(
    private readonly dir: string,
    private readonly changed: () => void,
    private readonly options?: WatchTreeOptions,
  ) {}

  /** */
  private generateDigest(): string {
    const directoryDigest = new DirectoryDigest(this.dir, {
      filter: (file) => {
        const skipForPrefix = SKIP_FILE_PREFIXES.some(prefix => {
          return file.startsWith(prefix);
        });
        if (skipForPrefix) {
          return false;
        }
  
        return true;
      }
    });
    return directoryDigest.generateDigest();
  }

  /** */
  watch(): void {
    let digest = this.generateDigest();

  // watch
    this.interval = setInterval(
      () => {
        const newDigest = this.generateDigest();
        if (newDigest !== digest) {
          digest = newDigest;
          this.changed();
        }
      },
      this.options?.interval || DEFAULT_INTERVAL,
    );
  }

  /** */
  unwatch(): void {
    if (this.interval) {
      clearInterval(this.interval);
      delete this.interval;
    }
  }
}
