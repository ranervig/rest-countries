import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.foot}>
      <div>
        Created using{" "}
        <a href={"https://restcountries.com/"}>REST Countries API v3.1</a>
      </div>
    </footer>
  );
};

export default Footer;
