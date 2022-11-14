import web3 from './web3';
import factoryCompiled from "./build/CampaignFactory.json"

const instance = new web3.eth.Contract(
    JSON.parse(factoryCompiled.interface),
    "0x1eEA4C931ffdE160b1A557E143523D3308ab405c"
)
export default instance