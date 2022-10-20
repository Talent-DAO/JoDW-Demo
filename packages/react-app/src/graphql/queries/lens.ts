const { gql } = require("@apollo/client");

export const GET_LATEST_ARTICLES = gql`
  query GetLatestArticles @api(name: lens) {
    posts(first: 10, orderBy: timestamp, orderDirection: desc) {
      id
      pubId
      profileId {
        handle
        imageURI
        owner
      }
      comments {
        pubId
        timestamp
      }
      contentURI
      timestamp
    }
  }
`;

export const GET_ARTICLE_DETAILS = gql`
  query GetArticle($id: ID!) @api(name: lens) {
    post(id: $id) {
      id
      pubId
      profileId {
        handle
        imageURI
        owner
      }
      comments {
        pubId
        timestamp
      }
      contentURI
      timestamp
    }
  }
`;