import styles from './Footer.module.css';
import x from '../../../assets/x.svg';
import insta from '../../../assets/insta.svg';
import yt from '../../../assets/yt.svg';
import tiktok from '../../../assets/tiktok.svg';
import spark from '../../../assets/spark.svg';

const Footer = ({ handleSignUp, handleLogin }) => {

    const column1 = ["Careers", "Mog", "Pross", "Social Good", "Contact"];
    const column2 = ["Getting Started", "Features and How-Tos", "FAQS", "Report a Violation"];
    const column3 = ["Terms and Conditions", "Privacy Policy", "Cookie Notice", "Trust Center"];


    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.topFirst}>
                    <div className={styles.loginBtn} onClick={handleLogin}>Login</div>
                    <div className={styles.Btn} onClick={handleSignUp}>Sign up free</div>
                </div>
                <div className={styles.topSecond}>
                    {column1.map((value, index) => (
                        <div key={index}>{value}</div>
                    ))}
                </div>
                <div className={styles.topSecond}>
                    {column2.map((value, index) => (
                        <div key={index}>{value}</div>
                    ))}
                </div>
                <div className={styles.topSecond}>
                    {column3.map((value, index) => (
                        <div key={index}>{value}</div>
                    ))}
                </div>
            </div>
            <div className={styles.bottom}>
                <div className={styles.bLine}>
                    We acknowledge the Traditional Custodians of the land on which our office stands, The Wurundjeri people of the Kulin Nation, and pay our respects to Elders past, present and emerging.
                </div>
                <div className={styles.icons}>
                    <img src={x} alt="" />
                    <img src={insta} alt="" />
                    <img src={yt} alt="" />
                    <img src={tiktok} alt="" />
                    <img src={spark} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Footer;