"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeChangeTracker = void 0;
const DirectoryDigest_1 = require("./DirectoryDigest");
/** */
class TreeChangeTracker {
    /** */
    constructor(dir, options) {
        this.dir = dir;
        this.directoryDigest = new DirectoryDigest_1.DirectoryDigest(this.dir, {
            filter: options?.filter,
        });
        this.digest = this.directoryDigest.generateDigest();
    }
    /** */
    isChanged() {
        const digest = this.directoryDigest.generateDigest();
        const changed = digest !== this.digest;
        if (changed) {
            this.digest = digest;
        }
        return changed;
    }
}
exports.TreeChangeTracker = TreeChangeTracker;
