import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x22dB1C073d03C8125a5E328b3d5E8dbDD4c72399"
);

export default instance;
