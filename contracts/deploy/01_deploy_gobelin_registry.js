module.exports = async ({getNamedAccounts, deployments}) => {
  const {deployer} = await getNamedAccounts();
  const {deploy} = deployments;

  const gobelinRegistryDeployResult = await deploy("GobelinRegistry",
    {from: deployer}
  );
};
