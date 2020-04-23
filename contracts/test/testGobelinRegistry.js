
const {assert, should, expect} = require("local-chai");
const {ethers, getNamedAccounts} = require("@nomiclabs/buidler");

describe("GobelinRegistry", function () {
  it("should work", async function() {
    const gobelinRegistryContract = await ethers.getContract("GobelinRegistry");
    expect(true).to.be('boolean');
  });
});
