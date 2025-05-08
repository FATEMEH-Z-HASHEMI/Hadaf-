"use client"
import { useState } from 'react';
import Order from "../sections/Order"
import AddDomain from "../sections/AddDomain"
import SearchBar from "../sections/SearchBar"
import UrlBox from "../sections/UrlBox"
import { DrawerMenu } from "../sections/Drawer"

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
  };

  return (
    <div className="h-screen w-screen bg-bgColor p-[2%] flex flex-col justify-between">

      <h1 className="text-3xl" >
        Domains
      </h1>

      <nav className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-0">
        <span onClick={toggleDrawer(true)}>
          <AddDomain />
        </span>
        <DrawerMenu 
          isOpen={isDrawerOpen} 
          onClose={toggleDrawer(false)} 
        />
        <span className="flex flex-row items-center justify-center gap-5">
          <Order />
          <SearchBar onSearch={setSearchTerm} />
        </span>
      </nav>

      <UrlBox searchTerm={searchTerm} />

    </div>
  );
}


