import React, { useEffect, useState } from 'react';
import './photos.css';
import photo from '../../assets/photo.png';
import white from '../../assets/white-heart.png';
import red from '../../assets/red-heart.png';
import profile from '../../assets/Oval.png';
import { useSelector } from 'react-redux';
import { AddFav } from '../../redux/slice';
import { useDispatch } from 'react-redux';

const Photos = () => {

  const [fav, setFav] = useState(false);
  const [inputData, setInputData] = useState();

  const photoData = useSelector((state) => state.photoVideo.photo);
  const photoDataFav = useSelector((state) => state.photoVideo.photo.photos);
  console.log("photo page", photoDataFav);
  // console.log("photo page id", photoDataFav[i].id);
  const dispatch = useDispatch();
  const previousData = JSON.parse(localStorage.getItem("favPhoto") || "[]");


  const addFav = (data) => {
    console.log(data);
    const previousData = JSON.parse(localStorage.getItem("favPhoto") || "[]");
    console.log("previ", previousData);
    const arr = [];
    previousData.map((user, i) => {
      if ((user && user.id) === (data && data.id)) {
        arr.push("exists");
      }
    });
    if (arr.includes("exists")) {
      alert("already exist");
    }
    else {
      if (data !== "" && data.message !== "Internal Server Error") {
        previousData.push(data);
        localStorage.setItem("favPhoto", JSON.stringify(previousData));
      }
      else {
        alert("enter corect data")
      }
    }
  }

  // const removeFav=(data)=>{
  //  const deleteFavPhoto= JSON.parse(localStorage.getItem("favPhoto")||"[]");
  // let removeId = -1;
  // for(let i=0; i < deleteFavPhoto.length; i++)
  // {
  //   if(deleteFavPhoto[i].id === data.id){
  //     removeId=i;
  //   }
  // }
  // deleteFavPhoto.splice(removeId, 1)
  // localStorage.setItem("favPhoto", JSON.stringify(deleteFavPhoto))
  // setFav(!fav)
  // };

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
            setInputData(data.src.small);
          };

          let fav = false;
          for (let i = 0; i < previousData.length; i++) {
            if (previousData[i].id === data.id) {
              fav = true
              break
            } else {
              fav = false
            }
          }

          return (
            <div className='photo'>
              <img src={data?.src?.medium} alt="" className='photo-img' />
              <div className='photo-info'>
                {fav === false ?
                  <img src={white} alt="" className='heart-img' onClick={() => { addFav(data); favHandler(); }} /> :
                  <img src={red} alt="" className='heart-img' onClick={()=>{removeFav(data)}}/>
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