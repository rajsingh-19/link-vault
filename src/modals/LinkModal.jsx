import React, { useState, useRef, useEffect } from "react";
import styles from "./linkmodal.module.css";
import { createLink } from "../services/index";
import deleteIcon from "../assets/delete.svg";
import copyIcon from "../assets/copy.svg";
import shopIcon from "../assets/shop.svg";
import instagramIcon from "../assets/instagram.svg";
import facebookIcon from "../assets/facebook.svg";
import youtubeIcon from "../assets/youtube.svg";
import twiterIcon from "../assets/twitter.svg";
import { toast } from "react-toastify";

const LinkModal = ({ handleCloseModal }) => {
  const [activeTab, setActiveTab] = useState("link");
  const modalRef = useRef(null);
  const [showAppType, setShowAppType] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [linkData, setLinkData] = useState({
    title: "",
    url: "",
    linkCategory: "",
    appType: ""
  });

  // Close modal if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleCloseModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleCloseModal]);

  const handleSaveLink = async () => {
    const linkDataToSend = {
      ...linkData,
      linkCategory: activeTab, // Set category based on active tab
    };

    // Remove appType if the category is 'shop' to prevent validation error
    if (activeTab === "shop") {
      delete linkDataToSend.appType;
    };

    const res = await createLink(userId, token, linkDataToSend);
    if(res.status === 201) {
      handleCloseModal();
      toast.success("Successfully added link");
    } else {
      handleCloseModal();
      toast.error("failed to add link");
    }
  };

  const handleToggleChange = async () => {
    setIsChecked(prev => !prev);
    await handleSaveLink(); // Save link when toggled
  };

  const handleTitleChange = (e) => {
    setLinkData(prev => ({
      ...prev,
      title : e.target.value
    }))
  };

  const handleUrlChange = (e) => {
    setLinkData(prev => ({
      ...prev,
      url: e.target.value
    }))
  };

  const handleAppType = (name) => {
    const updatedName = name === "X" ? "Twitter" : name; // Convert "X" to "Twitter"
    setLinkData(prev => ({
      ...prev,
      appType: updatedName
    }))
  };

  const handleAddLink = () => {
    setActiveTab("link");
    setShowAppType(true);
    setLinkData(prev => ({ ...prev, linkCategory: "link" }));
  };

  const handleShop = () => {
    setActiveTab("shop");
    setShowAppType(false);
    setLinkData(prev => ({ ...prev, linkCategory: "shop" }));
  };

  const handleClearDetails = () => {
    console.log("clear");
    setLinkData({
      title: "",
      url: "",
      linkCategory: "",
      appType: ""
    });
    setIsChecked(false); // Reset toggle switch
  }

  const socialArray = [{name: "Instagram", src: instagramIcon}, {name: "FaceBook", src: facebookIcon}, {name: "YouTube", src: youtubeIcon}, {name: "X", src: twiterIcon}];

  return (
    <div className={styles.modalContainer} ref={modalRef}>
      <div>
        <div className={styles.tabButtons}>
          <button
            className={`${styles.tabButton} ${
              activeTab === "link" ? styles.active : styles.inactive
            }`}
            onClick={handleAddLink}
          >
            <img src={shopIcon} alt="social media icon" />
            Add Link
          </button>
          <button
            className={`${styles.tabButton} ${
              activeTab === "shop" ? styles.active : styles.inactive
            }`}
            onClick={handleShop}
          >
            <img src={shopIcon} alt="shop icon" />
            Add Shop
          </button>
        </div>
      </div>
      {/*       link card      */}
        <div className={styles.linkContainer}>
          <p>Enter URL</p>
          <div className={styles.linkTitleContainer}>
            <input type="text" className={styles.linkTitle} placeholder="Link title" onChange={handleTitleChange} value={linkData.title}  />
            {/* Toggle Switch */}
            <input type="checkbox" className={styles.toggleSwitch} checked={isChecked} onChange={handleToggleChange} />
          </div>
          <div className={styles.linkUrlContainer}>
            <input type="text" className={styles.linkUrl} placeholder="Link Url" onChange={handleUrlChange} value={linkData.url}  />
            <div className={styles.btnContainer}>
              <button className={styles.copyBtn}>
                <img src={copyIcon} alt="copy icon" />
              </button>
              <button className={styles.delBtn} onClick={handleClearDetails}>
                <img src={deleteIcon} alt="delete icon" />
              </button>
            </div>
          </div>
          {
            showAppType ? (
              <>
                <hr />
                <p className={styles.socialAppHeading}>Applications</p>
                <div className={styles.socialAppsContainer}>
                  {
                    socialArray.map(({name, src}, index) => (
                      <div key={index} className={styles.socialAppContainer}>
                        <button onClick={() => handleAppType(name)}>
                          <img src={src} alt={`${name} icon`} />
                        </button>
                        <p>{name}</p>
                      </div>
                    ))
                  }
                </div>
              </>
            ) : (
              ""
            )
          }
        </div>
    </div>
  );
};

export default LinkModal;
