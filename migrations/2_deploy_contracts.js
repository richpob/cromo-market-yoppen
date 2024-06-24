const CromoMarket = artifacts.require("CromoMarket");

module.exports = function(deployer) {
  const yoppenTokenAddress = '0x38bC18AE393a7e560F8C26c1490f06D0EE069B73';
  deployer.deploy(CromoMarket, yoppenTokenAddress);
};
