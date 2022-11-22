import { useEffect } from "react";
import { useSignMessage } from "wagmi";
import { Lens } from "lens-protocol";
import { useSelector, useDispatch } from "react-redux";
import { fetchLensAuthTokenStart, fetchLensAuthTokenSuccess, Status } from "../features/user/userSlice";

export const useLensAuth = (address, deferCondition = () => false) => {
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
    onError(error) {
      console.error("sign error: ", error);
    },
    onSuccess(data, variables) {
      // Verify the signature
      VerifyLensSignature(data);
    },
  });

  const connectWithLens = async () => {
    if (props.lensAuth.status === Status.Loading || props.lensAuth.status === Status.Success) {
      //console.log("Already loading, hence skipping...");
      return;
    }

    dispatch(fetchLensAuthTokenStart());
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
    dispatch(fetchLensAuthTokenSuccess({
      accessToken: response?.data?.authenticate?.accessToken,
      refreshToken: response?.data?.authenticate?.refreshToken,
      status: Status.Success,
    }));
  };

  useEffect(() => {
    // check whether there is already an auth token
    if (deferCondition() || isLoading || !signMessage || (address === props.addr && props.lensAuth.accessToken)) {
      return;
    }
    // if not, proceed
    connectWithLens();
  }, [address, deferCondition]);

  return props.lensAuth;
};

export default useLensAuth;