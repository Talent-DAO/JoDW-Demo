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
        const artdata = await getLensArticleData(post);
        return artdata;
      });
      Promise.all(unresolvedArticleData).then(articleData => {
        dispatch(getPublicationsSuccess(articleData));
      });
    },
  });
};

export const getLensArticleData = async (post: any) => {
  //console.log("Loading article data: %s", post.contentURI);
  let uri = post.contentURI;
  if (post.contentURI.startsWith("ipfs://")) {
    uri = "https://superfun.infura-ipfs.io/ipfs/" + post.contentURI.substring(7);
  }
  const postData = {
    id: post.id,
    contentURI: post.contentURI,
    content: {},
    author: {
      handle: post.profileId.handle,
      image: post.profileId.imageURI,
      walletId: post.profileId.owner,
    },
    timestamp: post.timestamp,
  };

  // todo: set this up for the return type using the lens graphql api
  // and replace postData 
  const response: LensPublicationDetails = {
    id: "",
    contentURI: "",
    content: {
      version: "",
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
    const content = await axios.get(uri);
    // TODO: check for errors
    postData.content = content.data;
  } catch (error) {
    console.error("Error loading post content: %s", post);
  }

  return postData;
};