// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Kanban {
    //Define the Owner of the smart contract

    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }

    //Create Struct and Mappping for request, transaction & name

    struct request {
        address requestor;
        uint256 amount;
    }

    struct sendReceive {
        string action;
        uint256 amount;
        address otherPartyAddress;
    }

    mapping(address => request[]) requests;
    mapping(address => sendReceive[]) history;

    //Create a user subscribe request premium

    function createSubscribeRequestPremium() public {
        // tìm cách yêu cầu ngược lại
        request memory newRequest;
        // pay for owner web app
        newRequest.requestor = owner;
        newRequest.amount = 1000000000000000000 wei;
        requests[msg.sender].push(newRequest);
    }

    //user subscribe premium

    function subscribeRequestPremium() public payable {
        request[] storage myRequests = requests[owner];
        request storage payableRequest = myRequests[0];
        // owner cannot pay themselves
        require(msg.sender != owner, "Contract owner cannot pay themselves");
        // request only be payable to the contract owner
        require(
            payableRequest.requestor == owner,
            "Request is only payable to the contract owner"
        );
        // pay with one matic
        uint256 toPay = 1000000000000000000 wei;
        require(msg.value == (toPay), "Pay Correct Amount");

        payable(owner).transfer(toPay);

        addHistorySubscribePremium(msg.sender, payableRequest.amount);

        myRequests[0] = myRequests[myRequests.length - 1];
        myRequests.pop();
    }

    // history user subscribe premium
    function addHistorySubscribePremium(
        address sender,
        uint256 _amount
    ) private {
        // history sender
        sendReceive memory newSend;
        newSend.action = "Send";
        newSend.amount = _amount;
        history[sender].push(newSend);
    }

    //Get user requests sent to a subscribe premium

    function getMyRequestsSubscribePremium(
        address _user
    ) public view returns (address[] memory, uint256[] memory) {
        address[] memory addrs = new address[](requests[_user].length);
        uint256[] memory amnt = new uint256[](requests[_user].length);

        for (uint i = 0; i < requests[_user].length; i++) {
            request storage myRequests = requests[_user][i];
            addrs[i] = myRequests.requestor;
            amnt[i] = myRequests.amount;
        }

        return (addrs, amnt);
    }

    //Get user historic transactions subscribe premium

    function getMyHistorySubscribePremium(
        address _user
    ) public view returns (sendReceive[] memory) {
        return history[_user];
    }

}
