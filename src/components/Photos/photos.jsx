import React, { useEffect, useState } from 'react';
import './photos.css';
import photo from '../../assets/photo.png';
import white from '../../assets/white-heart.png';
import red from '../../assets/red-heart.png';
import { useSelector } from 'react-redux';
import { AddFav } from '../../redux/slice';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import ViewPhoto from '../ViewPhoto/viewPhoto';

const Photos = () => {

  const [fav, setFav] = useState(false);
  const [inputData, setInputData] = useState();
  const navigate = useNavigate();

  const photoData = useSelector((state) => state.photoVideo.photo);
  const photoDataFav = useSelector((state) => state.photoVideo.photo.photos);
  console.log("photo page", photoDataFav);
  // console.log("photo page id", photoDataFav[i].id);
  const dispatch = useDispatch();
  const previousData = JSON.parse(localStorage.getItem("favPhoto") || "[]");


  const addFav = (data) => {
    const previousData = JSON.parse(localStorage.getItem("favPhoto") || "[]");
    const exists = previousData.some((item) => item.id === data.id);
    if (exists) {
      // Alert or handle the case when the item already exists
    } else {
      if (data !== "" && data.message !== "Internal Server Error") {
        const updatedData = [...previousData, data];
        localStorage.setItem("favPhoto", JSON.stringify(updatedData));
        setFav(true); // Update favorite status
      } else {
        alert("Enter correct data");
      }
    }
  }

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
      <div className='photo-container'>
        {photoData && photoData.photos && photoData.photos.map((data, i) => {

          const favHandler = () => {
            setInputData(data.src.medium);
          };

          const previousData = JSON.parse(localStorage.getItem("favPhoto") || "[]");
        let fav = previousData.some((item) => item.id === data.id);

          const toComponentB = (data) => {
            navigate('/viewPhoto', { state: { id: data.id, src: { landscape: data.src.landscape, medium: data.src.medium, small: data.src.small }, photographer: data.photographer, alt: data.alt, photographer_url: data.photographer_url } });
          }

          return (
            <div className='photo'>
              <Link to="/viewPhoto" state={{ id: data.id, src: { landscape: data.src.landscape, medium: data.src.medium, small: data.src.small }, photographer: data.photographer, alt: data.alt, photographer_url: data.photographer_url }} key={data.id} className="linkButton">
                <img src={data?.src?.medium} alt="" className='photo-img' onClick={() => { toComponentB(data); }} />
              </Link>
              <div className='photo-info'>
                {fav === false ?
                  <img src={white} alt="" className='heart-img' onClick={() => { addFav(data); favHandler(); }} /> :
                  <img src={red} alt="" className='heart-img' onClick={() => { removeFav(data) }} />
                }
                <div className='photographer-info'>
                  <img src={data?.photographer_url} alt="" className='profile-img' />
                  <div className="photographer-name">{data.photographer}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default Photos;
