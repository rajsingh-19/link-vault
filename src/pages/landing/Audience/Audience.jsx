import styles from './Audience.module.css';
import image from '../../../assets/audience.png';

const Audience = () => {
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <img src={image} alt="" className={styles.image} />
                <div className={styles.leftContent}>
                    Sell products and collect payments. It’s monetization made simple.
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.heading}>
                    Analyze your audience and keep your followers engaged
                </div>
                <div className={styles.rightContent}>
                    Track your engagement over time, monitor revenue and learn what’s converting your audience. Make informed updates on the fly to keep them coming back.
                </div>
            </div>
        </div>
    )
}

export default Audience;