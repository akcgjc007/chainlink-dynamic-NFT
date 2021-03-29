const DnDc = artifacts.require("DnDc");

const RINKEBY_VRF_COORDINATOR = "0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B";
const RINKEBY_LINK_TOKEN = "0x01be23585060835e02b77ef475b0cc51aa1e0709";
const RINKEBY_KEYHASH =
  "0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311";
  const fee = (10 ** 17).toString();
const tokenURI = `https://raw.githubusercontent.com/akcgjc007/chainlink-dynamic-NFT/main/meta/0.json`;
  
module.exports = async (deployer, network, [defaultAccount]) => {
  
  await deployer.deploy(
    DnDc,
    RINKEBY_VRF_COORDINATOR,
    RINKEBY_LINK_TOKEN,
    RINKEBY_KEYHASH,
    fee,
    tokenURI
  );

  // let dndc = await DnDc.deployed();
  // const name = "Some japanese knight";
  // const userSeed = 0;
  // await dndc.requestNewRandomCharacter(userSeed, name);  
};
