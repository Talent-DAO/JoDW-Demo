import { RawFileData, SupportedBlockchain } from "./generic";

export interface NewArticleFormData {

  /**
   * The article title.
   */
  title: String;

  /**
   * Article abstract.
   */
  abstract: string;

  /**
   * The manuscript file.
   */
  manuscriptFile: RawFileData;

  /**
   * Article cover image.
   */
  coverImage: RawFileData;

  /**
   * Talent price.
   */
  price: Number;

  /**
   * Authors of the article.
   */
  authors: Array<String> | string;

  /**
   * A supported blockchain to publish to.
   */
  blockchain: SupportedBlockchain;

  /**
   * Categories the article belongs in.
   */
  categories: Array<String> | undefined;
}
