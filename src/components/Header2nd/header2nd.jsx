import React from 'react';
import './header2nd.css';
import logo2 from '../../assets/Logo (1).png';

const Header2nd = () => {
  return (
    <div>
      <div className="header-2nd-container">
        <div className="header-logo-searchBar">
        <div className="header2nd-log"><img src={logo2} alt="" /></div>
        <form action="" className='header2-search-form'>
            <input type="text" placeholder='Search photos, videos, artists' className='header2-search-input'/>
            <button className='header2-search-btn'>SEARCH</button>
        </form>
        </div>
      </div>
    </div>
  )
}

export default Header2nd
