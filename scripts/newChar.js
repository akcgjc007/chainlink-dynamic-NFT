const DnDc = artifacts.require("DnDc");

module.exports = async (callback) => {
  try {
    const dndc = await DnDc.deployed();

    console.log(dndc);

    callback(null);
  } catch (err) {
    callback(err);
  }
};
