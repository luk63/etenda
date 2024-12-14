export const TENDER_ABI = [
  {
    inputs: [],
    name: "getTenderDetails",
    outputs: [
      {
        components: [
          { name: "id", type: "uint256" },
          { name: "owner", type: "address" },
          { name: "title", type: "string" },
          { name: "description", type: "string" },
          { name: "budget", type: "uint256" },
          { name: "deadline", type: "uint256" },
          { name: "status", type: "uint8" }
        ],
        internalType: "struct Tender.TenderDetails",
        name: "",
        type: "tuple"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { name: "tenderId", type: "uint256" },
      { name: "amount", type: "uint256" },
      { name: "proposal", type: "string" }
    ],
    name: "submitBid",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { name: "title", type: "string" },
      { name: "description", type: "string" },
      { name: "budget", type: "uint256" },
      { name: "deadline", type: "uint256" }
    ],
    name: "postTender",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { name: "tenderId", type: "uint256" },
      { name: "bidIndex", type: "uint256" }
    ],
    name: "awardTender",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { name: "tenderId", type: "uint256" }
    ],
    name: "closeTender",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { name: "tenderId", type: "uint256" }
    ],
    name: "getTenderBids",
    outputs: [
      {
        components: [
          { name: "bidder", type: "address" },
          { name: "amount", type: "uint256" },
          { name: "proposal", type: "string" },
          { name: "selected", type: "bool" }
        ],
        internalType: "struct Tender.Bid[]",
        name: "",
        type: "tuple[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { name: "user", type: "address" }
    ],
    name: "getUserTenders",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { name: "limit", type: "uint256" }
    ],
    name: "getRecentTenders",
    outputs: [
      {
        components: [
          { name: "id", type: "uint256" },
          { name: "owner", type: "address" },
          { name: "title", type: "string" },
          { name: "description", type: "string" },
          { name: "budget", type: "uint256" },
          { name: "deadline", type: "uint256" },
          { name: "status", type: "uint8" }
        ],
        internalType: "struct Tender.TenderDetails[]",
        name: "",
        type: "tuple[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
]; 