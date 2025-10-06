// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Voting {
    struct Organization {
        uint id;
        string name;
        bool exists;
    }

    struct Poll {
        uint id;
        uint orgId;
        string title;
        string description;
        string[] options;
        string[] imageHashes; // For stored images
        uint startTime;
        uint endTime;
        bool exists;
        mapping(uint => uint) votes; // optionId => voteCount
        mapping(address => bool) hasVoted; // track voters
    }

    uint private orgCount = 0;
    uint private pollCount = 0;

    mapping(uint => Organization) public organizations;
    mapping(uint => Poll) public polls;

    event OrganizationCreated(uint orgId, string name);
    event PollCreated(uint pollId, uint orgId, string title);
    event Voted(uint pollId, uint optionId, address voter);

    // Create a new organization
    function createOrganization(string memory _name) external {
        orgCount++;
        organizations[orgCount] = Organization(orgCount, _name, true);
        emit OrganizationCreated(orgCount, _name);
    }

    // Create a new poll
    function createPoll(
        uint _orgId,
        string memory _title,
        string memory _description,
        string[] memory _options,
        string[] memory _imageHashes,
        uint _startTime,
        uint _endTime
    ) external {
        require(organizations[_orgId].exists, "Organization does not exist");
        require(_startTime < _endTime, "Invalid timeframe");
        pollCount++;
        Poll storage p = polls[pollCount];
        p.id = pollCount;
        p.orgId = _orgId;
        p.title = _title;
        p.description = _description;
        p.options = _options;
        p.imageHashes = _imageHashes;
        p.startTime = _startTime;
        p.endTime = _endTime;
        p.exists = true;

        emit PollCreated(pollCount, _orgId, _title);
    }

    // Vote for an option in a poll
    function vote(uint _pollId, uint _optionId) external {
        Poll storage p = polls[_pollId];
        require(p.exists, "Poll does not exist");
        require(block.timestamp >= p.startTime, "Voting hasn't started");
        require(block.timestamp <= p.endTime, "Voting has ended");
        require(_optionId < p.options.length, "Invalid option");
        require(!p.hasVoted[msg.sender], "Already voted");

        p.votes[_optionId]++;
        p.hasVoted[msg.sender] = true;

        emit Voted(_pollId, _optionId, msg.sender);
    }

    // Get poll results (vote counts)
    function getPollResults(uint _pollId) external view returns (uint[] memory) {
        Poll storage p = polls[_pollId];
        require(p.exists, "Poll does not exist");
        uint optionsCount = p.options.length;
        uint[] memory results = new uint[](optionsCount);
        for (uint i = 0; i < optionsCount; i++) {
            results[i] = p.votes[i];
        }
        return results;
    }

    // Additional functions for admin control, verifications, etc., can be added later
}