import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"
import styles from "./sidebar.module.css";
import branding from "../../assets/branding.svg";
import linksIcon from "../../assets/links.svg";
import appearanceIcon from "../../assets/appearance.svg";
import analyticsIcon from "../../assets/analytics.svg";
import settingIcon from "../../assets/settings.svg";
import signout from "../../assets/signout.svg";
import userImg from "../../assets/userImg.png";

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showSignout, setShowSignout] = useState(false); 

    // Check if the current path matches the route
    const isActive = (path) => location.pathname === path;

    const handleLinks = () => {
        navigate('/links');
    };

    const handleAppearance = () => {
        navigate('/appearance');
    };

    const handleAnalytics = () => {
        navigate('/analytics');
    };

    const handleSettings = () => {
        navigate('/settings');
    };

    const toggleLogout = () => {
        setShowSignout(prev => !prev);
    };

    const handleSignout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("fullName");
        localStorage.removeItem("userName");
        localStorage.removeItem("email");
        navigate('/');
    };

  return (
    <div className={styles.sidebarContainer}>
        {/*             cuvette icon container   */}
        <div className={styles.iconContainer}>
            <div>
                <img src={branding} alt="spark icon" />
            </div>
        </div>
        {/*         navigation container         */}
        <div className={styles.navigationContainer}>
            <div className={`${isActive('/links') ? styles.active : ''}`}>
                <img src={linksIcon} alt="links icon" />
                <button onClick={handleLinks}>
                    <span>Links</span>
                </button>
            </div>
            <div className={`${isActive('/appearance') ? styles.active : ''}`}>
                <img src={appearanceIcon} alt="appearance icon" />
                <button onClick={handleAppearance}>
                    <span>Appearance</span>
                </button>
            </div>
            <div className={`${isActive('/analytics') ? styles.active : ''}`}>
                <img src={analyticsIcon} alt="analytics icon" />
                <button onClick={handleAnalytics}>
                    <span>Analytics</span>
                </button>
            </div>
            <div className={`${isActive('/settings') ? styles.active : ''}`}>
                <img src={settingIcon} alt="settings icon" />
                <button onClick={handleSettings}>
                    <span>Settings</span>
                </button>
            </div>
        </div>
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
                <span>{localStorage.getItem("fullName")}</span>
            </button>
        </div>
    </div>
  )
};

export default Sidebar;