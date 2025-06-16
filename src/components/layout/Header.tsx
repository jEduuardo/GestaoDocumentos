
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Header = ({ title }: { title: string }) => {
  return (
    <header className="bg-white border-b p-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-process-blue">{title}</h1>
      <div className="flex items-center space-x-2">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar..." 
            className="pl-8 w-64"
          />
        </div>
        <Button>
          Novo
        </Button>
      </div>
    </header>
  );
};

export default Header;
