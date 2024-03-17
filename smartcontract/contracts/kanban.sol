// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Kanban {
    //Create Struct and Mappping for request, transaction & name

    struct user {
        uint256 amount;
        address userAddressWallet;
    }

    // mapping(address => request[]) requests;
    mapping(address => user[]) history;
    mapping(address => user[]) users;

    //user subscribe premium
    function subscribeRequestPremium(
        address sender,
        address receiver
    ) public payable {
        // pay with one matic
        uint256 toPay = msg.value;

        // check if the sender is not the owner
        require(sender != receiver, "Contract owner cannot pay themselves");

        payable(receiver).transfer(toPay);

        addHistorySubscribePremium(sender, toPay);
    }

    // history user subscribe premium
    function addHistorySubscribePremium(
        address sender,
        uint256 _amount
    ) private {
        // history sender
        user memory newSend;
        newSend.amount = _amount;
        newSend.userAddressWallet = sender;
        history[sender].push(newSend);
    }

    //Get user historic transactions subscribe premium

    function getMyHistorySubscribePremium(
        address _sender
    ) public view returns (user[] memory) {
        return history[_sender];
    }
}
