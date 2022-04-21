import React from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import MapIcon from "@mui/icons-material/Map";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import styles from "./styles/FooterStyles.module.css";

export default function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.phoneContainer}>
        <PhoneIcon fontSize="small" />
        <p className={styles.phoneNumber}>505 503-4455</p>
      </div>
      <div className={styles.emailContainer}>
        <EmailIcon fontSize="small" />
        <p className={styles.emailAddress}>noreply@hockeyjerseyemporium.com</p>
      </div>
      <div className={styles.locationContainer}>
        <MapIcon fontSize="small" />
        <p className={styles.location}>Toronto, CA.</p>
      </div>
      <div className={styles.socialsContainer}>
        <p className={styles.socialsTitle}>Follow Us</p>
        <div className={styles.socialsIconsContainer}>
          <InstagramIcon sx={{ cursor: "pointer" }} fontSize="small" />
          <FacebookIcon sx={{ cursor: "pointer" }} fontSize="small" />
          <TwitterIcon sx={{ cursor: "pointer" }} fontSize="small" />
        </div>
      </div>
      <p className={styles.footnote}>2022. Designed by Reese Parker.</p>
    </footer>
  );
}
