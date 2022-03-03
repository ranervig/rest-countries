const Header = ({ mode, changeMode }) => {
  return (
    <header>
      <h1>Header</h1>
      <button onClick={changeMode}>
        Switch to {mode ? "Light Mode" : "Dark Mode"}
      </button>
    </header>
  );
};

export default Header;
