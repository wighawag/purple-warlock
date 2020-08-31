import {expect} from './chai-setup';
import {ethers, deployments} from '@nomiclabs/buidler';

describe('GobelinRegistry', function () {
  it('should work', async function () {
    await deployments.fixture();
    const gobelinRegistryContract = await ethers.getContract('GobelinRegistry');
    expect(gobelinRegistryContract.address).to.be.a('string');
  });

  it('should fails', async function () {
    await deployments.fixture();
    const gobelinRegistryContract = await ethers.getContract('GobelinRegistry');
    expect(gobelinRegistryContract.fails('testing')).to.be.revertedWith('fails');
  });

  it('should return 2 as id', async function () {
    await deployments.fixture();
    const gobelinRegistryContract = await ethers.getContract('GobelinRegistry');
    expect(await gobelinRegistryContract.getId()).to.equal(2);
  });
});
