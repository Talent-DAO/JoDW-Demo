/* eslint-disable no-undef */
import { AuthenticationResult, useAuthenticateMutation, useChallengeLazyQuery, useRefreshMutation } from "@jaxcoder/lens";
import { useEffect, useState } from "react";
import { useSignMessage, useNetwork, useAccount } from "wagmi";
import { useLocalStorage } from ".";
import { LOCAL_STORAGE_LENS_AUTH_TOKENS } from "../constants";
import onError from "../lib/shared/onError";

const ONE_DAY_MS = 86400000;

type HandleJwtTokenExpiryArgs = {
  token: string | undefined;
  onExpired: () => void;
  onValid?: () => void;
}

const handleJwtTokenExpiry = async ({ token, onExpired, onValid = () => {} }: HandleJwtTokenExpiryArgs) => {
  if (!token) {
    return;
  }

  const currentTime = Math.floor(Date.now() / 1000);
  const jwtToken = Buffer.from(token.substring(token.indexOf(".") + 1, token.lastIndexOf(".")), "base64").toString();
  const expiryTime = JSON.parse(jwtToken)?.exp;
  if (currentTime > (expiryTime || 0)) {
    onExpired();
  } else {
    onValid();
  }
};

export const useLensAuth = (address: string | undefined, deferCondition = () => false) => {
  const [authToken, setAuthToken] = useLocalStorage(LOCAL_STORAGE_LENS_AUTH_TOKENS, null, Date.now() + ONE_DAY_MS);
  const [signature, setSignature] = useState("");
  const { chain } = useNetwork();

  const [getChallenge, { data: challengeData, loading: challengeIsLoading, error: challengeError }] = useChallengeLazyQuery({
    variables: {
      request: {
        address: address
      }
    },
  });

  const [authenticateMutation, { data: authenticationData, loading: authenticationIsLoading, error: authenticationError }] = useAuthenticateMutation({
    variables: {
      request: {
        address: address,
        signature: signature
      }
    },
  });

  const getCurrentAuthToken = () => {
    if (chain?.id && authToken) {
      const token = authToken[chain?.id || 0]?.[address || ""];
      if (token) {
        return token;
      }
      console.log(["No token associated with this chain / wallet", authToken, chain, address]);
    }
    
    return null;
  };

  const { data: signData, error: signError, isLoading: signIsLoading, signMessage } = useSignMessage({
    onError(error) {
      onError({ message: "Sign failed when connecting to Lens!", details: "Please report this: " + error.message });
    },
    onSuccess(data, variables) {
      // Verify the signature
      setSignature(data);
    },
  });

  const [refreshMutation, { data: refreshedTokenData, loading: refreshIsLoading, error: refreshError }] = useRefreshMutation({
    variables: {
      request: {
        refreshToken: getCurrentAuthToken()?.refreshToken || ""
      }
    },
  });

  const connectWithLens = async () => {
    console.log("Connecting with Lens!");
    getChallenge();
  };

  const doSignChallenge = async () => {
    signMessage({
      message: challengeData?.challenge?.text || "",
    });
  };

  const resetAuthToken = () => {
    const data = authToken || null;
    if (data && data[chain?.id || 0] && data[chain?.id || 0][address || ""]) {
      delete data[chain?.id || 0][address || ""];
    }
    setAuthToken(data);
  };

  const doSetAuth = (token: AuthenticationResult | undefined) => {
    const data = authToken || {};
    if (!data[chain?.id || 0]) {
      data[chain?.id || 0] = {};
    }
    data[chain?.id || 0][address || ""] = token;
    setAuthToken(data);
  };

  const doAuthenticate = async () => {
    // Sending the signature to the server to verify
    const result = await authenticateMutation();
    if (result?.data?.authenticate?.accessToken) {
      doSetAuth(result?.data?.authenticate);
    } else {
      onError({ message: "Unable to authenticate with Lens!" });
    }
  };

  const perhapsRefreshToken = async () => {
    if (!authToken) {
      return;
    }
    const currentToken = getCurrentAuthToken();
    
    handleJwtTokenExpiry({
      token: currentToken?.accessToken,
      onExpired: () => {
        console.log("Lens auth access token has expired, refreshing...");
        handleJwtTokenExpiry({
          token: currentToken?.refreshToken,
          onExpired: () => {
            resetAuthToken();
            setSignature("");
            // grab new token
            getChallenge();
          },
          onValid: () => {
            refreshMutation();
          }
        });
      },
    });
  };

  useEffect(() => {
    if (signature) {
      doAuthenticate();
    }
  }, [signature]);

  useEffect(() => {
    if (challengeData) {
      doSignChallenge();
    }
  }, [challengeData]);

  useEffect(() => {
    if (refreshedTokenData) {
      doSetAuth(refreshedTokenData?.refresh);
    }
  }, [refreshedTokenData]);

  useEffect(() => {
    // check whether there is already an auth token
    if (
      deferCondition() ||
      challengeIsLoading ||
      authenticationIsLoading ||
      !signMessage ||
      getCurrentAuthToken() ||
      challengeData
    ) {
      perhapsRefreshToken();
      return;
    }
    // if not, proceed
    connectWithLens();
  }, [address, chain, deferCondition]);

  return authToken;
};

export default useLensAuth;