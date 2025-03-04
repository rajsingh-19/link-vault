import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./preview.module.css";
import { incrementCtaCount, getAllSocialLinks, getAllShopLinks, getUserInfo, createClick, getAppearance } from "../../services/index";
import sharingProfile from "../../assets/sharingProfile.svg";
import userImg from "../../assets/userImg.png";
import branding from "../../assets/branding.svg";
import instagramIcon from "../../assets/instagram.svg";
import facebookIcon from "../../assets/facebook.svg";
import youtubeIcon from "../../assets/youtube.svg";
import twiterIcon from "../../assets/twitter.svg";
import shopIcon from "../../assets/shop.svg";
import previewCross from "../../assets/previewCross.svg";
import { toast } from "react-toastify";

const PreviewCard = ({ bannerColor, liveProfile, modalStatus, hideShareButton, closePreviewModal, appearanceCustomization, setAppearanceCustomization = () => {} }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("link");
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [showLinks, setShowLinks] = useState(false); 
  const [links, setLinks] = useState([]);  
  const [cardBgColor, setCardBgColor] = useState("#F7F7F7");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);
  const [userInformation, setUserInformation] = useState({
    profileImgUrl: "",
    bannerColor: "#3a2d25",
    userName: ""
  });

  useEffect(() => {
    fetchUserData();
  },[]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // Cleanup event listener
  }, [window.innerWidth]);

  useEffect(() => {
    if (!modalStatus) {
      fetchAllShopLinks();
      fetchSocialLinks();
    }
  }, [modalStatus]);
  
  useEffect(() => {
    fetchAppearance();
  }, []);

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

        setLinks(linkDetails);
        setShowLinks(linkDetails.length > 0); 
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

  const socialArray = [{name: "Instagram", src: instagramIcon}, {name: "FaceBook", src: facebookIcon}, {name: "YouTube", src: youtubeIcon}, {name: "Twitter", src: twiterIcon}];
  const shop =  {name: "shop", src: shopIcon};

  const handleShareProfile = () => {
    const profileLink = `${window.location.origin}/profile`;
    navigator.clipboard.writeText(profileLink)
      .then(() => toast.success("Copied to clipboard."))
      .catch((err) => console.error("Failed to copy: ", err));
  };

  const handleGoToLink = async (linkId) => {
    try {
      const res = await createClick(linkId);
      const resData = await res.json();

      if (resData?.redirectUrl) {
        window.location.href = resData.redirectUrl;
      } else {
        toast.error("Failed to retrieve the redirection link");
      }
    } catch(error) {
      console.error("Failed to go to the link:", error);
      toast.error("Failed to load the link"); 
    }
  };

  const fetchAppearance = async () => {
    try {
      const res = await getAppearance(userId, token);
      if(res.status === 200) {
        const resData = await res.json();
        const fetchedAppearanceDetails = resData.data;
  
        setAppearanceCustomization({
          layout: fetchedAppearanceDetails?.layout,
          buttons: {
            fill: fetchedAppearanceDetails?.buttons?.fill,
            outline: fetchedAppearanceDetails?.buttons?.outline,
            hardShadow: fetchedAppearanceDetails?.buttons?.hardShadow,
            softShadow: fetchedAppearanceDetails?.buttons?.softShadow,
            special: fetchedAppearanceDetails?.buttons?.special,
            btnColor: fetchedAppearanceDetails?.buttons?.btnColor,
            btnFontColor: fetchedAppearanceDetails?.buttons?.btnFontColor
          },
          fonts: {
            font: fetchedAppearanceDetails?.fonts?.font,
            color: fetchedAppearanceDetails?.fonts?.color
          },
          themes: fetchedAppearanceDetails?.themes
        })
      }
    } catch (error) {
      console.error("You have not applied any appearance customization", error);
    }
  };

  return (
    <div className={styles.previewCard} style={{ backgroundColor: appearanceCustomization?.themes || cardBgColor }}>
      <div className={styles.banner} style={{ backgroundColor: bannerColor || userInformation.bannerColor }}>
        {
          !hideShareButton && (
            <button className={styles.sharingBtn} onClick={handleShareProfile}>
              <img src={sharingProfile} alt="sharing profile icon" />
            </button>
          )
        }
        <img className={styles.profileImage} src={liveProfile || userInformation.profileImgUrl || userImg} alt="Profile" />
        <span className={styles.userName} style={{ fontFamily: appearanceCustomization?.fonts?.font || "Poppins" , color: appearanceCustomization?.fonts?.color || "#FFFFFF" }}>{`@${userInformation.userName}`}</span>
      </div>
      <div className={styles.tabButtons}>
        <button className={`${styles.tabButton} ${activeTab === "link" ? styles.active : styles.inactive}`} onClick={handleAddLink} >
          link
        </button>
        <button className={`${styles.tabButton} ${activeTab === "shop" ? styles.active : styles.inactive }`} onClick={handleShop}> 
          Shop
        </button>
      </div>
      <div className={appearanceCustomization?.layout === "Stack" 
      ? styles.linkListContainer 
      : appearanceCustomization?.layout === "Grid" 
      ? styles.gridListContainer 
      : appearanceCustomization?.layout === "Carousel" 
      ? styles.carouselListContainer 
      : styles.linkListContainer}>
      {
        showLinks && links.map(({title, appType, _id}) => {
          // Find the correct social icon based on appType
          const matchedSocial = socialArray.find(social => social.name === appType);
      
          // Determine the src (either social icon or shop icon)
          const src = activeTab === "link" ? matchedSocial?.src || userImg : shop.src; 

          return (
            <div key={_id} 
              className={`
              ${appearanceCustomization?.layout === "Stack" ? styles.linkContainer : ""}
              ${appearanceCustomization?.layout === "Grid" ? styles.gridContainer : styles.linkContainer}
              ${appearanceCustomization?.layout === "Carousel" ? styles.carouselContainer : styles.linkContainer}
              ${appearanceCustomization?.buttons?.fill === "f1" ? styles.f1 : ""}
              ${appearanceCustomization?.buttons?.fill === "f2" ? styles.f2 : ""}
              ${appearanceCustomization?.buttons?.fill === "f3" ? styles.f3 : ""}
              ${appearanceCustomization?.buttons?.outline === "o1" ? styles.o1 : ""}
              ${appearanceCustomization?.buttons?.outline === "o2" ? styles.o2 : ""}
              ${appearanceCustomization?.buttons?.outline === "o3" ? styles.o3 : ""}
              ${appearanceCustomization?.buttons?.hardShadow === "h1" ? styles.h1 : ""}
              ${appearanceCustomization?.buttons?.hardShadow === "h2" ? styles.h2 : ""}
              ${appearanceCustomization?.buttons?.hardShadow === "h3" ? styles.h3 : ""}
              ${appearanceCustomization?.buttons?.softShadow === "s1" ? styles.s1 : ""}
              ${appearanceCustomization?.buttons?.softShadow === "s2" ? styles.s2 : ""}
              ${appearanceCustomization?.buttons?.softShadow === "s3" ? styles.s3 : ""}
              `}
              style={{ backgroundColor: appearanceCustomization?.buttons?.btnColor  }}
              // className={styles.linkContainer}
              onClick={() => handleGoToLink(_id)}>
              <div className={appearanceCustomization?.layout === "Stack"
                ? styles.iconContainer
                : appearanceCustomization?.layout === "Grid" 
                ? styles.gridIconContainer
                : appearanceCustomization?.layout === "Carousel"
                ? styles.carouselIconContainer
                : styles.iconContainer} >
                <img className={styles.icon} src={src} alt={`${title} icon`} />
              </div>
              <span className={styles.linkText} style={{ color: appearanceCustomization?.buttons?.btnFontColor }}>
                {title}
              </span>
            </div>
          );
        })
      }
      </div>
      {/*     footer area      */}
      <button className={styles.getConnected} onClick={handleConnected}>Get Connected</button>
      {
        isMobile && !hideShareButton ? (
          <button onClick={closePreviewModal} className={styles.previewCrossBtn}>
          <img src={previewCross} alt="preview cross icon" />
        </button>
      ) : !isMobile || hideShareButton ? (
        <div className={styles.brandingContainer}>
        <img src={branding} alt="branding logo" />
      </div>
      ): null
    }
    </div>
  );
};

export default PreviewCard;
