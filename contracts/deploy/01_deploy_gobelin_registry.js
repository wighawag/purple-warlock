module.exports = async ({getNamedAccounts, deployments}) => {
  const {deployer} = await getNamedAccounts();
  const {deployIfDifferent, log} = deployments;

  const gobelinRegistryDeployResult = await deployIfDifferent(
    ["data"],
    "GobelinRegistry",
    {from: deployer},
    "GobelinRegistry"
  );
  if (gobelinRegistryDeployResult.newlyDeployed) {
    const gobelinRegistryContract = gobelinRegistryDeployResult.contract;
    log(
      `GobelinRegistrydeployed at ${gobelinRegistryContract.address} for ${gobelinRegistryDeployResult.receipt.gasUsed} gas`
    );
  }
};
