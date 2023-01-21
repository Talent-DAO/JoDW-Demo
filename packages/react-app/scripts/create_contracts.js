/* eslint-disable no-undef */
const { existsSync, writeFileSync } = require("fs");

if (!existsSync("./src/contracts/hardhat_contracts.json")) {
  try {
    writeFileSync("./src/contracts/hardhat_contracts.json", JSON.stringify({}));

    console.log("src/contracts/hardhat_contracts.json created.");
  } catch (error) {
    console.log(error);
  }
}
