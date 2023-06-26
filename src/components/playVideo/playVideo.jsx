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
        {id: location.state.id, avg_color: location.state.avg_color, image: location.state.image,
        user:{id: location.state.user.user_id, name: location.state.user.name, url: location.state.user.url}, 
        video_files:[{id: location.state.video_files[0].id, quality: location.state.video_files[0].quality, file_type: location.state.video_files[0].file_type, link: location.state.video_files[0].link},
         {id: location.state.video_files[1].id, quality: location.state.video_files[1].quality, file_type: location.state.video_files[1].file_type, link: location.state.video_files[1].link}]},
    ];
    
    console.log("user id", location.state.user_id);
    console.log("video clicked", playVideo);

    
    const previousData = JSON.parse(localStorage.getItem("favPhoto") || "[]");

    const addFav = (data) => {
        console.log("adding",data);
        const previousData = JSON.parse(localStorage.getItem("favPhoto") || "[]");
        console.log("previ", previousData);
        const arr = [];
        previousData.map((user, i) => {
            if ((user && user.id) === (data && data.id)) {
                console.log("adding",user.id,data.id);
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
            <Header2nd />
            <div className="playVideo-container">
                {playVideo.map((data) => {
                    // console.log("video data", data.videoId);

                    const favHandler = () => {
                        setInputData(data.video_files[0].link);
                    };

                    let fav = false;
                    for (let i = 0; i < favourites.length; i++) {
                        if (favourites[i].id === data.id) {
                            console.log("both  video id", favourites[i].id, data.id);
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
                                <source src={data.video_files[0].link} type="video/mp4" className='video-bigger-img' />
                            </video>
                            <div className="view-photo-info">
                                <div className="photo-about-heart">
                                    <div className="video-about">Lorem ipsum dolor sit amet </div>
                                    {fav ?
                                        (<img src={red} alt="" className='video-big-heart-img' onClick={()=>{removeFav(data)}}/>) :
                                        (<img src={heart} alt="" className='video-big-heart-img' onClick={()=>{addFav(data); favHandler();}}/>)}
                                </div>
                                <div className="video-profile-info">
                                    <img src={data.user.url} alt="" className='profile-img' />
                                    <div className="photo-profile-name">{data.user.name}</div>
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