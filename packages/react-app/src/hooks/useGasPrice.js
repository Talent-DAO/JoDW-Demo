/* eslint-disable no-undef */
import axios from "axios";
import { usePoller } from "eth-hooks";
import { useState } from "react";

const useGasPrice = (targetNetwork, speed) => {
  const [gasPrice, setGasPrice] = useState();
  const loadGasPrice = async () => {
    // eslint-disable-next-line no-prototype-builtins
    if (targetNetwork.hasOwnProperty("gasPrice")) {
      setGasPrice(targetNetwork.gasPrice);
    } else {
      axios
        .get("https://ethgasstation.info/json/ethgasAPI.json")
        .then(response => {
          const newGasPrice = response.data[speed || "fast"] * 100000000;
          if (newGasPrice !== gasPrice) {
            setGasPrice(newGasPrice);
          }
        })
        .catch(error => console.log(error));
    }
  };

  usePoller(loadGasPrice, 39999);
  return gasPrice;
};

export default useGasPrice;
