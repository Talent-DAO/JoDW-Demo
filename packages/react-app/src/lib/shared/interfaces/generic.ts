/* eslint-disable no-undef */
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

export const getBlockchainName = (chain: SupportedBlockchain) => {
  switch (chain) {
  case SupportedBlockchain.Ethereum: return "Ethereum";
  case SupportedBlockchain.Polygon: return "Polygon";
  case SupportedBlockchain.Optimism: return "Optimism";
  default: return "Unknown";
  }
};
