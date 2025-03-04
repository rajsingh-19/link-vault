import styles from './Limitless.module.css';
import square1 from '../../../assets/square01.png';
import square2 from '../../../assets/square02.png';
import wide from '../../../assets/wide01.png';

const Limitless = () => {
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.heading}>
                    Share limitless content in limitless ways
                </div>
                <div className={styles.leftContent}>
                    Connect your content in all its forms and help followers find more of what they’re looking for. Your TikToks, Tweets, YouTube videos, music, articles, recipes, podcasts and more… It all comes together in one powerful place
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.rightTop}>
                    <img src={square1} alt="" className={styles.image} />
                    <img src={square2} alt="" className={styles.image} />
                    <img src={wide} alt="" className={styles.image1} />
                </div>
                <div className={styles.rightContent}>
                    Share your content in limitless ways on your Spark
                </div>
            </div>
        </div>
    )
}

export default Limitless;