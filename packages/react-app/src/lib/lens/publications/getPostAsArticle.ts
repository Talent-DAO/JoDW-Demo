import { Post, ProfileMedia } from "@jodw/lens";
import { SupportedBlockchain } from "../../shared";
import { Article } from "../../shared/interfaces/Article";

const getBlockchain = (chain: string) => {
  if (chain === "Ethereum") return SupportedBlockchain.Ethereum;
  if (chain === "Polygon") return SupportedBlockchain.Polygon;
  if (chain === "Optimism") return SupportedBlockchain.Optimism;
  throw new Error("Unknown blockchain!");
};

export const getMediaSetOriginal = (item: any) => {
  if (item?.__typename === "MediaSet") {
    return item?.original?.url;
  } else {
    return null;
  }
};

export const getProfilePicture = (item: ProfileMedia | null | undefined) => {
  return getMediaSetOriginal(item);
};

const getPostAsArticle = (post: Post): Article => {
  const attributes: Map<string, string> = new Map(post?.metadata?.attributes?.map(attr => [ attr?.traitType || "", attr?.value || "" ]));

  return {
    id: post?.id,
    title: post?.metadata?.name ?? "Untitled",
    abstract: post?.metadata?.description,
    manuscriptFileURI: attributes.get("articleContentURI"),
    manuscriptFileContentType: attributes.get("articleContentType"),
    coverImageURI: getMediaSetOriginal(post?.metadata?.media[0]),
    price: Number.parseFloat(attributes.get("price")??""),
    authors: (attributes.get("authors")??"").split(","),
    blockchain: getBlockchain(attributes.get("chain")??""),
    categories: (attributes.get("categories")??"").split(","),
    ownedBy: post?.profile?.ownedBy,
    profile: {
      id: post?.profile?.id,
      handle: post?.profile?.handle,
      picture: getProfilePicture(post?.profile?.picture ?? null),
      ownedBy: post?.profile?.ownedBy,
    },
    createdAt: new Date(post?.createdAt),
  };
};

export default getPostAsArticle;