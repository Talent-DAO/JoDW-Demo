import { createHttpLink } from "apollo-link-http";
import { MultiAPILink } from "@habx/apollo-multi-endpoint-link";
import { ApolloClient, ApolloLink, InMemoryCache, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useNetwork } from "wagmi";
import { LOCAL_STORAGE_LENS_AUTH_TOKENS } from "../constants";

const getLensAuthToken = () => {
  const serializedData = window.localStorage.getItem(LOCAL_STORAGE_LENS_AUTH_TOKENS) || {};
  if (serializedData && serializedData !== {}) {
    const tokens = JSON.parse(serializedData)?.value;
    return tokens?.accessToken ? `Bearer ${tokens?.accessToken}` : "";
  } else {
    return "";
  }
};

export const healthClient = new ApolloClient({
  uri: "https://api.thegraph.com/index-node/graphql",
  cache: new InMemoryCache(),
});

export const goerliClient = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/codenamejason/reputation-goerli",
  cache: new InMemoryCache({
    typePolicies: {
      Token: {
        // Singleton types that have no identifying field can use an empty
        // array for their keyFields.
        keyFields: false,
      },
      Pool: {
        // Singleton types that have no identifying field can use an empty
        // array for their keyFields.
        keyFields: false,
      },
    },
  }),
  queryDeduplication: true,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  },
});

export const arweaveClient = new ApolloClient({
  uri: "https://arweave.net/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Token: {
        // Singleton types that have no identifying field can use an empty
        // array for their keyFields.
        keyFields: false,
      },
      Pool: {
        // Singleton types that have no identifying field can use an empty
        // array for their keyFields.
        keyFields: false,
      },
    },
  }),
  queryDeduplication: true,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  },
});

/**
 * Composite subgraph.
 */
export const compositeClient = new ApolloClient({
  link: ApolloLink.from([
    new MultiAPILink({
      endpoints: {
        goerli: "https://api.thegraph.com/subgraphs/name/codenamejason/reputation-goerli",
        arweave: "https://arweave.net/graphql",
        lens: "https://api.thegraph.com/subgraphs/name/supriyaamisshra/lens-tdao-test-1",
        officiallens: "https://api-mumbai.lens.dev",
      },
      getContext: (endpoint) => {
        if (endpoint === "officiallens") {
          return ({
            headers: {
              "x-access-token": getLensAuthToken(),
            }
          });
        }
        return {};
      },
      createHttpLink: () => createHttpLink(),
      httpSuffix: ""
    }),
  ]),
  cache: new InMemoryCache({
    typePolicies: {
      Token: {
        // Singleton types that have no identifying field can use an empty
        // array for their keyFields.
        keyFields: false,
      },
      Pool: {
        // Singleton types that have no identifying field can use an empty
        // array for their keyFields.
        keyFields: false,
      },
    },
  }),
  queryDeduplication: true,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  },
});

/** SUBGRAPH HEALTH */
export const SUBGRAPH_HEALTH = gql`
  query health($name: Bytes) {
    indexingStatusForCurrentVersion(subgraphName: $name, subgraphError: allow) {
      synced
      health
      chains {
        chainHeadBlock {
          number
        }
        latestBlock {
          number
        }
      }
    }
  }
`;

export function useFetchedSubgraphStatus() {
  const { chain } = useNetwork();

  const { loading, error, data } =
    useQuery(SUBGRAPH_HEALTH,
      {
        client: healthClient,
        fetchPolicy: "no-cache",
        variables: {
          name:
          chain?.id === 69
            ? "danielesalatti/project-registry-optimism-kovan"
            : "danielesalatti/project-registry-goerli",
        },
      });

  const parsed = data?.indexingStatusForCurrentVersion;

  if (loading) {
    return {
      available: null,
      syncedBlock: undefined,
      headBlock: undefined,
      healthy: null,
    };
  }

  if ((!loading && !parsed) || error) {
    return {
      available: false,
      syncedBlock: undefined,
      headBlock: undefined,
      healthy: null,
    };
  }

  const syncedBlock = parsed?.chains[0].latestBlock.number;
  const headBlock = parsed?.chains[0].chainHeadBlock.number;
  const healthy = parsed?.health === "healthy";

  return {
    available: true,
    syncedBlock: syncedBlock ? parseFloat(syncedBlock) : undefined,
    headBlock: headBlock ? parseFloat(headBlock) : undefined,
    healthy,
  };
}

/** REPUTATION */
// export const FETCH_REPUTATION_BY_ADDRESS = gql`
//   query fetchReputationByAddress($address: string) {
//   }
// `;

/** ARWEAVE */

// id here is just one string tx id
export const FETCH_AR_TX_BY_ID = gql`
  query fetchTransactionsById($id: ID!) {
    transaction(ids: $id) {
      edges {
        node {
          id
        }
      }
    }
  }
`;

// ids is an array here of strings
// export const GRAPH_GET_TX_BY_IDS = ids => {
//   transactions(ids: ids) {
//       edges {
//           node {
//               id
//           }
//       }
//   }
// }

/**
 * 
 * @dev tag example to use for search
 *  {{
        name: "Content-Type",
        values: ["text/html"]
    }} tags 
 */
// export const GRAPH_GET_TX_BY_TAG = tag => {
//   query {
//     transactions(
//         tags: tags
//     ) {
//         edges {
//             node {
//                 id
//             }
//         }
//     }
//   }
// }
