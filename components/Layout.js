import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const changeMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    document.body.dataset.theme = darkMode ? "dark" : "light";
  }, [darkMode]);

  return (
    <div>
      <Header mode={darkMode} changeMode={changeMode} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
