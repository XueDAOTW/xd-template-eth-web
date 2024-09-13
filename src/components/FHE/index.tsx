"use client";
import React, { useEffect, useState, useCallback } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useBlockNumber, useChainId } from "wagmi";
import Image from "next/image";
import { fheVoteAbi } from "@/contract/abi/voteAbi";
import { votingAddress } from "@/contract/address/voteAddress";
import { ethers } from "ethers";
import { FhenixClient } from "fhenixjs";
import {
  useEthersProvider,
  useEthersSigner,
} from "@/utils/viemEthersConverters";

export default function FHE() {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [proposalName, setProposalName] = useState<string>("");
  const [error, setError] = useState<Error | null>(null);
  const [fheClient, setFheClient] = useState<FhenixClient | null>(null);
  const [finalized, setFinalized] = useState<boolean>(false);
  const [winningValues, setWinningValues] = useState<{
    uint8Value: number | null;
    uint16Value: number | null;
  }>({
    uint8Value: null,
    uint16Value: null,
  });

  const { data: blockNumberData } = useBlockNumber({ watch: true });
  const chainId = useChainId();
  const signer = useEthersSigner();
  const provider = useEthersProvider();
  // Initialize the FHE Client
  const initFHEClient = useCallback(() => {
    if (provider) {
      const client = new FhenixClient({ provider });
      setFheClient(client);
    }
  }, [provider]);

  useEffect(() => {
    initFHEClient();
  }, [initFHEClient]);

  const getFheClient = useCallback(() => {
    return fheClient;
  }, [fheClient]);

  // Create a contract instance
  const votingContract = useCallback(
    () => new ethers.Contract(votingAddress, fheVoteAbi, provider),
    [provider]
  );

  const fetchProposalName = useCallback(async () => {
    try {
      const name = await votingContract().proposal();
      setProposalName(name);
      console.log("Proposal Name: ", name);
    } catch (error) {
      setError(error as Error);
    }
  }, [votingContract]);

  const fetchFinalizedStatus = useCallback(async () => {
    try {
      const finalizedStatus = await votingContract().finalized();
      setFinalized(finalizedStatus);
      if (finalizedStatus) {
        fetchWinningValues();
      }
    } catch (error) {
      setError(error as Error);
    }
    //eslint-disable-next-line
  }, [votingContract]);

  const fetchWinningValues = useCallback(async () => {
    try {
      const [uint8Value, uint16Value] = await votingContract().winning();
      setWinningValues({ uint8Value, uint16Value });
    } catch (error) {
      setError(error as Error);
    }
  }, [votingContract]);

  useEffect(() => {
    fetchProposalName();
    fetchFinalizedStatus();
  }, [fetchProposalName, fetchFinalizedStatus]);

  // Encrypt the vote using FHE client
  const encryptVote = useCallback(
    async (voteValue: number) => {
      try {
        const client = getFheClient();
        if (client && !isNaN(voteValue)) {
          return await client.encrypt_uint8(voteValue);
        }
        throw new Error("Invalid vote value or FHE client is not initialized");
      } catch (err) {
        setError(err as Error);
        return null;
      }
    },
    [getFheClient]
  );

  const handleVoteSubmission = async (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedOption === null) {
      alert("Please select an option before submitting.");
      return;
    }

    try {
      const encryptedVote = await encryptVote(selectedOption);
      if (!signer) {
        console.error("Signer is not available");
        return;
      }
      if (encryptedVote) {
        await votingContract().connect(signer).vote(encryptedVote);
        setIsSubmitted(true);
      }
    } catch (error) {
      setError(error as Error);
    }
  };

  const handleFinalizeVoting = async () => {
    try {
      if (!signer) {
        console.error("Signer is not available");
        return;
      }
      const tx = await votingContract().connect(signer).finalize();
      await tx.wait();
      fetchWinningValues();
    } catch (error) {
      setError(error as Error);
    }
  };

  const VotingForm = () => (
    <form
      onSubmit={handleVoteSubmission}
      className="w-full max-w-md bg-gradient-to-b  p-6 rounded-lg shadow-md"
    >
      <div className="mb-4">
        <p className="block text-gray-700 text-sm font-bold mb-2">
          {proposalName}
        </p>
        {options.map((option, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              id={`option${index}`}
              type="radio"
              name="voteOption"
              value={index}
              checked={selectedOption === index}
              onChange={() => setSelectedOption(index)}
              className="mr-2 leading-tight"
            />
            <label htmlFor={`option${index}`} className="text-gray-700">
              {option}
            </label>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit Vote
        </button>
      </div>
    </form>
  );

  const FinalizedVotingResult = () => (
    <div className="w-full max-w-md bg-gray-100 p-6 mt-10 rounded-lg shadow-md">
      <p className="text-center text-green-500 font-bold">
        Voting has been finalized!
      </p>
      <p className="text-center text-gray-700">{proposalName}</p>
      <p className="text-center text-gray-700">
        With {winningValues.uint16Value} Votes...
      </p>
      <p className="text-center text-gray-700 font-bold">
        The Winning Character is: {options[winningValues.uint8Value || 0]} 🎉
      </p>
      <div className="py-20">
        <Image
          src="/fhe-rainbow.jpeg"
          alt="FHE Rainbow"
          width={500}
          height={300}
        />
      </div>
    </div>
  );

  // Hardcoded options for now
  const options = ["Patrick Star", "Sandy Cheeks", "Mr. Krabs"];

  return (
    <main className="fixed w-full flex flex-col items-center justify-center p-10 ">
      <nav className="flex justify-end w-full max-w-4xl">
        <ConnectButton />
      </nav>
      <div>
        <h1 className="text-3xl font-bold py-5">FHE Voting</h1>
      </div>

      {finalized ? (
        <FinalizedVotingResult />
      ) : isSubmitted ? (
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
          <p className="text-center text-green-500 font-bold">
            Your vote has been submitted!
          </p>
        </div>
      ) : (
        <VotingForm />
      )}

      {/* Footer */}
      <div className="fixed bottom-0 w-full flex justify-center py-10">
        <div className="flex space-x-5">
          <p className="rounded-xl border border-slate-500 bg-gradient-to-b from-zinc-800/30 to-zinc-500/40 p-4 flex items-center text-xs">
            Voting Contract: {votingAddress}
          </p>
          <div className="rounded-xl text-xs border border-slate-500 bg-gradient-to-b from-zinc-800/30 to-zinc-500/40 p-4 flex flex-col">
            <p>Watching Blocks on {chainId ? chainId : "Loading..."}</p>
            <div className="flex items-center justify-center space-x-2">
              <div className="relative">
                <div
                  className={`absolute inline-flex h-full w-full rounded-full ${
                    blockNumberData ? "bg-green-500" : "bg-orange-500"
                  } opacity-75 animate-ping`}
                ></div>
                <div
                  className={`relative h-2 w-2 rounded-full ${
                    blockNumberData ? "bg-green-500" : "bg-orange-500"
                  }`}
                ></div>
              </div>
              <p>{blockNumberData ? Number(blockNumberData) : "Loading..."}</p>
            </div>
          </div>
          {!finalized && (
            <button
              onClick={handleFinalizeVoting}
              className="rounded-xl text-xs border border-slate-500 bg-gradient-to-b from-zinc-800/30 to-zinc-500/40 p-4 flex items-center justify-center"
            >
              Finalize Voting
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
