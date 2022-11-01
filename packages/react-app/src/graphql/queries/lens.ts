const { gql } = require("@apollo/client");

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BlockchainData: any;
  BroadcastId: any;
  ChainId: any;
  CollectModuleData: any;
  ContractAddress: any;
  CreateHandle: any;
  Cursor: any;
  DateTime: any;
  Ens: any;
  EthereumAddress: any;
  FollowModuleData: any;
  Handle: any;
  HandleClaimIdScalar: any;
  InternalPublicationId: any;
  Jwt: any;
  LimitScalar: any;
  Locale: any;
  Markdown: any;
  MimeType: any;
  NftOwnershipId: any;
  Nonce: any;
  NotificationId: any;
  ProfileId: any;
  ProxyActionId: any;
  PublicationId: any;
  PublicationTag: any;
  PublicationUrl: any;
  ReactionId: any;
  ReferenceModuleData: any;
  Search: any;
  Signature: any;
  Sources: any;
  TimestampScalar: any;
  TxHash: any;
  TxId: any;
  UnixTimestamp: any;
  Url: any;
  Void: any;
};


/** The erc20 type */
export type Erc20 = {
  __typename?: "Erc20";
  /** The erc20 address */
  address: Scalars["ContractAddress"];
  /** Decimal places for the token */
  decimals: Scalars["Int"];
  /** Name of the symbol */
  name: Scalars["String"];
  /** Symbol for the token */
  symbol: Scalars["String"];
};

export type Erc20Amount = {
  __typename?: "Erc20Amount";
  /** The erc20 token info */
  asset: Erc20;
  /** Floating point number as string (e.g. 42.009837). It could have the entire precision of the Asset or be truncated to the last significant decimal. */
  value: Scalars["String"];
};


/** The Media url */
export type Media = {
  __typename?: "Media";
  /** The alt tags for accessibility */
  altTag?: Maybe<Scalars["String"]>;
  /** The cover for any video or audio you attached */
  cover?: Maybe<Scalars["String"]>;
  /** Height - will always be null on the public API */
  height?: Maybe<Scalars["Int"]>;
  /** The image/audio/video mime type for the publication */
  mimeType?: Maybe<Scalars["MimeType"]>;
  /** Size - will always be null on the public API */
  size?: Maybe<Scalars["Int"]>;
  /** The token image nft */
  url: Scalars["Url"];
  /** Width - will always be null on the public API */
  width?: Maybe<Scalars["Int"]>;
};

/** The Media Set */
export type MediaSet = {
  __typename?: "MediaSet";
  /**
   * Medium media - will always be null on the public API
   * @deprecated should not be used will always be null
   */
  medium?: Maybe<Media>;
  /** Original media */
  original: Media;
  /**
   * Small media - will always be null on the public API
   * @deprecated should not be used will always be null
   */
  small?: Maybe<Media>;
};

/** The NFT image */
export type NftImage = {
  __typename?: "NftImage";
  /** The token image nft */
  chainId: Scalars["Int"];
  /** The contract address */
  contractAddress: Scalars["ContractAddress"];
  /** The token id of the nft */
  tokenId: Scalars["String"];
  /** The token image nft */
  uri: Scalars["Url"];
  /** If the NFT is verified */
  verified: Scalars["Boolean"];
};

/** The Profile */
export type Attribute = {
  __typename?: "Attribute";
  /** The display type */
  displayType?: Maybe<Scalars["String"]>;
  /** identifier of this attribute, we will update by this id  */
  key: Scalars["String"];
  /** The trait type - can be anything its the name it will render so include spaces */
  traitType?: Maybe<Scalars["String"]>;
  /** Value attribute */
  value: Scalars["String"];
};


/** The dispatcher */
export type Dispatcher = {
  __typename?: "Dispatcher";
  /** The dispatcher address */
  address: Scalars["EthereumAddress"];
  /** If the dispatcher can use the relay */
  canUseRelay: Scalars["Boolean"];
};

