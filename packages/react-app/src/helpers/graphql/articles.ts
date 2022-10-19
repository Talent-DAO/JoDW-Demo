import { useQuery } from "@apollo/client";
import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { getPublicationsFailure, getPublicationsSuccess, TPublication } from "../../features/publication/publicationSlice";
import { LensUser, Status } from "../../features/user/userSlice";
import { GET_LATEST_ARTICLES } from "../../graphql/queries/lens";

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
  version?: string | undefined;
  animation_url?: string | undefined;
  metadata_id?: string | undefined;
  description?: string | undefined;
  locale?: string | undefined;
  tags?: Tags | undefined;
  mainContentFocus?: string | undefined;
  content?: string | undefined;
  external_url?: string | undefined;
  image?: string | undefined;
  imageMimeType?: string | undefined;
  name?: string | undefined;
  media?: Media | undefined;
  attributes?: Attribute[] | undefined;
  createdOn?: string | undefined;
  appId?: string | undefined;
}

export type LensPublicationDetails = {
  id: string | undefined;
  contentURI: string | undefined;
  content?: LensPublicationContent | undefined;
  author: LensUser;
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
  // console.log("Loading article data: %s", post.contentURI);
  // todo: check all possible contentURI formats
  let uri = post.contentURI;
  if (post.contentURI.startsWith("ipfs://")) {
    uri = "https://superfun.infura-ipfs.io/ipfs/" + post.contentURI.substring(7);
  } else if (post.contentURI.startsWith("https://arweave.net/")) {
    uri = post.contentURI;
  } else if (!post.contentURI.includes("://")) {
    uri = "https://superfun.infura-ipfs.io/ipfs/" + post.contentURI;
  }

  const response: LensPublicationDetails = {
    id: post.id,
    contentURI: uri,
    content: {},
    author: {
      id: 0,
      handle: post.profileId.handle,
      image: post.profileId.imageURI,
      walletId: post.profileId.owner,
      status: Status.Loading,
    },
    timestamp: post.timestamp,
  };

  try {
    var content: any = await axios.get(uri, { timeout: 50 });
    // TODO: check for errors
    if (content.headers["content-type"] === "text/html") {
      content = await axios.get(uri + "/json");
    }
    response.content = content.data;
    response.author.status = Status.Success;
    console.log("response", response);
  } catch (error) {
    console.error("Error loading post content: %s", post);
  }

  return response;
};