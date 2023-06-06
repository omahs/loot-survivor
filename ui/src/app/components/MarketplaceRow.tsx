import { useEffect, useState } from "react";
import { Button } from "./Button";
import { BidBox } from "./Bid";
import { useContracts } from "../hooks/useContracts";
import useAdventurerStore from "../hooks/useAdventurerStore";
import useTransactionCartStore from "../hooks/useTransactionCartStore";
import LootIcon from "./LootIcon";
import {
  useTransactionManager,
  useWaitForTransaction,
} from "@starknet-react/core";
import { Metadata } from "../types";

interface MarketplaceRowProps {
  ref: any;
  item: any;
  index: number;
  selectedIndex: number;
  isActive: boolean;
  setActiveMenu: (value: any) => void;
  calculatedNewGold: number;
}

const MarketplaceRow = ({
  ref,
  item,
  index,
  selectedIndex,
  calculatedNewGold,
}: MarketplaceRowProps) => {
  const [selectedButton, setSelectedButton] = useState<number>(0);
  const { lootMarketArcadeContract } = useContracts();
  const adventurer = useAdventurerStore((state) => state.adventurer);
  const [showBidBox, setShowBidBox] = useState(-1);
  const calls = useTransactionCartStore((state) => state.calls);
  const addToCalls = useTransactionCartStore((state) => state.addToCalls);
  const { hashes, transactions } = useTransactionManager();
  const { data: txData } = useWaitForTransaction({ hash: hashes[0] });

  const transactingMarketIds = (transactions[0]?.metadata as Metadata)
    ?.marketIds;

  const checkBuyBalance = () => {
    if (adventurer?.gold) {
      const sum = calls
        .filter((call) => call.entrypoint == "bid_on_item")
        .reduce((accumulator, current) => {
          const value = current.calldata[4];
          const parsedValue = value ? parseInt(value.toString(), 10) : 0;
          return accumulator + (isNaN(parsedValue) ? 0 : parsedValue);
        }, 0);
      return sum >= adventurer.gold;
    }
    return true;
  };

  const checkTransacting = (marketId: number) => {
    if (txData?.status == "RECEIVED" || txData?.status == "PENDING") {
      return transactingMarketIds?.includes(marketId);
    } else {
      return false;
    }
  };

  return (
    <tr
      ref={ref}
      className={
        "border-b border-terminal-green hover:bg-terminal-green hover:text-terminal-black" +
        (selectedIndex === index + 1 ? " bg-terminal-black" : "")
      }
    >
      <td className="text-center">{item.marketId}</td>
      <td className="text-center">{item.item}</td>
      <td className="text-center">{item.rank}</td>
      <td className="flex justify-center space-x-1 text-center ">
        {" "}
        <LootIcon className="self-center pt-3" type={item.slot} />{" "}
      </td>
      <td className="text-center">{item.type}</td>
      <td className="text-center">{item.price}</td>
      <td className="w-64 text-center">
        {showBidBox == index ? (
          <BidBox
            close={() => setShowBidBox(-1)}
            marketId={item.marketId}
            item={item}
            calculatedNewGold={calculatedNewGold}
          />
        ) : (
          <div>
            <Button onClick={() => setShowBidBox(index)}>buy</Button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default MarketplaceRow;
