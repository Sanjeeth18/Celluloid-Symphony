import React, { useState } from 'react';
import Navitemlist from './Navitemlist';
import navlist from '../data/Navlistdata';
import './Header.css';
import Search from './search';

function Header() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const handleSearchClick = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <>
      <header>
        <a href='/' className='logo'>
          Celluloid Symphony 
        </a>
        <ul className='nav'>
          <li>
            <a href='/'>Home</a>
          </li>
          <li onClick={handleSearchClick}>Search</li>
        </ul>
      </header>
      {isSearchVisible && <Search />}
    </>
  );
}

export default Header;
