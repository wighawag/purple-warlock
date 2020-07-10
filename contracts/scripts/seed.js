const {getNamedAccounts, ethers} = require("@nomiclabs/buidler");

async function main() {
  const {others} = await getNamedAccounts();
  for (let i = 0; i < 4; i++) {
    const gobelinRegistryContract = await ethers.getContract("GobelinRegistry", others[i]);
    await gobelinRegistryContract.setName("" + Math.floor(Date.now() / 1000));
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
