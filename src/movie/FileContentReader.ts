
export interface FileContentReader {
    /**
     * Read file content by name from the resources directory.
     * 
     * @param fileName The name of the file to read
     * @returns The file content as a string, or null if file not found
     */
    readFile(fileName: string): string | null;
}
