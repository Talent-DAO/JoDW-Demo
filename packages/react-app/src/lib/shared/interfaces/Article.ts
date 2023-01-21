import { SupportedBlockchain } from "./generic";
import { Profile } from "./Profile";

export interface Article {
  /**
   * The article ID.
   */
  id: String;
  
  /**
   * The article title.
   */
   title: String;

   /**
    * Article abstract.
    */
   abstract: string;
 
   /**
    * The manuscript file URI.
    */
   manuscriptFileURI?: string;

   /**
    * The manuscript file content type.
    */
   manuscriptFileContentType?: string;
 
   /**
    * Article cover image.
    */
   coverImageURI?: string;
 
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
   blockchain?: SupportedBlockchain;
 
   /**
    * Categories the article belongs in.
    */
   categories?: Array<String> | undefined;

   /**
    * The wallet address who owns this article.
    */
   ownedBy: string;

   /**
    * The lens profile.
    */
   profile: Profile;

   /**
    * Created at time of the article.
    */
   createdAt: Date;
}