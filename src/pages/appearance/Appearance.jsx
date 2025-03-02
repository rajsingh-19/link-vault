import React from 'react';
import styles from "./appearance.module.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from '../../components/navbar/Navbar';
import Preview from "../../components/preview/PreviewCard";
import stackIcon from "../../assets/stack.svg";
import gridIcon from "../../assets/grid.svg";
import carouselIcon from "../../assets/carousel.svg";

const Appearance = () => {
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
          <Preview />
        </div>
        {/*       right section - layout, buttons, fonts, themes */}
        <div className={styles.appearanceSection}>
          {/*   Layout section   */}
          <div className={styles.layoutContainer}>
            <p>Layout</p>
            <div className={styles.alignmentBtnContainer}>
              <div>
                <button>
                  <img src={stackIcon} alt="stack icon" />
                </button>
                <span>Stack</span>
              </div>
              <div>
                <button>
                  <img src={gridIcon} alt="grid icon" />
                </button>
                <span>Grid</span>
              </div>
              <div>
                <button>
                  <img src={carouselIcon} alt="carousel icon" />
                </button>
                <span>Carousel</span>
              </div>
            </div>
          </div>
          {/*   Button Section   */}
          <div className={styles.buttonContainer}>
            <p>Buttons</p>
            <div className={styles.btnCard}>
              <p>Fill</p>
              <div>
                <button></button>
                <button></button>
                <button></button>
              </div>
              <p>Outline</p>
              <div>
                <button></button>
                <button></button>
                <button></button>
              </div>
              <p>Soft shadow</p>
              <div>
                <button></button>
                <button></button>
                <button></button>
              </div>
              <p>Special</p>
              <div>
                <div>
                  <button>1</button>
                  <button>2</button>
                  <button>3</button>
                </div>
                <div>
                  <button>4</button>
                  <button>5</button>
                  <button>6</button>
                </div>
              </div>
              {/*       btn and font color   */}
              <p className={styles.btnColorHeading}>Button color</p>
              <div className={styles.btnColorContainer}>
                <input type="text" />
                <div>
                  <p>Button color</p>
                  <input type="text" value={"#ffffff"} />
                </div>
              </div>
              <p className={styles.btnFontColorHeading}>Button font color</p>
              <div className={styles.btnFontColorContainer}>
                <input type="text" />
                <div>
                  <p>Button font color</p>
                  <input type="text" value={"#888888"} />
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
                <input type="text" value={"Aa"} />
                <input type="text" value={"DM Sans"} />
              </div>
              <p>Color</p>
              <div className={styles.fontColorBoxContainer}>
                <input type="text" />
                <div>
                  <p>Color</p>
                  <input type="text" value={"#ffffff"} />
                </div>
              </div>
            </div>
          </div>
          {/*   Themes Section   */}
          <div className={styles.themesContainer}>
            <p>Themes</p>
            <div className={styles.themesCard}>
              <div>
                <div>1</div>
                <p>Air Snow</p>
              </div>
              <div>
                <div>2</div>
                <p>Air Grey</p>
              </div>
              <div>
                <div>3</div>
                <p>Air Smoke</p>
              </div>
              <div>
                <div>4</div>
                <p>Air Black</p>
              </div>
              <div>
                <div>5</div>
                <p>Mineral Blue</p>
              </div>
              <div>
                <div>6</div>
                <p>Mineral Green</p>
              </div>
              <div>
                <div>7</div>
                <p>Mineral Orange</p>
              </div>
            </div>
          </div>
          {/*         save btn        */}
          <div className={styles.saveBtnContainer}> 
            <button className={styles.saveBtn}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Appearance;
