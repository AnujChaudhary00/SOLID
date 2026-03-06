import * as fs from 'fs';
import * as path from 'path';
import { FileContentReader } from './FileContentReader';

export class FileSystemContentReader implements FileContentReader {
    /**
     * Read file from resources directory
     * 
     * @param fileName The name of the file to read
     * @returns The file content as string, or null if read fails
     */
    readFile(fileName: string): string | null {
        try {
            const filePath = path.join(__dirname, '..', 'resources', fileName);
            return fs.readFileSync(filePath, 'utf8');
        } catch (e) {
            return null;
        }
    }
}
