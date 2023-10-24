"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WatchTree = void 0;
const DirectoryDigest_1 = require("./DirectoryDigest");
/** */
const DEFAULT_INTERVAL = 2400;
const SKIP_FILE_PREFIXES = ['.', '#'];
/** */
class WatchTree {
    /** */
    constructor(dir, changed, options) {
        this.dir = dir;
        this.changed = changed;
        this.options = options;
    }
    /** */
    generateDigest() {
        const directoryDigest = new DirectoryDigest_1.DirectoryDigest(this.dir, {
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
    watch() {
        let digest = this.generateDigest();
        // watch
        this.interval = setInterval(() => {
            const newDigest = this.generateDigest();
            if (newDigest !== digest) {
                digest = newDigest;
                this.changed();
            }
        }, this.options?.interval || DEFAULT_INTERVAL);
    }
    /** */
    unwatch() {
        if (this.interval) {
            clearInterval(this.interval);
            delete this.interval;
        }
    }
}
exports.WatchTree = WatchTree;
