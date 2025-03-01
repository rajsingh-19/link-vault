import React from 'react';
import { useNavigate } from "react-router-dom";
import styles from './Landing.module.css';
import Header from './Header/Header';
import HeroSection from './HeroSection/HeroSection';
import Audience from './Audience/Audience';
import Limitless from './Limitless/Limitless';
import CustomerReviews from './CustomerReviews/CustomerReviews';
import Links from './Links/Links';
import Footer from './Footer/Footer';

const Landing = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/register');
  };
  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className={styles.container}>
      <Header handleSignUp={handleSignUp} />
      <HeroSection handleSignUp={handleSignUp} />
      <Audience />
      <Limitless />
      <CustomerReviews />
      <Links />
      <Footer handleSignUp={handleSignUp} handleLogin={handleLogin} />
    </div>
  )
}

export default Landing;
