const {getNamedAccounts, ethers, deployments} = require('@nomiclabs/buidler');

async function main() {
    const {deployer} = await getNamedAccounts();
    const gobelinRegistryContract = await ethers.getContract(GobelinRegistry);
    // TODO seed with data
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });