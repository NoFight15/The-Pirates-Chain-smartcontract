async function main() {
    const TPTContract = await ethers.getContractFactory("TPT");
    const tpt = await TPTContract.deploy();
  
    console.log("The Pirates Token deployed to:", tpt.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });