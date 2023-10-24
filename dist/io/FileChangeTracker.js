"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileChangeTracker = void 0;
const FileDigest_1 = require("./FileDigest");
/** */
class FileChangeTracker {
    /** */
    constructor(files) {
        this.files = files;
        /** */
        this.entries = [];
        for (const file of this.files) {
            const fileDigest = new FileDigest_1.FileDigest(file);
            const entry = {
                fileDigest,
                digest: fileDigest.generateDigest()
            };
            this.entries.push(entry);
        }
    }
    /** */
    isChanged() {
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
exports.FileChangeTracker = FileChangeTracker;
