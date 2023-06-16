import React, { useState } from 'react';
import './playVideo.css';
import Header2nd from '../Header2nd/header2nd';
import Footer from '../Footer/footer';
import heart from '../../assets/big-white.png';
import red from '../../assets/big-red.png';
import big from '../../assets/Rectangle.png';
import { useNavigate } from 'react-router-dom';
import profile from '../../assets/Oval.png';
import { useLocation } from 'react-router-dom';

const PlayVideo = () => {
    const navigate = useNavigate();
    const [fav, setFav] = useState();
    const [inputData, setInputData] = useState();
    const location = useLocation();
    const playVideo = [
        { videoId: location.state.videoId, src: location.state.src, url: location.state.url, id: location.state.id, username: location.state.username, userphoto: location.state.userphoto }
    ];

    console.log("video clicked", playVideo);

    
    const previousData = JSON.parse(localStorage.getItem("favPhoto") || "[]");

    const addFav = (data) => {
        console.log("adding",data);
        const previousData = JSON.parse(localStorage.getItem("favPhoto") || "[]");
        console.log("previ", previousData);
        const arr = [];
        previousData.map((user, i) => {
            if ((user && user.id) === (data && data.videoId)) {
                console.log("adding",user.id,data.videoId);
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

        const favourites = JSON.parse(localStorage.getItem("favPhoto") || "[]");

    const removeFav = (data) => {
        const favourites = JSON.parse(localStorage.getItem("favPhoto") || "[]");
        let remId = -1;
        for (let i = 0; i < favourites.length; i++) {
          if (favourites[i].id === data.videoId) {
            remId = i;
          }
        }
        favourites.splice(remId, 1);
        localStorage.setItem("favPhoto", JSON.stringify(favourites));
        setFav(!fav);
      };


    return (
        <div>
            <Header2nd />
            <div className="playVideo-container">
                {playVideo.map((data) => {
                    // console.log("video data", data.videoId);

                    const favHandler = () => {
                        setInputData(data.url);
                    };

                    let fav = false;
                    for (let i = 0; i < favourites.length; i++) {
                        if (favourites[i].videoId === data.videoId) {
                            console.log("both  video id", favourites[i].id, data.videoId);
                            fav = true;
                            break
                        }
                        else {
                            fav = false;
                        }
                    }

                    return (
                        <div className="play-video">
                            <video className='video-box' controls>
                                <source src={data.url} type="video/mp4" className='video-bigger-img' />
                            </video>
                            <div className="view-photo-info">
                                <div className="photo-about-heart">
                                    <div className="video-about">Lorem ipsum dolor sit amet </div>
                                    {fav ?
                                        (<img src={red} alt="" className='video-big-heart-img' onClick={()=>{removeFav(data)}}/>) :
                                        (<img src={heart} alt="" className='video-big-heart-img' onClick={()=>{addFav(data); favHandler();}}/>)}
                                </div>
                                <div className="video-profile-info">
                                    <img src={data.userphoto} alt="" className='profile-img' />
                                    <div className="photo-profile-name">{data.username}</div>
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>
            <Footer />
        </div>
    )
}

export default PlayVideo;