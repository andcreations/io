import * as fs from 'fs';
import * as path from 'path';

/** */
export type WalkSyncFilter = (
  file: string,
  fullPath: string,
  isDir: boolean,
) => boolean;

/** */
export function walkSync(
  dir: string,
  filter?: WalkSyncFilter,
): string[] {
  const files: string[] = [];
  const dirFiles = fs.readdirSync(dir);
  dirFiles.forEach(dirFile => {
    const fullPath = path.join(dir, dirFile);
    if (fs.lstatSync(fullPath).isDirectory()) {
      if (!filter || filter(dirFile, fullPath, true)) {
        files.push(fullPath);

      // step into the subdirectory
        const subDirFiles = walkSync(fullPath, filter);
        subDirFiles.forEach(subDirFile => files.push(subDirFile));
      }
    }
    else {
      if (!filter || filter(dirFile, fullPath, false)) {
        files.push(fullPath);
      }
    }
  });

  return files;
}