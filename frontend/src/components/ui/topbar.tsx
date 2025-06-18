import { FC, ReactNode } from "react";
import { Avatar } from "./avatar"; // ou onde estiver seu Avatar

interface TopBarProps {
  children?: ReactNode;
}

export const TopBar: FC<TopBarProps> = ({ children }) => (
  <header className="flex items-center justify-between bg-white px-6 py-4 shadow-sm">
    {children}
  </header>
);
