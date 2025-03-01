import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./preview.module.css";
import { incrementCtaCount, getAllSocialLinks, getAllShopLinks, getUserInfo } from "../../services/index";
import sharingProfile from "../../assets/sharingProfile.svg";
import userImg from "../../assets/userImg.png";
import branding from "../../assets/branding.svg";
import instagramIcon from "../../assets/instagram.svg";
import facebookIcon from "../../assets/facebook.svg";
import youtubeIcon from "../../assets/youtube.svg";
import twiterIcon from "../../assets/twitter.svg";
import shopIcon from "../../assets/shop.svg";

import { toast } from "react-toastify";

const PreviewCard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("link");
  // const userName = localStorage.getItem("userName");
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [showLinks, setShowLinks] = useState(false); 
  const [links, setLinks] = useState([]);  
  const [profileImgUrl, setProfileImgUrl] = useState("");
  const [userInformation, setUserInformation] = useState({
    profileImgUrl: "",
    bannerColor: "#3a2d25",
    userName: ""
  });  

  const handleConnected = async () => {
    try {
      if (!userId || !token) {
        console.error("User ID or Token is missing");
        return;
      };
      await incrementCtaCount(userId, token);
      navigate('/');
    } catch (error) {
      console.error("Error incrementing CTA count:", error);
    }
  };

  //      fn for fetching all the social media links
  const fetchSocialLinks = async () => {
    try {
      const res = await getAllSocialLinks(userId, token);
        
      if (res.status === 200) {
        const resData = await res.json();
        const linkDetails = resData.totalLinks;
        // console.log(resData);
        // console.log(linkDetails);
        setLinks(linkDetails);
        setShowLinks(true); 
      }
    } catch(error) {
      console.error("Failed to fetch user data:", error);
      toast.error("Failed to load user data.");
    }
  };
  
  //      fn for fetching all the shop links 
  const fetchAllShopLinks = async () => {
    try {
      const res = await getAllShopLinks(userId, token);
      
      if (res.status === 200) {
        const resData = await res.json();
        const linkDetails = resData.totalLinks;
        // console.log(resData);
        // console.log(linkDetails);
        setLinks(linkDetails);
        setShowLinks(true); 
      }
    } catch(error) {
      console.error("Failed to fetch user data:", error);
      toast.error("Failed to load user data.");
    }
  };

  const fetchUserData = async () => {
      try {
      const res = await getUserInfo(userId, token);
      
      if (res.status === 200) {
        const resData = await res.json();
        const result = await resData.result;
        
        setUserInformation({
          userName: result.userName,
          bannerColor: result.bannerColor,
          profileImgUrl: result.profileImgUrl,
        })
      };
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      toast.error("Failed to load user data.");
    }
  };
  
  useEffect(() => {
    fetchUserData();
  },[]);

  useEffect(() => {
    fetchSocialLinks();
  }, []);
    
  // fn for listing the social media links
  const handleAddLink = () => {
    fetchSocialLinks();
    setActiveTab("link");
  };
  // fn for listing the shop links
  const handleShop = () => {
    fetchAllShopLinks();
    setActiveTab("shop");
  };

  const socialArray = [{name: "Instagram", src: instagramIcon}, {name: "FaceBook", src: facebookIcon}, {name: "YouTube", src: youtubeIcon}, {name: "X", src: twiterIcon}];
  const shop =  {name: "shop", src: shopIcon};

  const handleShareProfile = () => {
    console.log("share profile");
  };

  return (
    <div className={styles.previewCard}>
      <div className={styles.banner} style={{ backgroundColor: userInformation.bannerColor }}>
        <button className={styles.sharingBtn} onClick={handleShareProfile}>
          <img src={sharingProfile} alt="sharing profile icon" />
        </button>
        <img className={styles.profileImage} src={userInformation.profileImgUrl || userImg} alt="Profile" />
        <span className={styles.userName}>{`@${userInformation.userName}`}</span>
      </div>
      <div className={styles.tabButtons}>
        <button className={`${styles.tabButton} ${activeTab === "link" ? styles.active : styles.inactive}`} onClick={handleAddLink} >
          link
        </button>
        <button className={`${styles.tabButton} ${activeTab === "shop" ? styles.active : styles.inactive }`} onClick={handleShop}> 
          Shop
        </button>
      </div>
      <div className={styles.linkListContainer}>
      {
        showLinks && links.map(({title, appType, _id}) => {
          // Find the correct social icon based on appType
          const matchedSocial = socialArray.find(social => social.name === appType);
      
          // Determine the src (either social icon or shop icon)
          const src = activeTab === "link" ? matchedSocial?.src || userImg : shop.src; 

          return (
            <div key={_id} className={styles.linkContainer}>
              <div className={styles.iconContainer}>
                <img className={styles.icon} src={src} alt={`${title} icon`} />
              </div>
              <span className={styles.linkText}>{title}</span>
            </div>
          );
        })
      }
      </div>
      {/*     footer area      */}
      <button className={styles.getConnected} onClick={handleConnected}>Get Connected</button>
      <div className={styles.brandingContainer}>
        <img src={branding} alt="branding logo" />
      </div>
    </div>
  );
};

export default PreviewCard;