export type ProfileMedia = MediaSet | NftImage;

export type ModuleFeeAmount = {
  __typename?: "ModuleFeeAmount";
  /** The erc20 token info */
  asset: Erc20;
  /** Floating point number as string (e.g. 42.009837). It could have the entire precision of the Asset or be truncated to the last significant decimal. */
  value: Scalars["String"];
};

export type FeeFollowModuleRedeemParams = {
  /** The expected amount to pay */
  amount: ModuleFeeAmountParams;
};

/** The follow module types */
export enum FollowModules {
  FeeFollowModule = "FeeFollowModule",
  ProfileFollowModule = "ProfileFollowModule",
  RevertFollowModule = "RevertFollowModule",
  UnknownFollowModule = "UnknownFollowModule"
}

export type FeeFollowModuleSettings = {
  __typename?: "FeeFollowModuleSettings";
  /** The collect module amount info */
  amount: ModuleFeeAmount;
  contractAddress: Scalars["ContractAddress"];
  /** The collect module recipient address */
  recipient: Scalars["EthereumAddress"];
  /** The follow modules enum */
  type: FollowModules;
};

export type ProfileFollowModuleSettings = {
  __typename?: 'ProfileFollowModuleSettings';
  contractAddress: Scalars['ContractAddress'];
  /** The follow module enum */
  type: FollowModules;
};

export type RevertFollowModuleSettings = {
  __typename?: 'RevertFollowModuleSettings';
  contractAddress: Scalars['ContractAddress'];
  /** The follow module enum */
  type: FollowModules;
};

export type UnknownFollowModuleSettings = {
  __typename?: 'UnknownFollowModuleSettings';
  contractAddress: Scalars['ContractAddress'];
  /** The data used to setup the module which you can decode with your known ABI  */
  followModuleReturnData: Scalars['FollowModuleData'];
  /** The follow modules enum */
  type: FollowModules;
};

export type FollowModule = FeeFollowModuleSettings | ProfileFollowModuleSettings | RevertFollowModuleSettings | UnknownFollowModuleSettings;


export type EnsOnChainIdentity = {
  __typename?: 'EnsOnChainIdentity';
  /** The default ens mapped to this address */
  name?: Maybe<Scalars['Ens']>;
};


export type SybilDotOrgIdentitySource = {
  __typename?: 'SybilDotOrgIdentitySource';
  twitter: SybilDotOrgTwitterIdentity;
};

export type SybilDotOrgTwitterIdentity = {
  __typename?: 'SybilDotOrgTwitterIdentity';
  handle?: Maybe<Scalars['String']>;
};


export type SybilDotOrgIdentity = {
  __typename?: 'SybilDotOrgIdentity';
  source: SybilDotOrgIdentitySource;
  /** The sybil dot org status */
  verified: Scalars['Boolean'];
};

export type WorldcoinIdentity = {
  __typename?: 'WorldcoinIdentity';
  /** If the profile has verified as a user */
  isHuman: Scalars['Boolean'];
};

export type OnChainIdentity = {
  __typename?: 'OnChainIdentity';
  /** The ens information */
  ens?: Maybe<EnsOnChainIdentity>;
  /** The POH status */
  proofOfHumanity: Scalars['Boolean'];
  /** The sybil dot org information */
  sybilDotOrg: SybilDotOrgIdentity;
  /** The worldcoin identity */
  worldcoin: WorldcoinIdentity;
};

