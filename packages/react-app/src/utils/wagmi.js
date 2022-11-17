import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";

const alchemyId = process.env.REACT_APP_ALCHEMY_KEY;
const infuraId = process.env.INFURA_ID;
const useLocalHardhatFork = process.env.REACT_APP_USE_LOCAL_HARDHAT_FORK;

const activeChains = [];
if (process.env.REACT_APP_ENV === "production") {
  activeChains.push(chain.polygon);
} else {
  if (useLocalHardhatFork) {
    activeChains.push(chain.hardhat);
  }
  activeChains.push(chain.goerli, chain.polygonMumbai);
}

export const { chains, provider, webSocketProvider } = configureChains(activeChains, [
  alchemyProvider({ apiKey: alchemyId, priority: 0 }),
  infuraProvider({ apiKey: infuraId, priority: 1 }),
  publicProvider({ priority: 2 }),
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
