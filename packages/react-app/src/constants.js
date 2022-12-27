/* eslint-disable no-undef */
// MY INFURA_ID, SWAP IN YOURS FROM https://infura.io/dashboard/ethereum
export const INFURA_ID = process.env.REACT_APP_INFURA_ID;
export const INFURA_PROJECT_ID = process.env.REACT_APP_INFURA_PROJECT_ID || "";
export const INFURA_SECRET = process.env.REACT_APP_INFURA_SECRET || "";

export const IPFS_URI = process.env.REACT_APP_IPFS_URI || "https://ipfs.infura.io:5001";
export const IPFS_PROTOCOL = process.env.REACT_APP_IPFS_PROTOCOL || "https";
export const IPFS_AUTH_REQUIRED = process.env.REACT_APP_IPFS_AUTH_REQUIRED === "true";

// MY ETHERSCAN_ID, SWAP IN YOURS FROM https://etherscan.io/myapikey
export const ETHERSCAN_KEY_ETHEREUM = process.env.REACT_APP_ETHERSCAN_KEY_ETHEREUM || "";
export const ETHERSCAN_KEY_POLYGON = process.env.REACT_APP_ETHERSCAN_KEY_POLYGON || "";

// BLOCKNATIVE ID FOR Notify.js:
export const BLOCKNATIVE_DAPPID = process.env.REACT_APP_BLOCKNATIVE_DAPPID || "";

export const ALCHEMY_KEY = process.env.REACT_APP_ALCHEMY_KEY || "";

export const JODW_BACKEND = process.env.REACT_APP_JODW_BACKEND_URL || "https://tdao-api.herokuapp.com";

// App Constants
export const LOCAL_STORAGE_LENS_AUTH_TOKENS = "lens-auth-tokens";

export const NETWORKS = {
  localhost: {
    name: "localhost",
    color: "#666666",
    chainId: 31337,
    blockExplorer: "",
    rpcUrl: "http://" + (global.window ? window.location.hostname : "localhost") + ":8545",
  },
  mainnet: {
    name: "mainnet",
    color: "#ff8b9e",
    chainId: 1,
    rpcUrl: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_KEY}`,
    blockExplorer: "https://etherscan.io/",
  },
  goerli: {
    name: "goerli",
    color: "#0975F6",
    chainId: 5,
    faucet: "https://goerli-faucet.slock.it/",
    blockExplorer: "https://goerli.etherscan.io/",
    rpcUrl: `https://goerli.infura.io/v3/${INFURA_ID}`,
  },
  polygon: {
    name: "polygon",
    color: "#2bbdf7",
    chainId: 137,
    price: 1,
    gasPrice: 1000000000,
    rpcUrl: "https://polygon-rpc.com/",
    blockExplorer: "https://polygonscan.com/",
  },
  mumbai: {
    name: "mumbai",
    color: "#92D9FA",
    chainId: 80001,
    price: 1,
    gasPrice: 1000000000,
    rpcUrl: "https://rpc-mumbai.maticvigil.com",
    faucet: "https://faucet.polygon.technology/",
    blockExplorer: "https://mumbai.polygonscan.com/",
  },
  goerliOptimism: {
    name: "goerliOptimism",
    color: "#f01a37",
    chainId: 420,
    blockExplorer: "",
    rpcUrl: "",
    gasPrice: 0,
  },
  optimism: {
    name: "optimism",
    color: "#f01a37",
    chainId: 10,
    blockExplorer: "https://optimistic.etherscan.io/",
    rpcUrl: "https://mainnet.optimism.io",
  },
};

export const NETWORK = chainId => {
  for (const n in NETWORKS) {
    if (NETWORKS[n].chainId === chainId) {
      return NETWORKS[n];
    }
  }
};
