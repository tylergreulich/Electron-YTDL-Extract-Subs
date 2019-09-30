import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import * as os from 'os';
import * as ytdl from 'ytdl-core';
import { Resolvers } from './resolvers-types';

export const resolvers: Resolvers = {
  Query: {
    hello: () => ''
  },
  Mutation: {
    downloadFile: async (
      _,
      { videoId, videoTitle, channelTitle, fileFormat }
    ) => {
      const url = `http://www.youtube.com/watch?v=${videoId}`

      const targetDir = `${os.homedir()}\\Documents\\Japanese\\${channelTitle}`

      await mkdirp(targetDir, error => error && console.log(error))

      const format = fileFormat === 'mp3' ? 'audioonly' : 'video'

      const options: ytdl.downloadOptions = {
        quality: 'highest',
        filter: format
      }

      await ytdl(url, options).pipe(
        fs.createWriteStream(`${targetDir}\\${videoTitle}.${fileFormat}`)
      )

      return true
    }
  }
}
