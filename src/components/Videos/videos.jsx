import React, { useState } from 'react';
import './videos.css';
import video from '../../assets/video.png';
import white from '../../assets/white-heart.png';
import red from '../../assets/red-heart.png';
import profile from '../../assets/Oval.png';
import play from '../../assets/play.png';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

const Videos = () => {

  const navigate = useNavigate()
  const [fav, setFav] = useState(false);
  const [inputData, setInputData] = useState();
  const videoData = useSelector((state) => state.photoVideo.video);
  console.log("video page", videoData);
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
    }}

  const removeFav = (data) => {
    const favourites = JSON.parse(localStorage.getItem("favPhoto") || "[]");
    // console.log("id", favourites);
    let remId = -1;
    for (let i = 0; i < favourites.length; i++) {
      if (favourites[i].id === data.id) {
        remId = i;
      }
    }
    // console.log("remId", remId);
    favourites.splice(remId, 1);
    // console.log("new remId", favourites);
    localStorage.setItem("favPhoto", JSON.stringify(favourites));
    setFav(!fav);
  };

  return (
    <div>
      <div className='video-container'>
        {videoData && videoData.videos && videoData.videos.map((data, i) => {

          const favHandler = () => {
            setInputData(data.image);
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

          const toComponentB = (data) => {
            navigate('/playVideo', { state: {videoId:data.id, src:data.image, url: data.video_files[0].link, id: data.video_files[0].id, username: data.photographer, userphoto: data.user.url } });
          }


          return (
            <div className='video'>
              <img src={data.image} alt="" className='video-img' />
              <div className='video-info'>
                {fav === false ?
                  <img src={white} alt="" className='heart-img' onClick={() => { addFav(data); favHandler(); }} /> :
                  <img src={red} alt="" className='heart-img' onClick={() => { removeFav(data) }} />
                }
                <Link to="/playVideo" state={{videoId:data.id, src: data.image, url: data.video_files[0].link, username: data.user.name, id: data.video_files[0].id, userphoto: data.user.url }} key={data.id} className="linkButton">
                <img src={play} alt="" className='play-img' o onClick={() => { toComponentB(data) }}/>
                </Link>
                <div className='photographer-info'>
                  <img src={data.user.url} alt="" className='profile-img' />
                  <div className="photographer-name">{data.user.name}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Videos;
