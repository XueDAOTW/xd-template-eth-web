'use client';
import { useState } from 'react';
import Image from 'next/image';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white absolute top-0 w-full p-4 text-white bg-opacity-20">
      <div className="container mx-auto flex justify-between items-center">
        <div className="space-x-4 hidden md:flex">
          <Link href="/about">
            <p className="hover:text-gray-400">ABOUT</p>
          </Link>
          <Link href="/contact">
            <p className="hover:text-gray-400">CONTACT</p>
          </Link>
        </div>
        <Image src={'/Logo.png'} alt={'logo'} width={50} height={50} />
        <div className="space-x-4 hidden md:flex">
          <Link href="/game">
            <p className="hover:text-gray-400">GAME</p>
          </Link>
          <Link href="/gallery">
            <p className="hover:text-gray-400">GALLERY</p>
          </Link>
        </div>
        <div className="hidden md:flex">
          <ConnectButton />
        </div>
        <div className="md:hidden">
          {isOpen? 
          <>
          <FontAwesomeIcon className="hover-spin text-white text-2xl sm:text-3xl cursor-pointer" icon={faXmark} onClick={toggleMenu} />
          </> : <button className="text-white focus:outline-none" onClick={toggleMenu}>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
}
        </div>
      </div>
      {isOpen && (
        <div className="flex flex-col md:hidden bg-white bg-opacity-20 p-4 gap-5">
          <Link href="/about">
            <p className="hover:text-gray-400">ABOUT</p>
          </Link>
          <Link href="/contact">
            <p className="hover:text-gray-400">CONTACT</p>
          </Link>
          <Link href="/game">
            <p className="hover:text-gray-400">GAME</p>
          </Link>
          <Link href="/gallery">
            <p className="hover:text-gray-400">GALLERY</p>
          </Link>
          <ConnectButton />
        </div>
      )}
    </nav>
  );
}
