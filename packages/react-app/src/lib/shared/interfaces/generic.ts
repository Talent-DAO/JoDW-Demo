export interface RawFileData {
  /**
   * The file name.
   */
  name: String;

  /**
   * File data.
   */
  data: Blob;

  /**
   * Returns the content type of the file.
   */
  getContentType(): string;
}

export enum SupportedBlockchain {
  Ethereum,
  Polygon,
  Optimism
}
