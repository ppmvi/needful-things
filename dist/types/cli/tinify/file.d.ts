/// <reference types="node" />
export default class File {
    static get EXIF_USER_COMMENT(): string;
    static get PNG_TEXT_CHUNKG_FLAG(): string;
    readUserComment(filePath: string): string;
    addUserComment(fileBuffer: string, filePath: string): Buffer;
    getUserCommentFromPngChunks(list: PngChunk[]): PngChunk | undefined;
}
interface PngChunk {
    type: string;
    data: string;
}
export {};
