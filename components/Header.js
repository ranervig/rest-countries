import styles from "../styles/Header.module.css";

const Header = ({ mode, changeMode }) => {
  return (
    <header className={styles.head}>
      <h1>Where in the world?</h1>
      <div onClick={changeMode} className={styles.mode}>
        &#x25d1;{mode ? "Light Mode" : "Dark Mode"}
      </div>
    </header>
  );
};

export default Header;
