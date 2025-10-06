// backend/server.js

require('dotenv').config();
const express = require('express');
const { ethers } = require('ethers');

// Initialize express app
const app = express();
app.use(express.json());

// Load environment variables
const INFURA_URL = process.env.INFURA_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

// Your ABI array
const abi = [
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "uint256", "name": "orgId", "type": "uint256" },
      { "indexed": false, "internalType": "string", "name": "name", "type": "string" }
    ],
    "name": "OrganizationCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "uint256", "name": "pollId", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "orgId", "type": "uint256" },
      { "indexed": false, "internalType": "string", "name": "title", "type": "string" }
    ],
    "name": "PollCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "uint256", "name": "pollId", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "optionId", "type": "uint256" },
      { "indexed": false, "internalType": "address", "name": "voter", "type": "address" }
    ],
    "name": "Voted",
    "type": "event"
  },
  {
    "inputs": [{ "internalType": "string", "name": "_name", "type": "string" }],
    "name": "createOrganization",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_orgId", "type": "uint256" },
      { "internalType": "string", "name": "_title", "type": "string" },
      { "internalType": "string", "name": "_description", "type": "string" },
      { "internalType": "string[]", "name": "_options", "type": "string[]" },
      { "internalType": "string[]", "name": "_imageHashes", "type": "string[]" },
      { "internalType": "uint256", "name": "_startTime", "type": "uint256" },
      { "internalType": "uint256", "name": "_endTime", "type": "uint256" }
    ],
    "name": "createPoll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "_pollId", "type": "uint256" }],
    "name": "getPollResults",
    "outputs": [{ "internalType": "uint256[]", "name": "", "type": "uint256[]" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "name": "organizations",
    "outputs": [
      { "internalType": "uint256", "name": "id", "type": "uint256" },
      { "internalType": "string", "name": "name", "type": "string" },
      { "internalType": "bool", "name": "exists", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "name": "polls",
    "outputs": [
      { "internalType": "uint256", "name": "id", "type": "uint256" },
      { "internalType": "uint256", "name": "orgId", "type": "uint256" },
      { "internalType": "string", "name": "title", "type": "string" },
      { "internalType": "string", "name": "description", "type": "string" },
      { "internalType": "uint256", "name": "startTime", "type": "uint256" },
      { "internalType": "uint256", "name": "endTime", "type": "uint256" },
      { "internalType": "bool", "name": "exists", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "_pollId", "type": "uint256" }, { "internalType": "uint256", "name": "_optionId", "type": "uint256" }],
    "name": "vote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Setup provider and signer
const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const votingContract = new ethers.Contract(CONTRACT_ADDRESS, abi, wallet);

// Sample: create a route to create an organization
app.post('/createOrganization', async (req, res) => {
  const { name } = req.body;
  try {
    const tx = await votingContract.createOrganization(name);
    await tx.wait();
    res.json({ message: 'Organization created', txHash: tx.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Sample: create route to create a poll
app.post('/createPoll', async (req, res) => {
  const { orgId, title, description, options, imageHashes, startTime, endTime } = req.body;
  try {
    const tx = await votingContract.createPoll(orgId, title, description, options, imageHashes, startTime, endTime);
    await tx.wait();
    res.json({ message: 'Poll created', txHash: tx.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Sample: route to get poll results
app.get('/getResults/:pollId', async (req, res) => {
  const pollId = req.params.pollId;
  try {
    const results = await votingContract.getPollResults(pollId);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Sample: route to vote
app.post('/vote', async (req, res) => {
  const { pollId, optionId } = req.body;
  try {
    const tx = await votingContract.vote(pollId, optionId);
    await tx.wait();
    res.json({ message: 'Vote cast', txHash: tx.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});