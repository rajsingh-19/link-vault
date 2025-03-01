import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./category.module.css";
import { nameCategory } from "../../services/index";
import banner from "../../assets/banner.png";
import branding from "../../assets/branding.svg";
import business from "../../assets/business.png";
import creative from "../../assets/creative.png";
import education from "../../assets/education.png";
import entertainment from "../../assets/entertainment.png";
import fashion from "../../assets/fashion.png";
import food from "../../assets/food.png";
import govt from "../../assets/govt.png";
import health from "../../assets/health.png";
import nonprofit from "../../assets/nonprofit.png";
import others from "../../assets/others.png";
import tech from "../../assets/tech.png";
import travel from "../../assets/travel.png";

const Category = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    "userName": "",
    "category": ""
  });

  const buttonArray = [
    { img: business, btnName: "Business" },
    { img: creative, btnName: "Creative" },
    { img: education, btnName: "Education" },
    { img: entertainment, btnName: "Entertainment" },
    { img: fashion, btnName: "Fashion & Beauty" },
    { img: food, btnName: "Food & Beverage" },
    { img: govt, btnName: "Government & Politics" },
    { img: health, btnName: "Health & Wellness" },
    { img: nonprofit, btnName: "Non-Profit" },
    { img: others, btnName: "Other" },
    { img: tech, btnName: "Tech" },
    { img: travel, btnName: "Travel & Tourism" }
  ];
  
    // Handle input change for username
    const handleInputChange = (e) => {
      setUserInfo((prev) => ({
        ...prev,
        userName: e.target.value
      }));
    };
  
    // Handle category selection
    const handleCategorySelect = (btnName) => {
      setUserInfo((prev) => ({
        ...prev,
        category: btnName
      }));
    };
  
  const handleNameCategory = async () => {
    if (!userInfo.userName || !userInfo.category) {
      alert("Please enter a username and select a category.");
      return;
    };

    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const userName = userInfo.userName;
    const category = userInfo.category;

    try {
      const response = await nameCategory(userId, token, userName, category);
      
      if(response.status === 201) {
        const resData = await response.json();

        localStorage.setItem("userName", resData.result)
        navigate("/links");
      } else {
        // Handles any errors by logging the response and showing an alert
        const errorData = await response.json();
        const errorMessage = errorData.message || "An error occurred";
        toast.error(errorMessage); // Show the error message from the backend
      }
    } catch (error) {
      console.log(error);
      toast.error("An unexpected error occurred:", error);
    }
  };

  return (
    <div className={styles.categoryPageContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.brandingLogoContainer}>
          <img src={branding} alt="branding logo" />
        </div>
        <div className={styles.categoryContainer}>
          <p className={styles.heading}>Tell us about yourself</p>
          <p className={styles.subHeading}>For a personalized Spark experience</p>
          <div className={styles.nameCategorySection}>
            <div className={styles.inputContainer}>
              <input type="text" placeholder="Tell us your username" onChange={handleInputChange} />
            </div>
            <div className={styles.categorySection}>
              <p>Select one category that best describes your Linktree:</p>
              <div className={styles.categoryBtnsContainer}>
                {
                 buttonArray.map(({img, btnName}, index) => (
                  <button key={index} className={`${styles.categoryBtn} ${
                    userInfo.category === btnName ? styles.active : ""
                  }`} onClick={() => handleCategorySelect(btnName)}>
                    <img src={img} alt={`${btnName} logo`} />  
                    {btnName}
                  </button>
                 )) 
                }
              </div>
            </div>
            <div className={styles.continueBtnContainer}>
              <button className={styles.continueBtn} onClick={handleNameCategory}>Continue</button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.imgContainer}>
        <img src={banner} alt="banner img" />
      </div>
    </div>
  );
};

export default Category;
