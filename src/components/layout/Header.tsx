import React from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Header = ({ title }: { title: string }) => {
  return (
    <header className="bg-white border-b p-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-[#003080]">{title}</h1>
      <div className="flex items-center space-x-2"></div>
    </header>
  );
};

export default Header;
