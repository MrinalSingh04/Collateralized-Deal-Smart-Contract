const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CollateralDeal", function () {
  let contract;
  let owner;
  let partyB;

  beforeEach(async () => {
    [owner, partyB] = await ethers.getSigners();
    const CollateralDeal = await ethers.getContractFactory("CollateralDeal");
    contract = await CollateralDeal.connect(owner).deploy(partyB.address);
    // Ethers v6: deployed() is not needed
  });

  it("should accept deposits from both parties", async () => {
    await contract.connect(owner).depositCollateral({ value: ethers.parseEther("1") });
    await contract.connect(partyB).depositCollateral({ value: ethers.parseEther("1") });

    const contractBalance = await ethers.provider.getBalance(contract.target);
    expect(contractBalance).to.equal(ethers.parseEther("2"));
  });

  it("should return funds on success", async () => {
    await contract.connect(owner).depositCollateral({ value: ethers.parseEther("1") });
    await contract.connect(partyB).depositCollateral({ value: ethers.parseEther("1") });

    await contract.connect(owner).markDealComplete();
    const contractBalance = await ethers.provider.getBalance(contract.target);
    expect(contractBalance).to.equal(0n);
  });

  it("should give total funds to other party on default", async () => {
    await contract.connect(owner).depositCollateral({ value: ethers.parseEther("1") });
    await contract.connect(partyB).depositCollateral({ value: ethers.parseEther("1") });

    await contract.connect(partyB).markDealDefault(owner.address);
    const contractBalance = await ethers.provider.getBalance(contract.target);
    expect(contractBalance).to.equal(0n);
  });
});
