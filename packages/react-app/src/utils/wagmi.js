import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { infuraProvider } from "wagmi/providers/infura";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";

const alchemyId = process.env.ALCHEMY_ID;
const infuraId = process.env.INFURA_ID;

const activeChains = [];
if (process.env.REACT_APP_ENV === "production") {
  activeChains.push(chain.polygon);
} else {
  activeChains.push(chain.polygonMumbai);
}

export const { chains, provider, webSocketProvider } = configureChains(activeChains, [
  jsonRpcProvider({
    rpc: () => ({
      http: "http://localhost:8545",
    }),
  }),
  alchemyProvider({ apiKey: alchemyId, priority: 1 }),
  infuraProvider({ apiKey: infuraId, priority: 2 }),
  publicProvider({ priority: 0 }),
]);

const { connectors } = getDefaultWallets({
  appName: "Journal of Decentalized Work",
  chains,
});

const client = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

export default client;
