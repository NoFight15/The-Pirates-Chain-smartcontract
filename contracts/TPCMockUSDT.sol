//contracts/TPCMockUSDT.sol
//SPDX-License-IDentifier: MIT

pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TPCMockUSDT is ERC20 {
    constructor(uint256 initialSupply) ERC20("The Pirates Chain USDT", "TPCSDT") {
        _mint(msg.sender, initialSupply);
    }
}