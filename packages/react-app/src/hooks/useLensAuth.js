import { useEffect } from "react";
import { useSignMessage } from "wagmi";
import { Lens } from "lens-protocol";
import { useLocalStorage } from ".";

export const useLensAuth = (address, deferCondition = () => false) => {
  const [authToken, setAuthToken] = useLocalStorage("lens-auth-token");
  
  const { data, error, isLoading, signMessage } = useSignMessage({
    onError(error) {
      console.error("sign error: ", error);
    },
    onSuccess(data, variables) {
      // Verify the signature
      VerifyLensSignature(data);
    },
  });

  const connectWithLens = async () => {
    // Getting the challenge from the server
    try {
      const data = await Lens.getChallenge(address);
      let message = data.data.challenge.text;
      // // Signing the challenge with the wallet
      signMessage({ message });
    } catch (error) {
      console.error("Error connecting with Lens!", error);
    }
  };

  const VerifyLensSignature = async (sign) => {
    // Sending the signature to the server to verify
    const response = await Lens.Authenticate(address, sign);
    if (response?.data?.authenticate?.accessToken) {
      setAuthToken(response?.data?.authenticate?.accessToken);
    } else {
      console.error(["verification failed!", response]);
    }
  };

  useEffect(() => {
    // check whether there is already an auth token
    if (deferCondition() || isLoading || !signMessage || authToken) {
      return;
    }
    // if not, proceed
    connectWithLens();
  }, [address, deferCondition]);

  return authToken;
};

export default useLensAuth;