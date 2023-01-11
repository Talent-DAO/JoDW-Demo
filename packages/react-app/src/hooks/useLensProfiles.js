import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useApolloClient } from "@apollo/client";
import { ProfilesDocument } from "@jaxcoder/lens";

export const useLensProfiles = () => {
  const { address } = useAccount();
  const apolloClient = useApolloClient();
  const [availableLensProfiles, setAvailableLensProfiles] = useState(null);

  const findExistingLensProfiles = async () => {
    const results = await apolloClient.query({
      query: ProfilesDocument,
      variables: { request: { ownedBy: [address] } }, // testing with: "0x3A5bd1E37b099aE3386D13947b6a90d97675e5e3"
    });
    setAvailableLensProfiles(results?.data.profiles?.items); // not paginating
  };

  useEffect(() => {
    findExistingLensProfiles();
  }, [address]);

  return { profiles: availableLensProfiles };
};

export default useLensProfiles;
