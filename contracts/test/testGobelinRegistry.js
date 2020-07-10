const {assert, should, expect} = require("chai-setup");
const {ethers, getNamedAccounts, deployments} = require("@nomiclabs/buidler");

describe("GobelinRegistry", function () {
  it("should work", async function () {
    await deployments.fixture();
    const gobelinRegistryContract = await ethers.getContract("GobelinRegistry");
    expect(true).to.be.a("boolean");
    expect(gobelinRegistryContract.address).to.be.a("string");
  });
});
