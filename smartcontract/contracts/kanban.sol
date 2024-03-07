// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Kanban{

//Define the Owner of the smart contract 

address public owner;

constructor(){
        owner = msg.sender;
}

//Create Struct and Mappping for request, transaction & name


struct request {
        address requestor;
        uint256 amount;
        string name;
}

struct sendReceive {
        string action;
        uint256 amount;
        address otherPartyAddress;
        string otherPartyName;
}

struct userName {
        string name;
        bool hasName;
}

mapping(address => userName) names;
mapping(address  => request[]) requests;
mapping(address  => sendReceive[]) history;


//Add a name to wallet address

function addName(string memory _name) public {
    
    userName storage newUserName = names[msg.sender];
    newUserName.name = _name;
    newUserName.hasName = true;

}


//Create a Request

function createRequest(address user, uint256 _amount) public {
        
    request memory newRequest;
    newRequest.requestor = msg.sender;
    newRequest.amount = _amount;
    if(names[msg.sender].hasName){
        newRequest.name = names[msg.sender].name;
    }
    requests[user].push(newRequest);

}


//Pay a Request

function payRequest(uint256 _request) public payable {
    
    require(_request < requests[msg.sender].length, "No Such Request");
    request[] storage myRequests = requests[msg.sender];
    request storage payableRequest = myRequests[_request];
        
    uint256 toPay = payableRequest.amount * 1000000000000000000;
    require(msg.value == (toPay), "Pay Correct Amount");

    payable(payableRequest.requestor).transfer(msg.value);

    // Add to history of both parties
    addHistorySubscribePremium(msg.sender, payableRequest.requestor, payableRequest.amount);

    myRequests[_request] = myRequests[myRequests.length-1];
    myRequests.pop();

}

function addHistorySubscribePremium(address sender, address receiver, uint256 _amount) private {
    // history of sender
    sendReceive memory newSend;
    newSend.action = "Send";
    newSend.amount = _amount;
    newSend.otherPartyAddress = receiver;
    if(names[receiver].hasName){
        newSend.otherPartyName = names[receiver].name;
    }
    history[sender].push(newSend);
}


//Get all requests sent to a User

function getMyRequests(address _user) public view returns(
         address[] memory, 
         uint256[] memory, 
         string[] memory
){

        address[] memory addrs = new address[](requests[_user].length);
        uint256[] memory amnt = new uint256[](requests[_user].length);
        string[] memory nme = new string[](requests[_user].length);
        
        for (uint i = 0; i < requests[_user].length; i++) {
            request storage myRequests = requests[_user][i];
            addrs[i] = myRequests.requestor;
            amnt[i] = myRequests.amount;
            nme[i] = myRequests.name;
        }
        
        return (addrs, amnt, nme);        
}


//Get all historic transactions user has been apart of


function getMyHistory(address _user) public view returns(sendReceive[] memory){
        return history[_user];
}

function getMyName(address _user) public view returns(userName memory){
        return names[_user];
}

}