import { useQuery } from "@apollo/client";
import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { getPublicationsFailure, getPublicationsSuccess, Publication } from "../features/publication/publicationSlice";
import { LensUser } from "../features/user/userSlice";
import { GET_LATEST_ARTICLES } from "../graphql/queries/lens";

export type Tags = {
  [key: string]: string;
}

export type Media = {
  [key: number]: {
    item: string,
    type: string,
    altTag: string,
  };
  attributes: Attribute;
  appId: string;
}

export type Attribute = {
  [key: number]: {
    value: string,
    traitType: string,
    displayType: string,
  };
  media: Media;
  createdOn: string;
  appId: string;
}

export type LensPublicationContent = {
  version: string;
  metadata_id: string;
  description: string;
  locale?: string;
  tags?: Tags;
  mainContentFocus?: string;
  content: string;
  external_url?: string;
  image?: string;
  imageMimeType?: string;
  name: string;
  media?: Media;
  attributes?: Attribute[];
  createdOn: string;
  appId: string;
}

export type LensPublicationDetails = {
  id: string;
  contentURI: string;
  content?: LensPublicationContent;
  author: LensUser;
  timestamp: number;
}

export const getLatestArticles = async () => (dispatch: Dispatch) => {
  useQuery(GET_LATEST_ARTICLES, {
    onError: error => {
      dispatch(getPublicationsFailure(error));
    },
    onCompleted: data => {
      let unresolvedArticleData = data.posts.map(async (post: Publication) => {
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
  try {
    const content = await axios.get(uri);
    // TODO: check for errors
    postData.content = content.data;
  } catch (error) {
    console.error("Error loading post content: %s", post);
  }

  return postData;
};