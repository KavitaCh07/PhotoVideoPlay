import React, { useState } from 'react';
import './viewPhoto.css';
import Header2nd from '../Header2nd/header2nd';
import Footer from '../Footer/footer';
import big from '../../assets/Rectangle.png';
import heart from '../../assets/big-white.png';
import red from '../../assets/big-red.png';
import profile from '../../assets/Oval.png';
import { useLocation } from 'react-router-dom';

const ViewPhoto = (props) => {

    const location = useLocation();
    const [fav, setFav] = useState(false);
    const [inputData, setInputData] = useState();
    const id = location.state.id;
    console.log("id clicked", id);

    const viewPhoto = [
        { id: location.state.id, src: location.state.src, alt: location.state.alt, photographer: location.state.photographer, photographer_url: location.state.photographer_url, }
    ]
    
    console.log("viee", viewPhoto);
    const favourites = JSON.parse(localStorage.getItem("favPhoto") || "[]");

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
        }}

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
            <div className="viewPhoto-container">
                {viewPhoto.map((data) => {

                    const favHandler = () => {
                        setInputData(data.src);
                    };

                    const previousData = JSON.parse(localStorage.getItem("favPhoto") || "[]");
                    let fav = previousData.some((item) => item.id === data.id);

                    return (
                        <div className="view-photo" key={data.id}>
                            <img src={data.src.landscape} alt="" className='bigger-img' />
                            <div className="view-photo-info">
                                <div className="photo-about-heart">
                                    <div className="photo-about">{data.alt}</div>
                                    {fav ?
                                        (<img src={red} alt="" className='big-heart-img' onClick={() => { removeFav(data) }} />) :
                                        (<img src={heart} alt="" className='big-heart-img' onClick={() => { addFav(data); favHandler(); }} />)}
                                </div>
                                <div className="photo-profile-info">
                                    <img src={data.photographer_url} alt="" className='profile-img' />
                                    <div className="photo-profile-name">{data.photographer}</div>
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

export default ViewPhoto;
