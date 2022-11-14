const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const factoryCompiled = require("./build/CampaignFactory.json");

const provider = new HDWalletProvider(
  "sauce lizard immense slogan machine daring drum brown onion large foil wife",
  "https://goerli.infura.io/v3/f2ba63747d5a405185da7123f1a2faa5"
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log(
    "Attempting to deploy Campaign Factory from account",
    accounts[0]
  );

  const factory = await new web3.eth.Contract(
    JSON.parse(factoryCompiled.interface)
  )
    .deploy({ data: factoryCompiled.bytecode })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("Campaign factory deployed to", factory.options.address);
  provider.engine.stop;
};
deploy();
