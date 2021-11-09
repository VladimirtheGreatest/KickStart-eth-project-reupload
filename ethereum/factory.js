import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x28CcC8387CF33Df604B424db41E088B4B4Ac6d0E"
);

export default instance;
