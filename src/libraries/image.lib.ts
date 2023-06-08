import axios from 'axios';
import * as fs from 'fs';
import { Logger } from 'utils/logger.util';

export const downLoadFile = async (title: string, imageUrl: string[]) => {
  for (let i = 0; i <= imageUrl.length - 1; i += 1) {
    const response = await axios.get(imageUrl[i], { responseType: 'stream' });

    fs.writeFileSync(`../files/${title}${i}`, response.data);

    Logger.info('File Save Finished');
  }
};
