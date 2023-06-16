import React from 'react';
import './favourites.css';
import red from '../../assets/red-heart.png';
import play from '../../assets/play.png';
import { useState } from 'react';

const Favourites = () => {
  const [fav, setFav] = useState(false);
  const favPhotos = JSON.parse(localStorage.getItem("favPhoto") || "[]");

  const removeFav = (data) => {
    const favourites = JSON.parse(localStorage.getItem("favPhoto") || "[]");
    let remId = -1;
    for (let i = 0; i < favourites.length; i++) {
      if (favourites[i].id === data.id) {
        remId = i;
      }
    }
    favourites.splice(remId, 1);
    localStorage.setItem("favPhoto", JSON.stringify(favourites));
    setFav(!fav);
  };

  return (
    <div>
      <div className="favourites-container">
        {favPhotos.reverse().map((favItem, i) => {
          const isPhoto = favItem && favItem.src && favItem.src.small;
          return (
            <div className='photo' key={i}>
              {isPhoto ? (
                <img src={favItem && favItem.src && favItem.src.small} className='photo-img' alt="" />
              ) : (
                <img src={favItem && favItem.image} className='video-img' alt="" />
              )}
              <div className="photo-info">
                <img src={red} className='heart-img' alt="" onClick={() => { removeFav(favItem) }} />
                {isPhoto ? ("") : (
                  <img src={play} alt="" className='play-img' />
                )}
                <div className='photographer-info'>
                  <img src={isPhoto ?favItem && favItem.photographer_url : favItem && favItem.user && favItem.user.url} className='profile-img' alt="" />
                  <div className="photographer-name">{isPhoto ? favItem && favItem.photographer : favItem && favItem.user && favItem.user.name}</div>
                </div>
              </div>
            </div>
          );
        })}

      </div>
    </div>
  )
}

export default Favourites;
