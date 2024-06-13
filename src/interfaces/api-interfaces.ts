import { ReactNode } from "react";

export interface MintTokenProps {
    show: boolean;
    handleClose: () => void;
}

export interface DrawerProps {
    children: ReactNode;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}
