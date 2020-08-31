import {getNamedAccounts, ethers} from '@nomiclabs/buidler';

const names = [
  'Hetrorlig Oakenbrow',
  'Dermerlug Brewcloak',
  'Nalol Blackbraids',
  'Webir Goldenback',
  'Dholdrec Chaosgrip',
  'Siggog Strongjaw',
  'Krostol Snowtank',
  'Rumit Dragonarmour',
  'Nemnad Thunderbrow',
  'Gagham Grimbelly',
];

// TODO move to util
const waitFor = <T>(p: Promise<{wait: () => Promise<T>}>) => p.then((tx) => tx.wait());

async function main() {
  for (let i = 0; i < 4; i++) {
    const {others} = await getNamedAccounts();
    for (let i = 0; i < 4; i++) {
      const gobelinRegistryContract = await ethers.getContract('GobelinRegistry', others[i]);
      await waitFor(gobelinRegistryContract.setName(names[i]));
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
