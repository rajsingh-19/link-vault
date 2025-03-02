import React from "react";
import styles from "./profile.module.css";
import PreviewCard from "../../components/preview/PreviewCard";

const Profile = () => {
  return (
    <div className={styles.profilePageContainer}>
        <div className={styles.profileViewContainer}>
            <PreviewCard />
        </div>
    </div>
  )
}

export default Profile;