const {expect} = require("chai-setup");
const {ethers, deployments} = require("@nomiclabs/buidler");

describe("GobelinRegistry", function () {
  it("should work", async function () {
    await deployments.fixture();
    const gobelinRegistryContract = await ethers.getContract("GobelinRegistry");
    expect(gobelinRegistryContract.address).to.be.a("string");
  });

  it("should fails", async function () {
    await deployments.fixture();
    const gobelinRegistryContract = await ethers.getContract("GobelinRegistry");
    expect(gobelinRegistryContract.fails("testing")).to.be.revertedWith("fails");
  });
});
