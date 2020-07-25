pragma solidity ^0.5.0;

import "./Ownable.sol";

interface Winnable {
    function getWinner() external view returns(address);
}

contract Voter is Ownable, Winnable {
    
    mapping (address => uint) votes;
    address[] public  candidates;  //#

    event Voted(address voter, address candidate);

    function addCandidate(address candidateId) onlyOwner external {
        candidates.push(candidateId);
    }
    
    function vote(address id) external {
        votes[id] = votes[id] + 1;
        emit Voted(msg.sender, id);
    }
    
    function getVotes(address id) external view returns(uint) {
        return votes[id];
    }
    
    function getWinner() external view returns(address) {
        require(candidates.length > 0, "There are no candidates bro");
        address maxVotesCandidate = candidates[0];
        for (uint i = 1; i < candidates.length; i=i+1) {
            if ( votes[candidates[i]]  > votes[maxVotesCandidate] ) {
                maxVotesCandidate = candidates[i];
            }
        }
        return maxVotesCandidate;
    }
}