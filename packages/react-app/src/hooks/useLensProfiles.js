import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useSelector } from "react-redux";
import { useApolloClient } from "@apollo/client";
import { ProfilesDocument } from "@jodw/lens";
import { Status } from "../features/user/userSlice";

export const useLensProfiles = () => {
  const { address } = useAccount();
  const apolloClient = useApolloClient();
  const lensAuthData = useSelector(state =>
    state.user.lensAuth
  );
  const [availableLensProfiles, setAvailableLensProfiles] = useState(null);

  const findExistingLensProfiles = async () => {
    if (lensAuthData?.status === Status.Loading) {
      return;
    }
    const results = await apolloClient.query({
      query: ProfilesDocument,
      variables: { request: { ownedBy: [address] } }, // testing with: "0x3A5bd1E37b099aE3386D13947b6a90d97675e5e3"
      context: {
        headers: {
          "x-access-token": lensAuthData?.accessToken ? `Bearer ${lensAuthData?.accessToken}` : "",
        },
      }
    });
    setAvailableLensProfiles(results?.data.profiles?.items); // not paginating
  };

  useEffect(() => {
    findExistingLensProfiles();
  }, [address, lensAuthData]);

  return { profiles: availableLensProfiles };
};

export default useLensProfiles;
