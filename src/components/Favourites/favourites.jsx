import React from 'react';
import './favourites.css';
// import photo from '../../assets/photo.png';
// import white from '../../assets/white-heart.png';
import red from '../../assets/red-heart.png';
// import profile from '../../assets/Oval.png';
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
                <img src={favItem.src.small} className='photo-img' alt="" />
              ) : (
                <img src={favItem.image} className='video-img' alt="" />
              )}
              <div className="photo-info">
                <img src={red} className='heart-img' alt="" onClick={() => { removeFav(favItem) }} />
                {isPhoto ? ("") : (
                  <img src={play} alt="" className='play-img' />
                )}
                <div className='photographer-info'>
                  <img src={isPhoto ? favItem.photographer_url : favItem.user.url} className='profile-img' alt="" />
                  <div className="photographer-name">{isPhoto ? favItem.photographer : favItem.user.name}</div>
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
