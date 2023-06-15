import React from 'react';
import './tabs.css';
import { useState } from 'react';
import Photos from '../Photos/photos';
import Videos from '../Videos/videos';
import Favourites from '../Favourites/favourites';

const Tabs = () => {
  const [tab, setTab] = useState(1);
  return (
    <div>
      <div className='tab-container'>
        <div className='tabs'>
          <div className='photo-video-tab'>
            <div className={tab === 1 ? 'select' : 'unSelect'} onClick={()=>{setTab(1)}}>Photos</div>
            <div className={tab === 2 ? 'select' : 'unSelect'} onClick={()=>{setTab(2)}}>Videos</div>
          </div>
          <div className={tab === 3 ? 'select' : 'unSelect'} onClick={()=>{setTab(3)}}>Favourites</div>
        </div>
        {tab === 1 ? <Photos/>:""}
        {tab === 2 ? <Videos/>:""}
        {tab === 3 ? <Favourites/>:""}
      </div>
    </div>
  )
}

export default Tabs;
