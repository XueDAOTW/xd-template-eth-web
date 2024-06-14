'use client';
import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { LinkListProps } from '@/types/uiTypes';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const linkList: LinkListProps[] = [
    { name: 'ABOUT', href: '/about' },
    { name: 'CONTACT', href: '/contact' },
    { name: 'GAME', href: '/game' },
    { name: 'GALLERY', href: '/gallery' },
  ]
  return (
    <nav className="bg-white absolute top-0 w-full p-4 text-white bg-opacity-20">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <p className="text-2xl font-bold">XueDAO Connect</p>
        </Link>
        <div className="space-x-4 hidden md:flex">
          {linkList.map((link) => (
            <Link key={link.href} href={link.href}>
              <p className="hover:text-gray-400">{link.name}</p>
            </Link>
          ))}
        </div>
        <div className="hidden md:flex">
          <ConnectButton />
        </div>
        <div className="md:hidden">
          {isOpen ?
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
          {linkList.map((link) => (
            <Link key={link.href} href={link.href}>
              <p className="hover:text-gray-400">{link.name}</p>
            </Link>
          ))}
          <ConnectButton />
        </div>
      )}
    </nav>
  );
}
