import react from "react";
import Campaign from "../ethereum/build/Campaign.json";
import web3 from "./web3";

const instance = (address) => {
  return new web3.eth.Contract(JSON.parse(Campaign.interface), address);
};
export default instance;
