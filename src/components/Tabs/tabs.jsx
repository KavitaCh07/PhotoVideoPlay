import React from 'react';
import './tabs.css';
import { useState } from 'react';
import Photos from '../Photos/photos';
import Videos from '../Videos/videos';
import Favourites from '../Favourites/favourites';

const Tabs = () => {
  let photos=0;
  let videos=1;
  let favourites=2;
  const [tab, setTab] = useState(photos);
  return (
    <div>
      <div className='tab-container'>
        <div className='tabs'>
          <div className='photo-video-tab'>
            <div className={tab === photos ? 'select' : 'unSelect'} onClick={()=>{setTab(photos)}}>Photos</div>
            <div className={tab === videos ? 'select' : 'unSelect'} onClick={()=>{setTab(videos)}}>Videos</div>
          </div>
          <div className={tab === favourites ? 'select' : 'unSelect'} onClick={()=>{setTab(favourites)}}>Favourites</div>
        </div>
        {tab === photos ? <Photos/>:""}
        {tab === videos ? <Videos/>:""}
        {tab === favourites ? <Favourites/>:""}
      </div>
    </div>
  )
}

export default Tabs;
