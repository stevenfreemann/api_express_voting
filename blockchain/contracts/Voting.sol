pragma solidity ^0.5.16;

contract Voting {
     
    // Model a candidate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    // Read/write Candidates
    mapping (uint => Candidate) public candidates;

    // Store accounts that have voted
    mapping(address => bool) public voters;

    // Store Candidate Count
    uint public candidatesCount;

    event votedEvent(
        uint indexed _candidateId
    );

    // Contructor
    constructor () public {
        addCandidate("carlos puerta");
        addCandidate("asdasdasd");
        addCandidate("wewewewewe");
    }

    // Add Candidate
    function addCandidate(string memory _name) public {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount,_name, 0);
    }
    // Vote
    function vote(uint _candidateId) public {
        // require that they haven't voted before
    
        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount);
        // update candidate vote count
        candidates[_candidateId].voteCount ++;

        // trigger voted event
        // emit votedEvent(_candidateId);
    }

    //
    //        
}