/** The Profile Stats */
export type ProfileStats = {
  __typename?: 'ProfileStats';
  commentsTotal: Scalars['Int'];
  id: Scalars['ProfileId'];
  mirrorsTotal: Scalars['Int'];
  postsTotal: Scalars['Int'];
  publicationsTotal: Scalars['Int'];
  /** Total collects count */
  totalCollects: Scalars['Int'];
  /** Total comment count */
  totalComments: Scalars['Int'];
  /** Total follower count */
  totalFollowers: Scalars['Int'];
  /** Total following count (remember the wallet follows not profile so will be same for every profile they own) */
  totalFollowing: Scalars['Int'];
  /** Total mirror count */
  totalMirrors: Scalars['Int'];
  /** Total post count */
  totalPosts: Scalars['Int'];
  /** Total publication count */
  totalPublications: Scalars['Int'];
};

/** The Profile */
export type Profile = {
  __typename?: "Profile";
  /** Optionals param to add extra attributes on the metadata */
  attributes?: Maybe<Array<Attribute>>;
  /** Bio of the profile */
  bio?: Maybe<Scalars["String"]>;
  /** The cover picture for the profile */
  coverPicture?: Maybe<ProfileMedia>;
  /** The dispatcher */
  dispatcher?: Maybe<Dispatcher>;
  /** The follow module */
  followModule?: Maybe<FollowModule>;
  /** Follow nft address */
  followNftAddress?: Maybe<Scalars["ContractAddress"]>;
  /** The profile handle */
  handle: Scalars["Handle"];
  /** The profile id */
  id: Scalars["ProfileId"];
  /** Is the profile default */
  isDefault: Scalars["Boolean"];
  isFollowedByMe: Scalars["Boolean"];
  isFollowing: Scalars["Boolean"];
  /** Metadata url */
  metadata?: Maybe<Scalars["Url"]>;
  /** Name of the profile */
  name?: Maybe<Scalars["String"]>;
  /** The on chain identity */
  onChainIdentity: OnChainIdentity;
  /** Who owns the profile */
  ownedBy: Scalars["EthereumAddress"];
  /** The picture for the profile */
  picture?: Maybe<ProfileMedia>;
  /** Profile stats */
  stats: ProfileStats;
};


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

export type ModuleFeeAmountParams = {
  /** The currency address */
  currency: Scalars["ContractAddress"];
  /** Floating point number as string (e.g. 42.009837). It could have the entire precision of the Asset or be truncated to the last significant decimal. */
  value: Scalars["String"];
};

export type FeeFollowModuleParams = {
  /** The follow module amount info */
  amount: ModuleFeeAmountParams;
  /** The follow module recipient address */
  recipient: Scalars["EthereumAddress"];
};

export type UnknownFollowModuleParams = {
  contractAddress: Scalars["ContractAddress"];
  /** The encoded data to submit with the module */
  data: Scalars["BlockchainData"];
};

export type FollowModuleParams = {
  /** The follower fee follower module */
  feeFollowModule?: InputMaybe<FeeFollowModuleParams>;
  /** The empty follow module */
  freeFollowModule?: InputMaybe<Scalars["Boolean"]>;
  /** The profile follow module */
  profileFollowModule?: InputMaybe<Scalars["Boolean"]>;
  /** The revert follow module */
  revertFollowModule?: InputMaybe<Scalars["Boolean"]>;
  /** A unknown follow module */
  unknownFollowModule?: InputMaybe<UnknownFollowModuleParams>;
};

export type CreateProfileRequest = {
  /** The follow module */
  followModule?: InputMaybe<FollowModuleParams>;
  /** The follow NFT URI is the NFT metadata your followers will mint when they follow you. This can be updated at all times. If you do not pass in anything it will create a super cool changing NFT which will show the last publication of your profile as the NFT which looks awesome! This means people do not have to worry about writing this logic but still have the ability to customise it for their followers */
  followNFTURI?: InputMaybe<Scalars["Url"]>;
  handle: Scalars["CreateHandle"];
  /** The profile picture uri */
  profilePictureUri?: InputMaybe<Scalars["Url"]>;
};

/** Relay error reason */
export enum RelayErrorReasons {
  Expired = "EXPIRED",
  HandleTaken = "HANDLE_TAKEN",
  NotAllowed = "NOT_ALLOWED",
  Rejected = "REJECTED",
  WrongWalletSigned = "WRONG_WALLET_SIGNED"
}

