import styles from './HeroSection.module.css';
import image from '../../../assets/landingHero.png';

const HeroSection = ({ handleSignUp }) => {
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.heading}>
                    The easiest place to update and share your Connection
                </div>
                <div className={styles.content}>
                    Help your followers discover everything you’re sharing all over the internet, in one simple place. They’ll thank you for it!
                </div>
                <div className={styles.btn} onClick={handleSignUp}>Get your free Spark</div>
            </div>
            <img src={image} alt="" className={styles.image} />
        </div>
    )
}

export default HeroSection;