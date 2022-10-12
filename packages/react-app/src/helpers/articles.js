import axios from "axios";

export const getLensArticleData = async (post) => {
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
  } catch(error) {
    console.error("Error loading post content: %s", post);
  }

  return postData;
};