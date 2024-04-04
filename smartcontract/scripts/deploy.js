const hre = require("hardhat");

async function main() {
  const Kanban = await hre.ethers.getContractFactory("Kanban");
  const kanban = await Kanban.deploy();
  await kanban.deployed();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
