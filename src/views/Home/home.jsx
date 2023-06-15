import React from 'react';
import './home.css';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import Tabs from '../../components/Tabs/tabs';

const Home = () => {
  return (
    <div>
      <Header/>
      <Tabs/>
      <Footer/>
    </div>
  )
}

export default Home;
