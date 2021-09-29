import { ReactComponent as GitHub } from "../assets/github.svg";
import { ReactComponent as LinkedIn } from "../assets/linkedin.svg";
import { ReactComponent as Twitter } from "../assets/twitter.svg";
import styles from "./spacers.module.css";

export const Header = () => {
  return (
    <header>
      <h1 className={styles.header}>Weather and Forecasts</h1>
    </header>
  );
};

const Link = ({ link, Icon }: { link: string; Icon: any }) => {
  return (
    <a href={`https://${link}`} target="_blank" rel="noreferrer">
      {<Icon className={styles.icons} />}
    </a>
  );
};

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Link link="github.com/levi-ren/weather-app-v2" Icon={GitHub} />
      <Link link="linkedin.com/in/levi-deang" Icon={LinkedIn} />
      <Link link="twitter.com/levi_deang" Icon={Twitter} />
    </footer>
  );
};
