'use client';
import React, { useEffect, useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt, BaseError } from "wagmi";
import { erc20TestAddress } from '@/contract/address/testAddress';
import { erc20TestAbi } from '@/contract/abi/testAbi';
import { MintButtonProps } from '@/types/uiTypes';
import Swal from 'sweetalert2';

export function MintButton({ amount }: MintButtonProps) {
    const [isClick, setIsClick] = useState(false);
    const { data: hash, error, writeContract } = useWriteContract();

    const handleMint = async () => {
        if(amount>0){
            setIsClick(true);
            writeContract({
              abi: erc20TestAbi,
              address: erc20TestAddress,
              functionName: 'mint',
              args: [BigInt(amount)],
            });
        }else{
            alert("Amount Error!")
        }
    };
  
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });
  
    const [isAlertShown, setIsAlertShown] = useState(false);

    useEffect(() => {
      if (isClick && amount > 0) {
        if (isConfirming && !isAlertShown) {
          Swal.fire({
            title: 'Loading...',
            text: 'Please wait while the transaction is being confirmed.',
            icon: 'info',
            showConfirmButton: false,
          });
          setIsAlertShown(true);
        } else if (isConfirmed) {
          Swal.fire({
            title: 'Transaction Confirmed!',
            html: `<a href="https://sepolia.etherscan.io/tx/${hash}" target="_blank">View Transaction on Etherscan</a>`,
            icon: 'success',
          });
          setIsAlertShown(false);
        } else if (error) {
          Swal.fire({
            title: 'Error',
            text: `Error: ${(error as BaseError).shortMessage || error.message}`,
            icon: 'error',
          });
          setIsAlertShown(false);
        }
      }
    }, [isClick, amount, isConfirming, isConfirmed, error, hash, isAlertShown]);

    return (
        <div className="relative">
        <button className="text-white px-4 py-2 rounded-xl transition-transform transform hover:scale-125 duration-300 w-full sm:w-auto" onClick={handleMint}>
            Mint
        </button>
        </div>
    );
}