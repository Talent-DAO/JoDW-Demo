import { useQuery } from "@apollo/client";
import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { getPublicationsFailure, getPublicationsSuccess, TPublication } from "../features/publication/publicationSlice";
import { LensUser } from "../features/user/userSlice";
import { GET_LATEST_ARTICLES } from "../graphql/queries/lens";

export type Tags = {
  [key: string]: string;
}

export type Media = {
  [key: number]: {
    item: string | undefined,
    type: string | undefined,
    altTag: string | undefined,
  };
  attributes?: Attribute | undefined;
  appId?: string | undefined;
}

export type Attribute = {
  [key: number]: {
    value: string,
    traitType: string,
    displayType: string,
  };
  media: Media | undefined;
  createdOn: string | undefined;
  appId: string | undefined;
}

export type LensPublicationContent = {
  version: string;
  animation_url: string;
  metadata_id: string | undefined;
  description: string | undefined;
  locale?: string | undefined;
  tags?: Tags | undefined;
  mainContentFocus?: string | undefined;
  content: string | undefined;
  external_url?: string | undefined;
  image?: string | undefined;
  imageMimeType?: string | undefined;
  name: string | undefined;
  media?: Media | undefined;
  attributes?: Attribute[] | undefined;
  createdOn: string | undefined;
  appId: string | undefined;
}

export type LensPublicationDetails = {
  id: string | undefined;
  contentURI: string | undefined;
  content?: LensPublicationContent | undefined;
  author?: LensUser | undefined;
  timestamp: number | undefined;
}

export const getLatestArticles = async () => (dispatch: Dispatch) => {
  useQuery(GET_LATEST_ARTICLES, {
    onError: error => {
      dispatch(getPublicationsFailure(error));
    },
    onCompleted: data => {
      let unresolvedArticleData = data.posts.map(async (post: TPublication) => {
        try {
          const artdata = await getLensArticleData(post);
          return artdata;
        } catch (err) {
          console.error("Error loading article: ", err);
        }
      });
      Promise.all(unresolvedArticleData).then(articleData => {
        console.log("loaded art data");
        dispatch(getPublicationsSuccess(articleData));
      });
    },
  });
};

export const getLensArticleData = async (post: any) => {
  console.log("Loading article data: %s", post.contentURI);
  let uri = post.contentURI;
  if (post.contentURI.startsWith("ipfs://")) {
    uri = "https://superfun.infura-ipfs.io/ipfs/" + post.contentURI.substring(7);
  } else if (post.contentURI.startsWith("https://arweave.net/")) {
    uri = post.contentURI;
  } else if (!post.contentURI.includes("://")) {
    uri = "https://superfun.infura-ipfs.io/ipfs/" + post.contentURI;
    console.log("CID only URI: %s", uri);
  }
  // bafybeihnndltmxfycnk2kzl3oyci3v4s5mvg7pwm6elelrhlddlyy5nwiy
  // https://explore.ipld.io/#/explore/bafybeihz2elht6oiet5f6nslgawatxmlrfnxduhbwprrvpz7enpeiggkle
  // https://superfun.infura-ipfs.io/ipfs/bafybeihnndltmxfycnk2kzl3oyci3v4s5mvg7pwm6elelrhlddlyy5nwiy
  // https://superfun.infura-ipfs.io/ipfs/bafybeihnndltmxfycnk2kzl3oyci3v4s5mvg7pwm6elelrhlddlyy5nwiy/json
  const postData = {
    id: post.id,
    contentURI: uri,
    content: {},
    author: {
      handle: post.profileId.handle,
      image: post.profileId.imageURI,
      walletId: post.profileId.owner,
    },
    timestamp: post.timestamp,
  };

  console.log("Post Data", postData);

  // todo: set this up for the return type using the lens graphql api
  // and replace postData 
  const response: LensPublicationDetails = {
    id: post.id,
    contentURI: "",
    content: {
      version: "",
      animation_url: "",
      metadata_id: "",
      description: "",
      locale: "",
      tags: {},
      mainContentFocus: "",
      content: "",
      external_url: "",
      image: "",
      imageMimeType: "",
      name: "",
      media: {
        0: {
          item: "",
          type: "",
          altTag: "",
        },
        attributes: undefined,
        appId: "",
      },
      attributes: [],
      createdOn: "",
      appId: "",
    },
    author: undefined,
    timestamp: 0,
  };

  try {
    var content: any = await axios.get(uri, {timeout: 50});
    // TODO: check for errors
    if (content.headers["content-type"] === "text/html") {
      content = await axios.get(uri + "/json");
    }
    postData.content = content.data;
    console.log("content", content);
  } catch (error) {
    console.error("Error loading post content: %s", post);
  }

  return postData;
};