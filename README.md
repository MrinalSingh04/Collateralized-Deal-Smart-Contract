# ⚖️ Collateralized Deal Smart Contract

This project implements a trustless smart contract where **two parties deposit collateral (ETH)** before entering into a deal. The funds are returned if the deal is successful, or **one party claims both collaterals if the other defaults**.

## 🔍 What is this?

A **Collateralized Deal Contract** is useful in scenarios like freelance gigs, service agreements, or any commitment-based transactions where both parties want to ensure fairness. This smart contract helps enforce mutual accountability **without a third-party**.

## 💡 Why build this?

In many real-world cases, deals break due to lack of trust. This smart contract provides:

- **Mutual Risk**: Both parties must lock collateral.
- **Trustless Enforcement**: Smart contract logic ensures fair handling of funds.
- **Automation**: Resolves outcomes based on success or failure of the agreement.

## 📜 Features

- Both parties (A and B) deposit ETH as collateral.
- On success, both retrieve their original deposits.
- On default, the other party claims the full balance.

## 🔧 Tech Stack

- **Solidity** (Smart Contract)
- **Hardhat** (Development environment/ deployment)
- **Ethers.js v6** (for testing and scripting)
- **Mocha + Chai** (for unit tests)

## 🛠️ Setup & Usage

### 1. Clone and install dependencies

```bash
git clone <repo-url>
cd collateral-deal
npm install
```

### 2. Compile contracts

```bash
npx hardhat compile
```

### 3. Run local node

```bash
npx hardhat node
```

### 4. Run tests

```bash
npx hardhat test
```

### 5. Deploy locally

In a new terminal:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

## ✅ Project Structure

```
collateral-deal/
├── contracts/CollateralDeal.sol      # Smart contract
├── test/CollateralDeal.test.js       # Unit tests
├── scripts/deploy.js                 # Deployment script
├── hardhat.config.js                 # Config
└── readme.md                         # This file
```

## 🔐 License

MIT
