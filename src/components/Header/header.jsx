import React, { useEffect } from 'react';
import './header.css';
import logo from '../../assets/Logo.png';
import axios from 'axios';
import { useState } from 'react';
import { AddPhoto, AddVideo } from '../../redux/slice';
import { useDispatch } from 'react-redux';

const Header = () => {

  const [photoData, setPhotoData] = useState();
  const [videoData, setVideoData] = useState();
  const [inputData, setInputData] = useState();
  
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setInputData(e.target.inputData.value);
    localStorage.setItem("searchTerm", JSON.stringify(inputData))
    setTimeout(() => {
      dispatch(AddPhoto(photoData));
      dispatch(AddVideo(videoData))
    }, 500);
  }

  let value = "ocean";
  useEffect(() => {
    axios.get(`https://api.pexels.com/v1/search?query=${inputData || value}&per_page=10`,
      {
        mode: 'cors',
        credentials: "same-origin",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "tFGvMnGxTtsFqSf6DwgXiatTkQBSAiihxPCNAHzaNDECimyqkLLw100L"
        },
      }).then((res) => {
        console.log(res);
        setPhotoData(res.data);
        // dispatch(AddPhoto(photoData))
      }).catch((err) => {
        console.log(err);
      })
  }, [inputData]);


  useEffect(() => {
    axios.get(`https://api.pexels.com/videos/search?query=${inputData || value}&per_page=10`,
      {
        headers: {
          Authorization: "tFGvMnGxTtsFqSf6DwgXiatTkQBSAiihxPCNAHzaNDECimyqkLLw100L"
        },
      }).then((res) => {
        console.log(res);
        setVideoData(res.data);
        // console.log("dispatch", photoData);
      }).catch((err) => {
        console.log(err);
      })
  }, [inputData]);


  return (
    <div>
      <div className='header-container'>
        <div className='header-content'>
          <div className='header-content-contain'>
            <div className='header-logo'><img src={logo} alt='' /></div>
            <div className='header-heading-search'>
              <div className='header-heading'>
                <div className='discover-world'>Discover the world’s best photos & videos</div>
                <div className='best-memories'>Best memories online</div>
              </div>
              <div className='searchBar' >
                <form action='' className='searchBar-form' onSubmit={handleSubmit}>
                  <input type="text" placeholder='Search photos, videos, artists' name='inputData' className='search-input' />
                  <button className='search-btn'>SEARCH</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header;
