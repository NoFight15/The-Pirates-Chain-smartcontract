require("@nomiclabs/hardhat-waffle");

task("accounts", "Prints the list of accounts", async(taskArgs, hre) =>{
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
}
});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {

  defaultNetwork: "hardhat",
  networks: {
    hardhat:{
      accounts: [{
        privateKey: "04a7880546c5337841dd50c1fe7b68f77168b0a5550fc662f9524ffe9b565452",
        balance: "1000000000000000000"
     },
     {
      privateKey: "0x8166f546bab6da521a8369cab06c5d2b9e46670292d85c875ee9ec20e84ffb61",
      balance: "1000000000000000000"
   },
   {
    privateKey: "0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e",
    balance: "1000000000000000000"
 }]
    }
  },
  solidity: "0.8.18",
};