export type CreateProfileMutation = { __typename?: "Mutation", createProfile: { __typename: "RelayError", reason: RelayErrorReasons } | { __typename: "RelayerResult", txHash: any } };

export type CreateProfileMutationVariables = {
  request: CreateProfileRequest;
};

export const CreateProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateProfileRequest"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RelayerResult"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"txHash"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RelayError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reason"}}]}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]};

export const GET_PROFILE = gql`
query Profile($id: ProfileId!) @api(name: officiallens) {
  profile(request: { profileId: $id }) {
    id
    name
    bio
    attributes {
      displayType
      traitType
      key
      value
    }
    followNftAddress
    metadata
    isDefault
    picture {
      ... on NftImage {
        contractAddress
        tokenId
        uri
        verified
      }
      ... on MediaSet {
        original {
          url
          mimeType
        }
      }
      __typename
    }
    handle
    coverPicture {
      ... on NftImage {
        contractAddress
        tokenId
        uri
        verified
      }
      ... on MediaSet {
        original {
          url
          mimeType
        }
      }
      __typename
    }
    ownedBy
    dispatcher {
      address
      canUseRelay
    }
    stats {
      totalFollowers
      totalFollowing
      totalPosts
      totalComments
      totalMirrors
      totalPublications
      totalCollects
    }
    followModule {
      ... on FeeFollowModuleSettings {
        type
        amount {
          asset {
            symbol
            name
            decimals
            address
          }
          value
        }
        recipient
      }
      ... on ProfileFollowModuleSettings {
        type
      }
      ... on RevertFollowModuleSettings {
        type
      }
    }
  }
}
`;

export const GET_PROFILES_BY_OWNER = gql`
query ProfilesByOwner($id: EthereumAddress!) @api(name: officiallens) {
  profiles(request: { ownedBy: [$id], limit: 10 }) {
    items {
      id
      name
      bio
      attributes {
        displayType
        traitType
        key
        value
      }
      followNftAddress
      metadata
      isDefault
      picture {
        ... on NftImage {
          contractAddress
          tokenId
          uri
          verified
        }
        ... on MediaSet {
          original {
            url
            mimeType
          }
        }
        __typename
      }
      handle
      coverPicture {
        ... on NftImage {
          contractAddress
          tokenId
          uri
          verified
        }
        ... on MediaSet {
          original {
            url
            mimeType
          }
        }
        __typename
      }
      ownedBy
      dispatcher {
        address
        canUseRelay
      }
      stats {
        totalFollowers
        totalFollowing
        totalPosts
        totalComments
        totalMirrors
        totalPublications
        totalCollects
      }
      followModule {
        ... on FeeFollowModuleSettings {
          type
          amount {
            asset {
              symbol
              name
              decimals
              address
            }
            value
          }
          recipient
        }
        ... on ProfileFollowModuleSettings {
         type
        }
        ... on RevertFollowModuleSettings {
         type
        }
      }
    }
    pageInfo {
      prev
      next
      totalCount
    }
  }
}
`;

export const CREATE_POST = gql`
mutation CreatePost($profileId: ProfileId!, $ipfsUri: Url!) @api(name: officiallens) {
  createPostTypedData(request: {
    profileId: $profileId,
    contentURI: $ipfsUri,
    collectModule: {
      revertCollectModule: true
    },
    referenceModule: {
      followerOnlyReferenceModule: false
    }
  }) {
    id
    expiresAt
    typedData {
      types {
        PostWithSig {
          name
          type
        }
      }
      domain {
        name
        chainId
        version
        verifyingContract
      }
      value {
        nonce
        deadline
        profileId
        contentURI
        collectModule
        collectModuleInitData
        referenceModule
        referenceModuleInitData
      }
    }
  }
}
`;
