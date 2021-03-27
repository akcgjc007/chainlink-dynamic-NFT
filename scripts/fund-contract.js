const MyContract = artifacts.require("DnDc");
const ERC20 = require("@openzeppelin/contracts/build/contracts/ERC20.json");

/*
  This script is meant to assist with funding the requesting
  contract with LINK. It will send 1 LINK to the requesting
  contract for ease-of-use. Any extra LINK present on the contract
  can be retrieved by calling the withdrawLink() function.
*/

module.exports = async (callback) => {
  try {
    const mc = await MyContract.deployed();
    const amount = (10 ** 18).toString();
    const tokenAddress = "0x01be23585060835e02b77ef475b0cc51aa1e0709";
    const token = new web3.eth.Contract(ERC20.abi, tokenAddress);
    console.log("Funding contract name:", mc.contractName);
    console.log("Funding contract addr:", mc.address);
    myAccount = (await web3.eth.getAccounts())[0];
    // const tx = await token.methods.transfer(mc.address, amount).send({from: myAccount});
    // console.log(tx);

    console.log("ERC20 balance: ", await token.methods.balanceOf(mc.address).call());

    callback(null);
  } catch (err) {
    callback(err);
  }
};
