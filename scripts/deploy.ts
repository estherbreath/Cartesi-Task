import { ethers } from "hardhat";

async function main() {

  const token = await ethers.deployContract("MyToken", ["0xc408235a9A01767d70B41C98d92F2dC7B0d959f4"]);

  await token.waitForDeployment();

  console.log(
    `MyToken contract has been successfully deployed to ${token.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
