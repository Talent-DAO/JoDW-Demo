import React, { useEffect, useState } from "react";
import { useSignMessage } from "wagmi";
import { Lens } from "lens-protocol";
import { useSelector, useDispatch } from "react-redux";
import { fetchLensAuthTokenStart, fetchLensAuthTokenSuccess, Status } from "../features/user/userSlice";

export const useLensAuth = (address, deferCondition = () => false) => {
  const [isInProgress, setIsInProgress] = useState(false);
  const dispatch = useDispatch();
  const props = useSelector((state) => {
    const lensAuth = state.user.lensAuth;
    const addr = state.user.user.walletId;

    return {
      lensAuth,
      addr
    };
  });
  
  const { data, error, isLoading, signMessage } = useSignMessage({
    onSuccess(data, variables) {
      // Verify the signature
      VerifyLensSignature(data);
    },
  });

  const connectWithLens = async () => {
    if (isInProgress) {
      return;
    }
    setIsInProgress(true);
    dispatch(fetchLensAuthTokenStart());
    // Getting the challenge from the server
    const data = await Lens.getChallenge(address);
    let message = data.data.challenge.text;
    // Signing the challenge with the wallet
    signMessage({ message });
  };

  const VerifyLensSignature = async (sign) => {
    // Sending the signature to the server to verify
    const response = await Lens.Authenticate(address, sign);
    dispatch(fetchLensAuthTokenSuccess({
      accessToken: response?.data?.authenticate?.accessToken,
      refreshToken: response?.data?.authenticate?.refreshToken,
      status: Status.Success,
    }));
    setIsInProgress(false);
  };

  useEffect(() => {
    // check whether there is already an auth token
    if (deferCondition() || (address === props.addr && props.lensAuth.accessToken)) {
      return;
    }
    // if not, proceed
    connectWithLens();
  }, [address, deferCondition]);

  return props.lensAuth;
};

export default useLensAuth;