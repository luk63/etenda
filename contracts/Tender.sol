// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title Tender Contract
 * @dev Manages tender creation, bidding, and awarding process
 */
contract Tender {
    // Tender status enum
    enum Status { Open, Closed, Awarded }
    
    // Tender structure
    struct TenderDetails {
        uint256 id;
        address owner;
        string title;
        string description;
        uint256 budget;
        uint256 deadline;
        Status status;
    }

    // Bid structure
    struct Bid {
        address bidder;
        uint256 amount;
        string proposal;
        bool selected;
    }

    // State variables
    uint256 private tenderCounter;
    mapping(uint256 => TenderDetails) public tenders;
    mapping(uint256 => Bid[]) public bids;
    mapping(address => uint256[]) public userTenders;
    
    // Events
    event TenderCreated(uint256 indexed tenderId, address indexed owner, string title, uint256 budget);
    event BidSubmitted(uint256 indexed tenderId, address indexed bidder, uint256 amount);
    event TenderAwarded(uint256 indexed tenderId, address indexed winner);
    event TenderClosed(uint256 indexed tenderId);

    // Errors
    error InvalidDeadline();
    error InvalidBudget();
    error TenderNotExists();
    error NotTenderOwner();
    error TenderNotOpen();
    error DeadlinePassed();
    error OwnerCannotBid();
    error BidExceedsBudget();
    error InvalidBidIndex();

    // Modifiers
    modifier onlyTenderOwner(uint256 tenderId) {
        if (msg.sender != tenders[tenderId].owner) revert NotTenderOwner();
        _;
    }

    modifier tenderExists(uint256 tenderId) {
        if (tenderId >= tenderCounter) revert TenderNotExists();
        _;
    }

    modifier tenderOpen(uint256 tenderId) {
        if (tenders[tenderId].status != Status.Open) revert TenderNotOpen();
        if (block.timestamp >= tenders[tenderId].deadline) revert DeadlinePassed();
        _;
    }

    /**
     * @dev Posts a new tender
     * @param title Title of the tender
     * @param description Detailed description of the tender
     * @param budget Maximum budget for the tender in wei
     * @param deadline Timestamp when the tender closes
     * @return tenderId The ID of the newly created tender
     */
    function postTender(
        string calldata title,
        string calldata description,
        uint256 budget,
        uint256 deadline
    ) external returns (uint256) {
        if (deadline <= block.timestamp) revert InvalidDeadline();
        if (budget == 0) revert InvalidBudget();
        
        uint256 tenderId = tenderCounter++;
        
        TenderDetails memory newTender = TenderDetails({
            id: tenderId,
            owner: msg.sender,
            title: title,
            description: description,
            budget: budget,
            deadline: deadline,
            status: Status.Open
        });
        
        tenders[tenderId] = newTender;
        userTenders[msg.sender].push(tenderId);
        
        emit TenderCreated(tenderId, msg.sender, title, budget);
        return tenderId;
    }

    /**
     * @dev Submits a bid for a tender
     * @param tenderId ID of the tender
     * @param amount Bid amount in wei
     * @param proposal Detailed proposal for the tender
     */
    function submitBid(
        uint256 tenderId,
        uint256 amount,
        string calldata proposal
    ) external tenderExists(tenderId) tenderOpen(tenderId) {
        if (msg.sender == tenders[tenderId].owner) revert OwnerCannotBid();
        if (amount > tenders[tenderId].budget) revert BidExceedsBudget();
        
        bids[tenderId].push(Bid({
            bidder: msg.sender,
            amount: amount,
            proposal: proposal,
            selected: false
        }));
        
        emit BidSubmitted(tenderId, msg.sender, amount);
    }

    /**
     * @dev Awards the tender to a specific bid
     * @param tenderId ID of the tender
     * @param bidIndex Index of the winning bid
     */
    function awardTender(uint256 tenderId, uint256 bidIndex) 
        external 
        tenderExists(tenderId) 
        onlyTenderOwner(tenderId) 
        tenderOpen(tenderId)
    {
        if (bidIndex >= bids[tenderId].length) revert InvalidBidIndex();
        
        tenders[tenderId].status = Status.Awarded;
        bids[tenderId][bidIndex].selected = true;
        
        emit TenderAwarded(tenderId, bids[tenderId][bidIndex].bidder);
    }

    /**
     * @dev Closes a tender without awarding
     * @param tenderId ID of the tender
     */
    function closeTender(uint256 tenderId) 
        external 
        tenderExists(tenderId) 
        onlyTenderOwner(tenderId) 
        tenderOpen(tenderId)
    {
        tenders[tenderId].status = Status.Closed;
        emit TenderClosed(tenderId);
    }

    /**
     * @dev Gets tender details
     * @param tenderId ID of the tender
     * @return TenderDetails struct containing tender information
     */
    function getTenderDetails(uint256 tenderId) 
        external 
        view 
        tenderExists(tenderId) 
        returns (TenderDetails memory) 
    {
        return tenders[tenderId];
    }

    /**
     * @dev Gets all bids for a tender
     * @param tenderId ID of the tender
     * @return Array of Bid structs
     */
    function getTenderBids(uint256 tenderId) 
        external 
        view 
        tenderExists(tenderId) 
        returns (Bid[] memory) 
    {
        return bids[tenderId];
    }

    /**
     * @dev Gets all tenders created by a user
     * @param user Address of the user
     * @return Array of tender IDs
     */
    function getUserTenders(address user) external view returns (uint256[] memory) {
        return userTenders[user];
    }

    /**
     * @dev Gets most recent tenders
     * @param limit Maximum number of tenders to return
     * @return Array of TenderDetails structs
     */
    function getRecentTenders(uint256 limit) external view returns (TenderDetails[] memory) {
        uint256 count = tenderCounter < limit ? tenderCounter : limit;
        TenderDetails[] memory recentTenders = new TenderDetails[](count);
        
        for (uint256 i = 0; i < count; i++) {
            uint256 index = tenderCounter - 1 - i;
            recentTenders[i] = tenders[index];
        }
        
        return recentTenders;
    }

    /**
     * @dev Gets all bids made by a user
     * @param user Address of the user
     * @return Array of Bid structs
     */
    function getUserBids(address user) external view returns (Bid[] memory) {
        uint256 totalBids = 0;
        
        // First count total bids by user
        for (uint256 i = 0; i < tenderCounter; i++) {
            Bid[] memory tenderBids = bids[i];
            for (uint256 j = 0; j < tenderBids.length; j++) {
                if (tenderBids[j].bidder == user) {
                    totalBids++;
                }
            }
        }
        
        // Create array of user's bids
        Bid[] memory userBids = new Bid[](totalBids);
        uint256 currentIndex = 0;
        
        // Populate user's bids
        for (uint256 i = 0; i < tenderCounter; i++) {
            Bid[] memory tenderBids = bids[i];
            for (uint256 j = 0; j < tenderBids.length; j++) {
                if (tenderBids[j].bidder == user) {
                    userBids[currentIndex] = tenderBids[j];
                    currentIndex++;
                }
            }
        }
        
        return userBids;
    }

    /**
     * @dev Gets the total number of tenders
     * @return Current tender counter
     */
    function getTenderCount() external view returns (uint256) {
        return tenderCounter;
    }
} 