import { promises as fs } from 'fs';
import fetch from 'node-fetch';

export const downloadImage = async (url: string, fileName: string) => {
  const response = await fetch(url);

  const blob = await response.blob();

  const arrayBuffer = await blob.arrayBuffer();

  const buffer = Buffer.from(arrayBuffer);

  return await fs.writeFile('../../files/' + fileName, buffer);
};
