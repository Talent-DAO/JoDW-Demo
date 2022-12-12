import {
  CreatePublicPostRequest,
} from "@jodw/lens";
import { writeContract } from "@wagmi/core";
import { LensHubProxy } from "../../../contracts/LensHubProxy";
import { defaultAbiCoder } from "ethers/lib/utils";

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
