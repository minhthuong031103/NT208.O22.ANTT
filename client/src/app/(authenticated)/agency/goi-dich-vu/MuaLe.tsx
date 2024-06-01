"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { MuaLeModal } from "./MuaLeModal";
import { useRouter } from "next/navigation";
import { MuaLeBlockChainModal } from "./MualeBlockChain";

export const MuaLe = () => {
  const router = useRouter();
  const [isStripe, setIsStripe] = React.useState(false);
  const [isBlockchain, setIsBlockchain] = React.useState(false);
  return (
    <div>
      <Button
        className="border-1 border-red-400 text-red-400 bg-transparent hover:text-white hover:bg-red-400 mt-1"
        onClick={() => {
          setIsStripe(true);
        }}
      >
        Mua lẻ với stripe
      </Button>
      <Button
        className="border-1 border-red-400 text-red-400 bg-transparent hover:text-white hover:bg-red-400 ml-5 mt-1"
        onClick={() => {
          setIsBlockchain(true);
        }}
      >
        Mua lẻ với Blockchain
      </Button>

      {isStripe ? (
        <MuaLeModal
          isChild={false}
          isModalOpen={isStripe}
          setIsModalOpen={setIsStripe}
          callback={() => {
            setIsStripe(false);
            router.refresh();
          }}
        />
      ) : null}

      {isBlockchain ? (
        <MuaLeBlockChainModal
          isChild={false}
          isModalOpen={isBlockchain}
          setIsModalOpen={setIsBlockchain}
          callback={() => {
            setIsBlockchain(false);
            router.refresh();
          }}
        />
      ) : null}
    </div>
  );
};
