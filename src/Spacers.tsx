import styles from "./styles/spacers.module.css";

export const Header = () => {
  return (
    <header>
      <h1 className={styles.header}>Weather and Forecasts</h1>
    </header>
  );
};

export const Footer = () => {
  return <div style={{ margin: "32px 0" }}>Test</div>;
};
