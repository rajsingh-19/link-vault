import React, {useEffect, useState} from "react";
import styles from "./links.module.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { getUserInfo, updateUserInfo, getAllSocialLinks, getAllShopLinks } from "../../services/index";
import Preview from "../../components/preview/PreviewCard";
//      profile
import profileImg from "../../assets/userImg.png";
//      link card
import shopIcon from "../../assets/shop.svg";
import deleteIcon from "../../assets/delete.svg";
import editIcon from "../../assets/edit.svg";
import clicksIcon from "../../assets/clicksIcon.svg";
//      banner
import userImg from "../../assets/userImg.png";
import sparkLogo from "../../assets/sparkLogo.svg";
//      modal
import LinkModal from "../../modals/LinkModal";
import { toast } from "react-toastify";

const Links = () => {
  const [modalStatus, setModalStatus] = useState(false);
  const [image, setImage] = useState(null);
  const [showLinks, setShowLinks] = useState(false); 
  // const [bio, setBio] = useState("");
  const maxLength = 80;
  const [activeTab, setActiveTab] = useState("link");
  const [links, setLinks] = useState([]);
  // const [showLinks, setShowLinks] = useState(false);
  const [bgColor, setBgColor] = useState("#3a2d25");
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [profileImgUrl, setProfileImgUrl] = useState(""); // Default empty image
  const [updateUserInformation, setUpdateUserInformation] = useState({
    bio: "",
    profileImgUrl: "",
    bannerColor: "#3a2d25",
    userName: ""
  });
  
  //      profile section functions
  // fn for image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", `${import.meta.env.VITE_API_PRESET}`); // Replace with your Cloudinary preset

      try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_API_CLOUDNAME}/image/upload`, {
          method: "POST",
          body: formData,
        });
    
        if (!res.ok) {
          throw new Error("Failed to upload image");
        };

        const data = await res.json();
        const imgUrl = data.secure_url; // Get the Cloudinary image URL
    
        // Update state with Cloudinary image URL
        setProfileImgUrl(imgUrl);
        setUpdateUserInformation((prev) => ({
          ...prev,
          profileImgUrl: imgUrl,
        }));
    
        toast.success("Image uploaded successfully!");
      } catch (error) {
        console.error("Image upload error:", error);
        toast.error("Image upload failed!");
      }
    }
  };
  
  // fn for remove the uploaded image
  const handleRemoveImage = () => {
    // setImage(null);
    setProfileImgUrl("");
    setUpdateUserInformation((prev) => ({
      ...prev,
      profileImgUrl: ""
    }));
  };
  
  // fn for bio update
  const handleBioChange = (e) => {
    setUpdateUserInformation(prev => ({
      ...prev,
      bio: e.target.value
    }));
  };

  // fn for banner color update 
  const handleBannerColorChange = (color) => {
    // setBgColor(color);
    setUpdateUserInformation(prev => ({
      ...prev,
      bannerColor: color
    }));
  };

  const handleSaveBtn = async() => {
    try {
      await updateUserInfo(userId, token, updateUserInformation);
      toast.success("User information updated");
    } catch (error) {
      toast.error("Error updating user info:", error);
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
        console.log(linkDetails);
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

        setUpdateUserInformation({
          bannerColor: result.bannerColor,
          profileImgUrl: result.profileImgUrl,
          bio: result.bio,
          userName: result.userName
        })
      };
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      toast.error("Failed to load user data.");
    }
  };
  
  useEffect(() => {
    if(links.length >= 1) {
      setShowLinks(true);
    };
  }, []);

  useEffect(() => {
    fetchUserData();
  },[]);

  useEffect(() => {
    fetchSocialLinks();
  }, []);

  // toggle button for 
  const toggleLink = (id) => {
    setLinks(
      links.map((link) =>
        link.id === id ? { ...link, enabled: !link.enabled } : link
      )
    );
  };
  // fn for deleting the link
  const deleteLink = (id) => {
    setLinks(links.filter((link) => link.id !== id));
  };
  // fn for edit the link 
  const editLink = (id, field, value) => {
    setLinks(
      links.map((link) => (link.id === id ? { ...link, [field]: value } : link))
    );
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
    
  const presetColors = ["#3a2d25", "#ffffff", "#000000", "#047857", "#6D28D9", "#D97706"];
  // Determine text color based on background color
  const textColor = updateUserInformation.bannerColor === "#ffffff" ? "#000000" : "#ffffff";
    
  //      fn for opening modal
  const handleCreateLink = () => {
    console.log("modal open");
    setModalStatus(true);
  };
  //      fn for closing modal
  const handleCloseModal = () => {
    console.log("modal closed");
    setModalStatus(false);
  };
    
  return (
    <div className={styles.linkPageContainer}>
      {/*         Sidebar             */}
      <div className={styles.sidebarContainer}>
        <Sidebar />
      </div>
      {/*         Navbar               */}
      <div className={styles.navContainer}>
        <Navbar />
      </div>
      {/*         Content Section      */}
      <div className={styles.contentContainer}>
        {/*       left section - Preview                */}
        <div className={styles.previewSection}>
          <Preview />
        </div>
        {/*       right section - profile, link card, banner   */}
        <div className={styles.linksSection}>
          {/*         Profile      */}
          <div className={styles.profileOuterContainer}>
            <p>Profile</p>
            <div className={styles.profileContainer}>
              <div className={styles.firstSection}>
                <div className={styles.profileImageContainer}>
                  <img src={updateUserInformation.profileImgUrl || profileImg} alt="Profile image" />
                </div>
                <div className={styles.imageButtons}>
                  <label className={styles.uploadBtn}>
                    Pick an image
                    <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
                  </label>
                  <button className={styles.removeBtn} onClick={handleRemoveImage}>
                    Remove
                  </button>
                </div>
              </div>
              <div className={styles.profileInfo}>
                <p className={styles.profileTitle}>Profile Title</p>
                <p>{`@${updateUserInformation.userName}`}</p>
              </div>
              <div className={styles.bioContainer}>
                <p>Bio</p>
                <textarea value={updateUserInformation.bio} onChange={handleBioChange} maxLength={maxLength} placeholder="Enter your bio" />
              </div>
              <div className={styles.charCountContainer}>
                <p className={styles.charCount}>{updateUserInformation.bio?.length} / {maxLength}</p>
              </div>
            </div>
          </div>
          {/*       Link Card        */}
          <div className={styles.linkCardContainer}>
            <div className={styles.container}>
              {/* Tabs */}
              <div className={styles.tabButtons}>
                <button className={`${styles.tabButton} ${activeTab === "link" ? styles.active : styles.inactive}`} onClick={handleAddLink}>
                  <img src={shopIcon} alt="social media icon" />
                    Add Link
                </button>
                <button className={`${styles.tabButton} ${activeTab === "shop" ? styles.active : styles.inactive}`} onClick={handleShop}>
                  <img src={shopIcon} alt="shop icon" />
                    Add Shop
                </button>
              </div>
              {/* Add Button */}
              <button className={styles.addButton} onClick={handleCreateLink}>+ Add</button>
              {/* Links List */}
              {
                showLinks && (
                  <div className={styles.linkCardListContainer}>
                    {links.map((link) => (
                      <div key={link._id} className={styles.linkCard}>
                        <div className={styles.linkDetails}>
                          <div className={styles.editOptsBtnContainer}>
                              <p className={styles.linkTitle}>
                                <span>{link.title}</span>
                                <img src={editIcon} alt="edit icon" />
                              </p>
                              <p className={styles.linkUrl}>
                                <span>{link.url}</span>
                                <img src={editIcon} alt="edit icon" />
                              </p>
                          </div>
                          <div className={styles.toggleSwitchContainer}>
                            <input type="checkbox" className={styles.toggleSwitch} checked={link.enabled} onChange={() => toggleLink(link._id)} />
                          </div>
                        </div>
                        <div className={styles.clickDelContainer}>
                          <div className={styles.clicks}>
                            <img src={clicksIcon} alt="clicks icon" />
                            <span>{`${link.clicks.length} clicks`}</span>
                          </div>
                          <button className={styles.deleteIcon} onClick={() => deleteLink(link.id)}>
                            <img src={deleteIcon} alt="delete icon" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              }
            </div>
          </div>
          {/*         Banner        */}
          <div className={styles.bannerCardContainer}>
            <p>Banner</p>
            <div className={styles.bannerCard}>
              <div className={styles.bannerContainer} style={{ backgroundColor: updateUserInformation.bannerColor || bgColor }} >
                <img className={styles.profileImage} src={userImg} alt="Profile" />
                <div className={styles.userInfo} style={{ color: textColor }}>
                  <p className={styles.username} style={{ color: textColor }}>{`@${updateUserInformation.userName}`}</p>
                  <p style={{ color: textColor }}>
                    <img src={sparkLogo} alt="spark logo" />/opopo_08
                  </p>
                </div>
              </div>
              {/*       bg custom section    */}
              <div className={styles.customColorSection}>
                <p className={styles.customColorTitle}>Custom Background Color</p>
                <div className={styles.colorOptions}>
                  {presetColors.map((color, index) => (
                    <div key={index} 
                      className={`${styles.colorOption} 
                      ${updateUserInformation.bannerColor === color ? styles.selected : ""}`}
                      style={{ backgroundColor: color }}
                      onClick={() => handleBannerColorChange(color)}>
                    </div>
                  ))}
                </div>
                <div className={styles.colorPicker}>
                  <input type="color" value={updateUserInformation.bannerColor} className={styles.colorInput} onChange={(e) => handleBannerColorChange(e.target.value)} />
                  <span className={styles.colorCode}>{updateUserInformation.bannerColor}</span>
                </div>
              </div>
            </div>
          </div>
          {/*         save btn        */}
          <div className={styles.saveBtnContainer}> 
            <button className={styles.saveBtn} onClick={handleSaveBtn}>
              Save
            </button>
          </div>
        </div>
      </div>
      {/*             Modal Container          */}
      {modalStatus && (
        <div className={styles.modalViewContainer}>
          <LinkModal handleCloseModal={handleCloseModal} />
        </div>
      )}
    </div>
  )
};

export default Links;