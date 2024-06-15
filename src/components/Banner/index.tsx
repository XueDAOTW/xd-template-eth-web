'use client';
import React, { useState } from 'react';
import { MintToken } from './mintToken';

export default function Banner() {
  const [isOpen, setIsOpen] = useState(false)

  const closeModal = () => {
      setIsOpen(false);
    };
  return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center">
        <MintToken show={isOpen} handleClose={closeModal} />
        <div className="p-10 rounded-lg">
          <h1 className="text-5xl md:text-7xl font-bold text-white text-stroke">XueDAO Workshop</h1>
          <h2 className="text-3xl md:text-5xl font-bold text-white">My First DApp</h2>
          <button className="custom-button transition-transform transform hover:scale-125 duration-300" onClick={()=>setIsOpen(true)}>
            Mint Token
          </button>
        </div>
      </div>
    );
  }
  