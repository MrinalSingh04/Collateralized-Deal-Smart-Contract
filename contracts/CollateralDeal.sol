// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract CollateralDeal {
    address public partyA;
    address public partyB;
    uint256 public collateralA;
    uint256 public collateralB;
    bool public depositedA;
    bool public depositedB;
    bool public dealCompleted;
    bool public dealDefaulted;

    constructor(address _partyB) payable {
        partyA = msg.sender;
        partyB = _partyB;
    }

    modifier onlyParties() {
        require(msg.sender == partyA || msg.sender == partyB, "Not a party");
        _;
    }

    function depositCollateral() external payable onlyParties {
        require(!dealCompleted && !dealDefaulted, "Deal already ended");

        if (msg.sender == partyA) {
            require(!depositedA, "A already deposited");
            collateralA = msg.value;
            depositedA = true;
        } else {
            require(!depositedB, "B already deposited");
            collateralB = msg.value;
            depositedB = true;
        }
    }

    function markDealComplete() external onlyParties {
        require(depositedA && depositedB, "Both must deposit");
        require(!dealCompleted && !dealDefaulted, "Deal already ended");

        dealCompleted = true;
        payable(partyA).transfer(collateralA);
        payable(partyB).transfer(collateralB);
    }

    function markDealDefault(address defaulter) external onlyParties {
        require(depositedA && depositedB, "Both must deposit");
        require(!dealCompleted && !dealDefaulted, "Deal already ended");
        require(defaulter == partyA || defaulter == partyB, "Invalid");
        dealDefaulted = true;
        address winner = defaulter == partyA ? partyB : partyA;
        payable(winner).transfer(address(this).balance);
    }
}
