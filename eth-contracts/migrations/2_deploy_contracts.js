var voterArtifacts = artifacts.require("./Voter.sol");

module.exports = function(deployer) {
  deployer.deploy(voterArtifacts);
};
