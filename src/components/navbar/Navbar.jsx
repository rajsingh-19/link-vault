import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./navbar.module.css";
import { toast } from 'react-toastify';
import share from "../../assets/share.svg";
import brandingLogo from "../../assets/branding.svg";
import userImg from "../../assets/userImg.png";
import signout from "../../assets/signout.svg";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSignout, setShowSignout] = useState(false); 
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1023); // Track screen size
  
  const showShareButton = location.pathname === "/links";      // Determine if we're on the /links route
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1023);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // Cleanup event listener
  }, []);

  const handleConnected = () => {
    const link = "http://localhost:5173/";
    navigator.clipboard.writeText(link)
      .then(() => toast.success("Link copied to clipboard!"))
      .catch((err) => toast.error("Failed to copy link:", err));
  };

  const handleSignout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("fullName");
    localStorage.removeItem("userName");
    localStorage.removeItem("email");
    navigate('/');
  };

  const toggleLogout = () => {
    setShowSignout(prev => !prev);
  };

  return (
    <>
      {
        isMobile ? (
          <div className={styles.smallNavbar}>
            <div className={styles.brandingLogoContainer}>
              <img src={brandingLogo} alt="branding logo" />
            </div>
            <div className={styles.imgSignOutBtnContainer}>
              {
                <div className={styles.logoutBtnContainer}>
                  {
                    showSignout && (
                      <button className={styles.signoutBtn} onClick={handleSignout}>
                        <img src={signout} alt="signout icon" />
                        <span>Sign out</span>
                      </button>
                    )
                  }
                  <button className={styles.logoutBtn} onClick={toggleLogout}>
                    <img src={userImg} alt="user image" />
                  </button>
                </div>
              }
            </div>
          </div>
        ) : (
          <div className={styles.navbarContainer}>
          <div>
            <p className={styles.heading}>Hi, <span>{localStorage.getItem("fullName")}</span></p>
            <p className={styles.subHeading}>Congratulations. You got a great response today.</p>
          </div>
          {
            showShareButton &&
            <button className={styles.shareBtn} onClick={handleConnected}>
              <img src={share} alt="share icon" />
              <span>Share</span>
            </button>
          }
          </div>
        )
      } 
    </>
  )
};

export default Navbar;
