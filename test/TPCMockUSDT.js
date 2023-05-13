//contracts/TPCMockUSDT.sol
//SPDX-License-Identifier: MIT


const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const {ethers } = require("hardhat");

describe("TPCMockUSDT", function () {
    let TPCMockUSDTContract, deployer, user1, user2
    
    let totalSupply = ethers.utils.parseUnits("1000000000000","ether")
    let fiftyMillion = ethers.utils.parseUnits("50000000", "ether")
    let tenMillion = ethers.utils.parseUnits("10000000", "ether")

    it("Should deploy MockUSDT conract", async() =>{
        [deployer, user1, user2] = await ethers.getSigners()

        const MockUSDT = await ethers.getContractFactory("MockUSDT")
        TPCMockUSDTContract = await MockUSDT.deploy(totalSupply)
        await TPCMockUSDTContract.deployed()
        const currentTotalSupply = await TPCMockUSDTContract.totalSupply()
        expect(await TPCMockUSDTContract.totalSupply()).to.equal(totalSupply)
        console.log('currentTotalSUpply',currentTotalSupply)
    })
    
    it("Should check the balance of deployer", async() =>{
        const currentBalanceOfDeployer = await TPCMockUSDTContract.balanceOf(deployer.address)
        console.log('deployer.address', deployer.address)
        console.log('currentBalanceOfDeployer', currentBalanceOfDeployer)
    })

    it("Should transer 50m to other user", async() => {
        const beforeBalanceOfOtherUser = await TPCMockUSDTContract.balanceOf("0x5e7f567fb20b91e523127a569d8dcb522c913cfe")
        const transferToOtherUser = await TPCMockUSDTContract.transfer("0x5e7f567fb20b91e523127a569d8dcb522c913cfe" , fiftyMillion)
        await transferToOtherUser.wait()
        const afterBalanceOfOtherUser = await TPCMockUSDTContract.balanceOf("0x5e7f567fb20b91e523127a569d8dcb522c913cfe")
        console.log('otherUsers', '0x5e7f567fb20b91e523127a569d8dcb522c913cfe')
        console.log('beforeBalanceOfOtherUSer', beforeBalanceOfOtherUser)
        console.log('afterBalanceOfOtherUser', afterBalanceOfOtherUser)
    })

    it("Should transer 50m to other user on behalf of deployer", async() => {

        const beforeUserAllowance = await TPCMockUSDTContract.allowance(deployer.address, user1.address)
        console.log('beforeUserAllowance', beforeUserAllowance)
        const approvedUser1 = await TPCMockUSDTContract.connect(deployer).approve(user1.address, tenMillion)
        await approvedUser1.wait()
        const afterUserAllowance = await TPCMockUSDTContract.allowance(deployer.address, user1.address)
        console.log('afterAllowance', afterUserAllowance)

        const balanceOfUser1 = await TPCMockUSDTContract.balanceOf(user1.address)
        console.log('balanceOfUser1', balanceOfUser1)

        const beforeBalanceOfUser2 = await TPCMockUSDTContract.balanceOf(user2.address)
        console.log("beforeBalanceOfUser2", beforeBalanceOfUser2)

        const transferFromDeployerByUser1 = await TPCMockUSDTContract.connect(user1).transferFrom(deployer.address, user2.address, tenMillion)
        await transferFromDeployerByUser1.wait()

        const afterBalanceOfUser2 = await TPCMockUSDTContract.balanceOf(user2.address)
        console.log("afterBalanceOfUser2", afterBalanceOfUser2) 
    })
}); 