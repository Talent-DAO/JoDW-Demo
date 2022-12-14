import {
  BroadcastDocument,
  BroadcastRequest,
  CreatePublicPostRequest,
} from "@jodw/lens";
import { writeContract, signTypedData } from "@wagmi/core";
import { LensHubProxy } from "../../../contracts/LensHubProxy";
import { defaultAbiCoder } from "ethers/lib/utils";
import getSignature from "../../shared/getSignature";
import { compositeClient as apolloClient } from "../../../utils/graphqlClient";
import onError from "../../shared/onError";
import { pollUntilIndexed } from "../indexer/transactions";

export const broadcastRequest = async (request: BroadcastRequest) => {
  const result = await apolloClient.mutate({
    mutation: BroadcastDocument,
    variables: {
      request,
    },
  });

  return result.data?.broadcast;
};

export const postViaContract = async (createPostRequest: CreatePublicPostRequest) => {
  const result = await writeContract({
    mode: "recklesslyUnprepared",
    contractInterface: LensHubProxy,
    addressOrName: "0x60Ae865ee4C725cd04353b5AAb364553f56ceF82", // TODO: move to env config
    functionName: "post",
    args: [
      {
        profileId: createPostRequest?.profileId,
        contentURI: createPostRequest?.contentURI,
        collectModule: "0x0BE6bD7092ee83D44a6eC1D949626FeE48caB30c",
        collectModuleInitData: defaultAbiCoder.encode(["bool"], [true]),
        referenceModule: "0x0000000000000000000000000000000000000000",
        referenceModuleInitData: [],
      },
    ]
  });
  console.log(["post result: ", result]);
  return null;
};

export const broadcastTypedData = async (generatedData: any, onSuccess: () => void, trackTx = true) => {
  const { id, typedData } = generatedData;
  try {
    const signature = await signTypedData(getSignature(typedData));

    const broadcastResult = await broadcastRequest({
      id: id,
      signature,
    });
    console.log("broadcastResult", broadcastResult);

    if (broadcastResult.__typename !== "RelayerResult") {
      onError({ message: "Action failed!", details: "Please retry. Error: broadcast failed." });
    }

    if (!trackTx) {
      onSuccess();
      return;
    }
    
    try {
      await pollUntilIndexed({ txId: broadcastResult.txId });
      onSuccess();
    } catch (err) {
      onError({ message: "Action failed!", details: "Please retry. Error: " + err });
    }
  } catch (err) {
    console.error("Broadcast error - ignoring.", err);
  }
};