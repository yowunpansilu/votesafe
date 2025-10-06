// test_back_end.js
const axios = require('axios');

const API_BASE_URL = 'http://localhost:3001';

async function testCreateOrganization() {
  const data = { name: 'Test Org' };
  const response = await axios.post(`${API_BASE_URL}/createOrganization`, data);
  console.log('Create Organization:', response.data);
  return response.data;
}

async function testCreatePoll(orgId, title, description, options, imageHashes, startTime, endTime) {
  const data = {
    orgId,
    title,
    description,
    options,
    imageHashes,
    startTime,
    endTime,
  };
  const response = await axios.post(`${API_BASE_URL}/createPoll`, data);
  console.log('Create Poll:', response.data);
  return response.data;
}

async function testGetResults(pollId) {
  const response = await axios.get(`${API_BASE_URL}/getResults/${pollId}`);
  console.log('Poll Results:', response.data);
  return response.data;
}

async function testVote(pollId, optionId) {
  const data = { pollId, optionId };
  const response = await axios.post(`${API_BASE_URL}/vote`, data);
  console.log('Vote:', response.data);
  return response.data;
}

async function runTests() {
  try {
    // 1. Create Organization
    const orgResponse = await testCreateOrganization();
    const orgId = orgResponse.txHash; // Or parse something relevant depending on your backend

    // 2. Create a Poll
    const options = ['Option 1', 'Option 2'];
    const imageHashes = ['hash1', 'hash2'];
    const startTime = Math.floor(Date.now() / 1000);
    const endTime = startTime + 3600; // 1 hour later

    const pollResponse = await testCreatePoll(1, 'Test Poll', 'Description of poll', options, imageHashes, startTime, endTime);
    const pollId = 1; // Replace with actual id if your backend returns it

    // 3. Fetch poll results (before voting)
    await testGetResults(pollId);

    // 4. Vote for Option 0
    await testVote(pollId, 0);

    // 5. Fetch poll results (after voting)
    await testGetResults(pollId);
  } catch (err) {
    console.error('Error during testing:', err.response ? err.response.data : err.message);
  }
}

runTests();