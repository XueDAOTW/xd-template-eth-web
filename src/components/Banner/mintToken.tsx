'use client';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { MintTokenProps } from '@/interfaces/api-interfaces';
import { useAccount, useBalance, useReadContract } from "wagmi";
import Loading from './loading';
import { erc20TestAddress } from '@/contract/address/testAddress';
import { MintButton } from './mint-erc20';
import { erc20TestAbi } from '@/contract/abi/testAbi';

export function MintToken({ show, handleClose }: MintTokenProps) {

    const [amount, setAmount] = useState<number>(0);
    const { address, isConnected, chain } = useAccount();

    //Read account sepolia faucet balance
    const { data: SepoliaBalanceData, refetch: refetchSepoliaBalance } = useBalance({
        address: address,
        unit: 'ether',
    });

    //Read TestToken balance
    const { data: XUEDAOTESTBalanceData, refetch: refetchXUEDAOTESTBalance } = useBalance({
        address: address,
        token: erc20TestAddress,
    });

    //Read erc20 token symbol
    const { data: symbol } = useReadContract({
        address: erc20TestAddress,
        abi: erc20TestAbi,
        functionName: 'symbol',
      })  
    
    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        const parsedValue = parseInt(value, 10);
        
        setAmount(isNaN(parsedValue) ? 0 : parsedValue);
    };

    useEffect(() => {
        refetchSepoliaBalance()
    }, [SepoliaBalanceData, refetchSepoliaBalance])

    useEffect(() => {
        refetchXUEDAOTESTBalance()
    }, [XUEDAOTESTBalanceData, refetchXUEDAOTESTBalance])

    if (isConnected) {
        return (
            <>
                {show ? (
                    <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-30 z-50">
                        <div className="container w-full max-w-md mx-4 sm:mx-6 lg:mx-auto rounded-3xl shadow-lg flex flex-col items-end bg-black">
                            <div className="w-full h-full rounded-3xl p-4 flex flex-col items-end">
                                <FontAwesomeIcon className="hover-spin text-gray-500 hover:text-gray-300 text-2xl sm:text-3xl cursor-pointer" icon={faXmark} onClick={handleClose} />
                                <div className="flex flex-col justify-center p-4 sm:p-10 w-full gap-3">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 text-white gap-2 sm:gap-3">
                                        <p>Current Chain: {chain?.name}</p>
                                        <p>Sepolia Faucet: {SepoliaBalanceData?.formatted} {SepoliaBalanceData?.symbol}</p>
                                        <p>Test Token Balance: {XUEDAOTESTBalanceData?.value.toString()} {symbol?.toString()}</p>
                                    </div>
                                    <br />
                                    <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2 sm:gap-3">
                                        <label className='pl-3.5 text-white'>Mint Test Token:</label>
                                        <input
                                            className="p-3 rounded-xl bg-gray-800 text-white transition-transform transform hover:scale-125 duration-300"
                                            type="number"
                                            placeholder="Amount"
                                            onChange={handleChange}
                                            min="0"
                                        />
                                        <MintButton amount={amount} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </>
        );
    } else {
        return (
            <>
                {show ? (
                    <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-30 z-50">
                        <div className="container w-full max-w-md mx-4 sm:mx-6 lg:mx-auto rounded-3xl shadow-lg flex flex-col items-end bg-black">
                            <div className="w-full h-full rounded-3xl p-4 flex flex-col items-end">
                                <FontAwesomeIcon className="hover-spin text-gray-500 hover:text-gray-300 text-2xl sm:text-3xl cursor-pointer" icon={faXmark} onClick={handleClose} />
                                <div className="flex flex-col justify-center items-center">
                                    <Loading />
                                    <p className="font-bold text-2xl text-center text-white">
                                        Connect wallet to display your web3 assets.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </>
        );
    }
}
