import styles from './Header.module.css';
import name from '../../../assets/branding.svg';
import marketplace from '../../../assets/marketplace.svg';


const Header = ({ handleSignUp }) => {
    return (
        <div className={styles.header}>
            <div className={styles.headerLeft}>
                <img src={name} alt="" style={{ height: '30px' }} />
                <div>|</div>
                <img src={marketplace} alt="" style={{ height: '14px', marginTop: '4px' }} />
            </div>
            <div className={styles.headerBtn} onClick={handleSignUp}>Sign up free</div>
        </div>
    )
}

export default Header;