import { create } from "ipfs-http-client";
import { INFURA_PROJECT_ID, INFURA_SECRET, IPFS_URI, IPFS_PROTOCOL, IPFS_AUTH_REQUIRED } from "../constants";

const projectId = INFURA_PROJECT_ID;
const secret = INFURA_SECRET;


if (!projectId || !secret) {
  throw new Error("Must define INFURA_PROJECT_ID and INFURA_SECRET in the .env to run this");
}

const client = create({
  host: IPFS_URI,
  port: 5001,
  protocol: IPFS_PROTOCOL,
  headers: IPFS_AUTH_REQUIRED ? {
    authorization: `Basic ${Buffer.from(`${projectId}:${secret}`, "utf-8").toString("base64")}`,
  } : null,
});

export const uploadIpfs = async (data) => {
  const result = await client.add(JSON.stringify(data));

  console.log("upload result ipfs", result);
  return result;
};

export const uploadIpfsRaw = async (data) => {
  const result = await client.add(data);

  console.log("upload result ipfs raw", result);
  return result;
};

export const ipfsGetByPath = async (path) => {
  const result = await client.get(path);
  return Buffer.from(result).toString("utf8");
};