/* eslint-disable no-undef */
import { useAuthenticateMutation, useChallengeLazyQuery, useRefreshMutation } from "@jodw/lens";
import { useEffect, useState } from "react";
import { useSignMessage } from "wagmi";
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
        refreshToken: authToken?.refreshToken || ""
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

  const doAuthenticate = async () => {
    // Sending the signature to the server to verify
    const result = await authenticateMutation();
    if (result?.data?.authenticate?.accessToken) {
      setAuthToken(result?.data?.authenticate);
    } else {
      onError({ message: "Unable to authenticate with Lens!" });
    }
  };

  const perhapsRefreshToken = async () => {
    if (!authToken) {
      return;
    }
    
    handleJwtTokenExpiry({
      token: authToken?.accessToken,
      onExpired: () => {
        console.log("Lens auth access token has expired, refreshing...");
        refreshMutation();
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
      setAuthToken(refreshedTokenData?.refresh);
    }
  }, [refreshedTokenData]);

  useEffect(() => {
    // check whether there is already an auth token
    if (
      deferCondition() ||
      challengeIsLoading ||
      authenticationIsLoading ||
      !signMessage ||
      authToken ||
      challengeData
    ) {
      perhapsRefreshToken();
      return;
    }
    // if not, proceed
    connectWithLens();
  }, [address, deferCondition]);

  return authToken;
};

export default useLensAuth;