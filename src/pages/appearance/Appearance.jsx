import React, { useState, useEffect } from 'react';
import styles from "./appearance.module.css";
import { saveAppearance, updateAppearance, getAppearance } from '../../services';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from '../../components/navbar/Navbar';
import Preview from "../../components/preview/PreviewCard";
import stackIcon from "../../assets/stack.svg";
import gridIcon from "../../assets/grid.svg";
import carouselIcon from "../../assets/carousel.svg";
import previewIcon from "../../assets/previewIcon.svg";
import { toast } from 'react-toastify';

const Appearance = () => {
  const [previewModalStatus, setPreviewModalStatus] = useState(false);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
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
  
  //    array for layout options
  const layoutArray = [
    {name: "Stack", srcImg: stackIcon},
    {name: "Grid", srcImg: gridIcon},
    {name: "Carousel", srcImg: carouselIcon}
  ];
  
  //    array for font options
  const fontOptionsArray = [
    { name: 'Poppins', fontFamily: 'Poppins' },
    { name: 'Open Sans', fontFamily: 'Open Sans' },
    { name: 'Inter', fontFamily: 'Inter' },
    { name: 'Times New Roman', fontFamily: 'Times New Roman' },
    { name: 'Arial', fontFamily: 'Arial' },
  ];
  
  //      array for themes 
  const themesArray = [
    {name: "Air Snow", themesBgColor: "#FFFFFF"},
    {name: "Air Grey", themesBgColor: "#EBEEF1"},
    {name: "Air Smoke", themesBgColor: "#2A3235"},
    {name: "Air Black", themesBgColor: "#000000"},
    {name: "Air Blue", themesBgColor: "#E0F6FF"},
    {name: "Air Green", themesBgColor: "#E0FAEE"},
    {name: "Air Orange", themesBgColor: "#FFEEE2"},
    {name: "Air Yellow", themesBgColor: "#FFF8E0"}
  ];

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
  }, [userId, token]);
    
  //      fn for updating the themes
  const handleCardBgColor = (themesBgColor) => {
    setCustomization((prev) => ({
      ...prev,
      themes: themesBgColor
    }));
  };
  
  const handleLayoutChange = (name) => {
    setCustomization((prev) => ({
      ...prev,
      layout: name
    }));
  };

  //      fn for changing the font 
  const handleFontChange = (e) => {
    setCustomization((prev) => ({
      ...prev,
      fonts: {
        ...prev.fonts,            // Preserve existing font properties
        font: e.target.value      // Update the font
      }
    }));
  };
  //      fn for changing the font color
  const handleFontColor = (e) => {
    setCustomization((prev) => ({
      ...prev,
      fonts: {
        ...prev.fonts,              // Preserve existing font properties
        color: e.target.value       // update the font color
      }
    }));
  };

  //      fn for changing the fill of btns
  const handleFill = (id) => {
    setCustomization((prev) => ({
      ...prev,
      buttons: {
        ...prev.buttons,
        fill: id
      }
    }));
  };

  //      fn for changing the outline of btns
  const handleOutline = (id) => {
    setCustomization((prev) => ({
      ...prev,
      buttons: {
        ...prev.buttons,
        outline: id
      }
    }));
  };

  //      fn for changing the hardshadow of btns
  const handleHardShadow = (id) => {
    setCustomization((prev) => ({
      ...prev,
      buttons: {
        ...prev.buttons,
        hardShadow: id
      }
    }));
  };

    //      fn for changing the softshadow of btns
  const handleSoftShadow = (id) => {
    setCustomization((prev) => ({
      ...prev,
      buttons: {
        ...prev.buttons,
        softShadow: id
      }
    }));
  };

  //      fn for changing the button color of link btns  
  const handleButtonColor = (e) => {
    setCustomization((prev) => ({
      ...prev,
      buttons: {
        ...prev.buttons,
        btnColor: e.target.value
      }
    }));
  };

  //      fn for changing the button font color of link btns
  const handleButtonFontColor = (e) => {
    setCustomization((prev) => ({
      ...prev,
      buttons: {
        ...prev.buttons,
        btnFontColor: e.target.value
      }
    }));
  };

  const handleSaveAppearance = async () => {
    try {
      // Fetch existing appearance first
      const existingAppearanceRes = await getAppearance(userId, token);
  
      if (existingAppearanceRes.ok) {
        // If appearance exists, update it
        const res = await updateAppearance(userId, token, customization);
        if (res.status === 200) {
          toast.success("Appearance updated successfully!");
        } else {
          throw new Error("Failed to update appearance");
        }
      } else {
        // If no appearance exists, create a new one
        const res = await saveAppearance(userId, token, customization);
        if (res.status === 201) {
          toast.success("Appearance saved successfully!");
        } else {
          throw new Error("Failed to save appearance");
        }
      }
    } catch (error) {
      console.error("Error saving appearance:", error);
      toast.error("Failed to save/update appearance");
    }
  };

  const handleShowPreview = () => {
    setPreviewModalStatus(true);
  };

  const handleClosePreview = () => {
    setPreviewModalStatus(false);
  };

  return (
    <div className={styles.appearancePageContainer}>
      <div className={styles.sidebarContainer}>
        <Sidebar />
      </div>
      <div className={styles.navContainer}>
        <Navbar />
      </div>
      <div className={styles.contentContainer}>
        {/*       left section - preview     */}
        <div className={styles.previewSection}>
          <Preview appearanceCustomization={customization} />
        </div>
        {/*       right section - layout, buttons, fonts, themes */}
        <div className={styles.appearanceSection}>
          {/*   Layout section   */}
          <div className={styles.layoutContainer}>
            <p>Layout</p>
            <div className={styles.alignmentBtnContainer}>
              {
                layoutArray?.map(({name, srcImg}, index) => (
                  <div key={index}>
                    <button onClick={() => handleLayoutChange(name)} className={customization?.layout !== name ? styles.inactiveBorder : ""}>
                      <img src={srcImg} alt={`${name} icon`} />
                    </button>
                    <span>{name}</span>
                  </div>
                ))
              }
            </div>
          </div>
          {/*   Button Section   */}
          <div className={styles.buttonContainer}>
            <p>Buttons</p>
            <div className={styles.btnCard}>
              <p>Fill</p>
              <div className={styles.fillBtnContainer}>
                <button className={styles.f1} onClick={() => handleFill("f1")}></button>
                <button className={styles.f2} onClick={() => handleFill("f2")}></button>
                <button className={styles.f3} onClick={() => handleFill("f3")}></button>
              </div>
              <p>Outline</p>
              <div className={styles.outlineBtnContainer}>
                <button className={styles.o1} onClick={() => handleOutline("o1")}></button>
                <button className={styles.o2} onClick={() => handleOutline("o2")}></button>
                <button className={styles.o3} onClick={() => handleOutline("o3")}></button>
              </div>
              <p>Hard shadow</p>
              <div className={styles.hardShadowBtnContainer}>
                <button className={styles.o3} onClick={() => handleHardShadow("h1")}></button>
                <button className={styles.o3} onClick={() => handleHardShadow("h2")}></button>
                <button className={styles.o3} onClick={() => handleHardShadow("h3")}></button>
              </div>
              <p>Soft shadow</p>
              <div className={styles.softShadowBtnContainer}>
                <button className={styles.o3} onClick={() => handleSoftShadow("s1")}></button>
                <button className={styles.o3} onClick={() => handleSoftShadow("s2")}></button>
                <button className={styles.o3} onClick={() => handleSoftShadow("s3")}></button>
              </div>
              <p>Special</p>
              <div className={styles.specialBtnContainer}>
                <div>
                  <button className={styles.zigzagBtn}></button>
                  <button className={styles.wavyBtn}></button>
                  <button className={styles.doubleBorderBtn}>
                    <span className={styles.outerDoubleBorderBtn}></span>
                    <span className={styles.innerDoubleBorderBtn}></span>
                  </button>
                </div>
                <div>
                  <button></button>
                  <button className={styles.cornerSqBtn}>
                    <span className={styles.cornerTopLeft}></span>
                    <span className={styles.cornerTopRight}></span>
                    <span className={styles.cornerBottomLeft}></span>
                    <span className={styles.cornerBottomRight}></span>
                  </button>
                  <button></button>
                </div>
              </div>
              {/*       btn and font color   */}
              <p className={styles.btnColorHeading}>Button color</p>
              <div className={styles.btnColorContainer}>
                <input type="text" style={{ backgroundColor: customization?.buttons?.btnColor }} readOnly  />
                <div>
                  <p>Button color</p>
                  <input type="text" value={customization?.buttons?.btnColor} onChange={(e) => handleButtonColor(e)} />
                </div>
              </div>
              <p className={styles.btnFontColorHeading}>Button font color</p>
              <div className={styles.btnFontColorContainer}>
                <input type="text" style={{ backgroundColor: customization?.buttons?.btnFontColor }} readOnly/>
                <div>
                  <p>Button font color</p>
                  <input type="text" value={customization?.buttons?.btnFontColor || "#888888"} onChange={(e) => handleButtonFontColor(e)} />
                </div>
              </div>
            </div>
          </div>
          {/*    Font Section     */}
          <div className={styles.fontContainer}>
            <p>Fonts</p>
            <div className={styles.fontCard}>
              <p>Font</p>
              <div className={styles.fontBoxContainer}>
                <input type="text" value={"Aa"} style={{fontFamily: customization?.fonts?.font }} readOnly />
                <select value={customization?.fonts?.font} onChange={(e) => handleFontChange(e)}>
                  {fontOptionsArray?.map(({name, fontFamily}, index) => (
                    <option key={index} value={fontFamily} style={{ fontFamily: fontFamily }}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
              <p>Color</p>
              <div className={styles.fontColorBoxContainer}>
                <input type="text" disabled style={{ backgroundColor: customization?.fonts?.color }} readOnly />
                <div>
                  <p>Color</p>
                  <input type="text" value={customization?.fonts?.color || "#FFFFFF"} onChange={(e) => handleFontColor(e)} />
                </div>
              </div>
            </div>
          </div>
          {/*   Themes Section   */}
          <div className={styles.themesContainer}>
            <p>Themes</p>
            <div className={styles.themesCard}>
              {
                themesArray?.map(({name, themesBgColor}, index) => (
                  <div key={index} className={styles.themeBox}>
                    <div style={{ backgroundColor: themesBgColor}} onClick={() => handleCardBgColor(themesBgColor)}></div>
                    <p>{name}</p>
                  </div>
                ))
              }
            </div>
          </div>
          {/*         save btn        */}
          <div className={styles.saveBtnContainer}> 
            <button className={styles.saveBtn} onClick={handleSaveAppearance}>
              Save
            </button>
          </div>
        </div>
      </div>
      {/*           preview btn for small screens      */}
      {
      <button className={styles.previewBtn} onClick={handleShowPreview}>
        <img src={previewIcon} alt="preview btn icon" />
          Preview
      </button>
      }
      {/*           Preview Modal Container */}
      {
        previewModalStatus && (
          <div className={styles.previewModalContainer}>
            <Preview closePreviewModal={handleClosePreview} style={{display: previewModalStatus ? "block" : ""}} appearanceCustomization={customization} />
          </div>
        )
      }
    </div>
  )
};

export default Appearance;