import fs from 'fs';
import path from 'path';
import png from 'png-metadata';
import { insert, dump, load, TagValues } from 'piexifjs';

export default class File {
  static get EXIF_USER_COMMENT() {
    return 'Compressed with TinyPNG by @ppmvi/needful-things';
  };

  static get PNG_TEXT_CHUNKG_FLAG() {
    return 'tEXt';
  };

  readUserComment(filePath) {
    let userComment = '';
    const ext = path.extname(filePath);
    const file = fs.readFileSync(filePath).toString('binary');

    if (ext === '.png') {
      const list = png.splitChunk(file);
      const chunk = this.getUserCommentFromPngChunks(list);
      userComment = (chunk) ? chunk.data : '';
    } else {
      const exifData = (ext !== '.png') ? load(file)['Exif'] : undefined;
      userComment = (typeof exifData !== 'undefined' && exifData[TagValues.ExifIFD.UserComment]) ? exifData[TagValues.ExifIFD.UserComment] : '';
    }

    return userComment;
  }

  addUserComment(fileBuffer, filePath) {
    const ext = path.extname(filePath);
    let newData = fileBuffer;

    if (ext === '.png') {
      const list = png.splitChunk(fileBuffer);
      if (!this.getUserCommentFromPngChunks(list)) {
        const end = list.pop();
        const newchunk = png.createChunk(File.PNG_TEXT_CHUNKG_FLAG, File.EXIF_USER_COMMENT);
        list.push(newchunk);
        list.push(end);
        newData = png.joinChunk(list);
      }
    } else {
      const exifData = {
        'Exif': {
          [TagValues.ExifIFD.UserComment]: File.EXIF_USER_COMMENT
        }
      };
      const exifBytes = dump(exifData);
      newData = insert(exifBytes, fileBuffer);
    }

    return Buffer.from(newData, 'binary');
  }

  getUserCommentFromPngChunks(list) {
    let chunk;
    for (const item of list) {
      if (item.type === File.PNG_TEXT_CHUNKG_FLAG) {
        chunk = item;
        break;
      }
    }
    return chunk;
  }
}
