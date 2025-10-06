# Wallet-less Blockchain Voting Platform

A **decentralized voting platform** for university clubs, events, or organizations where users can vote **without installing wallets or using crypto**. All blockchain transactions happen in the background on a testnet, while users interact through a familiar web interface.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React.js / Next.js |
| Authentication | Firebase Auth (Google + Phone) |
| Backend | Node.js + Express + Ethers.js |
| Blockchain | Ethereum Testnet (Sepolia/Goerli) |
| Storage | Firebase Storage / IPFS (for images) |
| Hosting | Vercel / Netlify (frontend), Railway / Render (backend) |

---

## ⚙️ Features

### Admin / Organization
- Create organizations
- Add events/polls with:
  - Title & description
  - Candidates/options
  - Images for each candidate
  - Voting start & end times
- Dashboard analytics:
  - Total votes per option
  - Participation stats

### Voter
- Login via Google or Phone (Firebase Auth)
- View available polls
- Vote in polls (one vote per account)
- View live vote results

### Blockchain Layer (Backend-managed)
- Votes recorded immutably on Ethereum testnet
- Backend signs all blockchain transactions
- Users don’t need ETH or wallets
- Optional verification for transparency

---

""## 📁 Full Project File Structure

wallet-less-voting/
│
├── backend/
│   ├── contracts/
│   │   └── Voting.sol          # Smart contract for organizations/polls/votes
│   ├── server.js               # Express server, handles API + blockchain
│   ├── package.json
│   ├── package-lock.json
│   └── README.md
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js              # Main React component
│   │   ├── components/         # Poll list, Dashboard, Login forms
│   │   ├── firebase.js         # Firebase Auth config
│   │   └── styles.css
│   ├── package.json
│   ├── package-lock.json
│   └── README.md
│
├── README.md                   # This file
└── .gitignore

---""

## 🚀 Roadmap / Step-by-Step Implementation

### **1️⃣ Setup Frontend**
- Initialize React or Next.js project.
- Configure **Firebase Authentication** (Google & Phone login).
- Create components:
  - Login page
  - Poll list
  - Voting page (with images & options)
  - Dashboard for results
- Display votes and stats fetched from backend API.

### **2️⃣ Setup Backend**
- Initialize Node.js + Express project.
- Connect to **Ethereum testnet** using **Ethers.js**.
- Deploy a single wallet/account to sign transactions (funded with testnet ETH).
- Implement API endpoints:
  - `POST /vote` → record vote on blockchain
  - `GET /polls` → get poll details and candidates
  - `GET /results` → fetch vote counts from blockchain

### **3️⃣ Smart Contract (Voting.sol)**
- Store organizations, polls, candidates, and votes.
- Functions:
  - `createOrganization(string name)`
  - `createPoll(uint orgId, string title, string[] options, string[] imageHashes, uint start, uint end)`
  - `vote(uint pollId, uint optionId, address voter)`
  - `getPollResults(uint pollId) returns (uint[] votes)`
- Deploy to **Sepolia or Goerli** testnet using backend scripts.

### **4️⃣ Backend Integration**
- Backend listens to frontend requests.
- Validates user (Firebase UID) to prevent double voting.
- Sends signed transactions to the blockchain.
- Returns results to frontend.

### **5️⃣ Frontend-Backend Communication**
- Fetch polls from backend API.
- Allow voting via API call.
- Display **live vote counts and dashboards**.
- Optional: display images for each option stored in Firebase Storage/IPFS.

### **6️⃣ Deployment**
- Frontend: deploy to **Vercel** or **Netlify**.
- Backend: deploy to **Railway** or **Render**.
- Smart contract stays on **Ethereum testnet**, backend holds the wallet key securely.

---

## 🔐 Security & Best Practices
- Keep backend wallet private key **secure** (never commit to repo).
- Validate votes with **Firebase Auth UID** to prevent multiple votes per user.
- Use testnet ETH for all transactions.
- Optional: Use IPFS for storing candidate images to make them tamper-proof.

---

## ✅ Benefits
- Users can vote **without crypto knowledge or wallets**.
- Votes are **secure, transparent, and immutable**.
- Portfolio-ready full-stack blockchain project.
- Extensible for multiple organizations, events, and real-world use cases.

---

## 📸 Demo & Portfolio Tips
- Include screenshots of:
  - Login
  - Poll creation
  - Voting page with images
  - Dashboard with results
- Record a short screen capture showing **real-time votes** to demonstrate blockchain integration.

---

## 📝 References
- [Remix IDE](https://remix.ethereum.org/)
- [Ethers.js Documentation](https://docs.ethers.io/)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Ethereum Testnets](https://ethereum.org/en/developers/docs/networks/)
