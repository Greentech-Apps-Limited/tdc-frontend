"use server"

import { promises as fs } from 'fs'
import path from 'path'

export const readData = async <T>(filePath: string): Promise<T> => {
    const fullPath = path.join(process.cwd(), filePath);
    const fileContents = await fs.readFile(fullPath, 'utf8');
    return JSON.parse(fileContents) as T;
};
