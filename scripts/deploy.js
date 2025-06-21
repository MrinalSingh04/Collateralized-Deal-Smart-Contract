const hre = require("hardhat");

async function main() {
  const [owner, partyB] = await hre.ethers.getSigners();

  const CollateralDeal = await hre.ethers.getContractFactory("CollateralDeal");
  const deal = await CollateralDeal.deploy(partyB.address); // No .deployed() in Ethers v6

  console.log(`Contract deployed to: ${deal.target}`); // use .target instead of .address
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
