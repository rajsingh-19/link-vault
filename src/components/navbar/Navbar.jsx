import React from "react";
import { useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import styles from "./navbar.module.css";
import share from "../../assets/share.svg";

const Navbar = () => {
  // Get current route
  const location = useLocation();
  const showShareButton = location.pathname === "/links";      // Determine if we're on the /links route

  const handleConnected = () => {
    const link = "http://localhost:5173/";
    navigator.clipboard.writeText(link)
      .then(() => toast.success("Link copied to clipboard!"))
      .catch((err) => toast.error("Failed to copy link:", err));
  };

  return (
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
};

export default Navbar;
