const fs = require('fs');
const path = require('path');

const baseDir = 'wallet-less-voting';

// Define the folder structure
const structure = [
  `${baseDir}/backend/contracts`,
  `${baseDir}/backend/build`,
  `${baseDir}/frontend/public`,
  `${baseDir}/frontend/src/components`,
];

// Create directories
structure.forEach(dir => {
  fs.mkdirSync(path.resolve(__dirname, dir), { recursive: true });
});

// Create placeholder files
const files = [
  { path: `${baseDir}/backend/server.js`, content: '// Your backend server code here' },
  { path: `${baseDir}/backend/README.md`, content: '# Backend' },
  { path: `${baseDir}/frontend/README.md`, content: '# Frontend' },
  { path: `${baseDir}/frontend/src/App.js`, content: '// Main React component' },
  { path: `${baseDir}/frontend/src/firebase.js`, content: '// Firebase config' },
  { path: `${baseDir}/frontend/styles.css`, content: '/* Styles */' },
  { path: `${baseDir}/README.md`, content: '# Wallet-less Voting Project' },
];

files.forEach(file => {
  fs.writeFileSync(path.resolve(__dirname, file.path), file.content);
});

// Create empty Voting.sol
const votingPath = `${baseDir}/backend/contracts/Voting.sol`;
fs.writeFileSync(path.resolve(__dirname, votingPath), '// Voting.sol contract code');

console.log('Project structure created!');