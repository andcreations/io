"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectoryDigest = void 0;
const fs = __importStar(require("fs"));
const crypto = __importStar(require("crypto"));
const walk_1 = require("./walk");
/** */
class DirectoryDigest {
    /** */
    constructor(dir, options) {
        this.dir = dir;
        this.options = options;
    }
    /** */
    listFiles() {
        // list
        const files = (0, walk_1.walkSync)(this.dir, this.options?.filter);
        // sort
        files.sort((a, b) => a.localeCompare(b));
        return files;
    }
    /** */
    generateDigestFromFiles(files) {
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
    generateDigest() {
        const files = this.listFiles();
        return this.generateDigestFromFiles(files);
    }
}
exports.DirectoryDigest = DirectoryDigest;
