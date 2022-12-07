import { useQuery } from "@apollo/client";
import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "../../app/store";
import { getPublicationDetailsStart, getPublicationsFailure, getPublicationsSuccess, TPublication } from "../../features/publication/publicationSlice";
import { LensUser, Status } from "../../features/user/userSlice";
import { GET_LATEST_ARTICLES  } from "../../graphql/queries/jodw-lens";
import { convertToHttpUrl } from "../../utils/utils";

export type TTags = {
  [key: string]: string;
}

export type TMedia = {
  [key: number]: {
    item: string | undefined,
    type: string | undefined,
    altTag: string | undefined,
  };
  attributes?: TAttribute | undefined;
  appId?: string | undefined;
}

export type TAttribute = {
  [key: number]: {
    value: string,
    traitType: string,
    displayType: string,
  };
  media: TMedia | undefined;
  createdOn: string | undefined;
  appId: string | undefined;
}

export type TLensPublicationContent = {
  version?: string | undefined;
  animation_url?: string | undefined;
  metadata_id?: string | undefined;
  description?: string | undefined;
  locale?: string | undefined;
  tags?: TTags | undefined;
  mainContentFocus?: string | undefined;
  content?: string | undefined;
  external_url?: string | undefined;
  image?: string | undefined;
  imageMimeType?: string | undefined;
  name?: string | undefined;
  media?: TMedia | undefined;
  attributes?: TAttribute[] | undefined;
  createdOn?: string | undefined;
  appId?: string | undefined;
}

export type TLensPublicationDetails = {
  id: string | undefined;
  contentURI: string | undefined;
  content?: TLensPublicationContent | undefined;
  author: LensUser;
  timestamp: number;
}

export const getLatestArticles = async () => (dispatch: Dispatch) => {
  dispatch(getPublicationDetailsStart());
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
  // todo: check all possible contentURI formats
  const uri = convertToHttpUrl(post.contentURI);

  const response: TLensPublicationDetails = {
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
  } catch (error) {
    // todo: handle error
    console.error(["Error loading post content: ", post]);
  }

  return response;
};