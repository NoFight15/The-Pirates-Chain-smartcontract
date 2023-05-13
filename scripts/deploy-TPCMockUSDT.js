const hre= require("hardhat")

async function main(){
    let totalSupply = ethers.utils.parseUnits("1000000000000","ether")

    const TPCMockUSDT = await ethers.getContractFactory("TPCMockUSDT")
    const TPCMockUSDTContract = await TPCMockUSDT.deploy(totalSupply)

    await TPCMockUSDTContract.deployed();

    console.log("TPCMockUSDT deployed to: ", TPCMockUSDTContract.address);
}

main()
    .then(()=> process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
      });