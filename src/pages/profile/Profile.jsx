import React, { useState, useEffect } from "react";
import styles from "./profile.module.css";
import { getAppearance } from "../../services";
import PreviewCard from "../../components/preview/PreviewCard";

const Profile = () => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const [customization, setCustomization] = useState({
    layout: "Stack",
    buttons: {
      fill: "",
      outline: "",
      hardShadow: "",
      softShadow: "",
      special: "",
      btnColor: "#FFFFFF",
      btnFontColor: "#888888"
    },
    fonts: {
      font: "Poppins",
      color: "#FFFFFF"
    },
    themes: ""
  });
    
  useEffect(() => {
    const fetchAppearance = async () => {
      try {
        const res = await getAppearance(userId, token);
        if (res.status === 200) {
          const resData = await res.json();
          const getResData = resData.data;
  
          setCustomization({
            layout: getResData?.layout,
            buttons: {
              fill: getResData?.buttons?.fill,
              outline: getResData?.buttons?.outline,
              hardShadow: getResData?.buttons?.hardShadow,
              softShadow: getResData?.buttons?.softShadow,
              special: getResData?.buttons?.special,
              btnColor: getResData?.buttons?.btnColor,
              btnFontColor: getResData?.buttons?.btnFontColor
            },
            fonts: {
              font: getResData?.fonts?.font,
              color: getResData?.fonts?.color
            },
            themes: getResData?.themes
          }); 
        }
      } catch (error) {
        console.error("Failed to fetch appearance settings", error);
      }
    };
    
    fetchAppearance();
  }, []);
  
  return (
    <div className={styles.profilePageContainer}>
        <div className={styles.profileViewContainer}>
            {/* <PreviewCard hideShareButton={true} appearanceCustomization={customization} /> */}
            <PreviewCard hideShareButton={true} />
        </div>
    </div>
  )
}

export default Profile;
