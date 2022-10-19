/* eslint-disable no-undef */
/* eslint-disable no-console */
import { Lens } from "lens-protocol";
import React from "react";
import { useAccount, useSignMessage } from "wagmi";

export type TLensAuthChallengeResult = {
  data: {
    challenge: {
      text: string;
    };
  };
  error: any | undefined;
};

export type TLensAuthResponse = {
  authenticate: {
    accessToken: string;
    refreshToken: string;
  };
};

const LensLogin = () => {
  const { address } = useAccount();
  const [accessToken, setAccessToken] = React.useState<string>("");
  const [refreshToken, setRefreshToken] = React.useState<string>("");
  const { data, error, isLoading, signMessage } = useSignMessage({
    onSuccess(data, variables) {
      console.log(
        "data => ",
        data,
        "variables => ",
        variables,
      );
      // Verify the signature
      VerifySignature(data);
    },
    onError(error, variables) {
      console.error("error => ", error, "variables => ", variables);
    }
  });

  const authenticate = async () => {
    console.log("authenticating");
    // Getting the challenge from the server
    await Lens.getChallenge(address ?? "")
      .then((res: any) => {
        if (res.data.challenge) {
          console.log("res => ", res);
          let message = res.data.challenge.text;

          // Signing the challenge with the user's wallet
          signMessage({ message });
        }
      });
  };

  const VerifySignature = async (sign: any) => {
    // Sending the signature to the server for verification
    const response: any = await Lens.Authenticate(address ?? "", sign);
    setAccessToken(response.data.authenticate.accessToken);
    setRefreshToken(response.data.authenticate.refreshToken);
    console.log(response);

    // If the signature is valid, the server will return a JWT token
  };

  const verifyToken = () => {
    Lens.verify(accessToken).then((res: any) => {
      console.log(res);
    });
  };

  const getNewToken = () => {
    Lens.RefreshToken(refreshToken).then((res: any) => {
      // New token (access and refresh) will be returned
      setRefreshToken(res.data.refresh.refreshToken);
      console.log("new token => ", res);
    });
  };

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-black font-bold m-2 py-2 px-4 rounded-lg border-2"
        onClick={authenticate}
      >
        Authenticate Lens Profile
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-black font-bold m-2 py-2 px-4 rounded-lg border-2"
        onClick={getNewToken}>
        Get new tokens
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-black font-bold m-2 py-2 px-4 rounded-lg border-2"
        onClick={verifyToken}
      >
        Verify Token
      </button>
    </div>
  );
};

export default LensLogin;
