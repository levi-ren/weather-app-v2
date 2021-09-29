import { ChangeEvent, KeyboardEvent, useRef } from "react";
import { ReactComponent as Pin } from "../../assets/pin.svg";
import { ReactComponent as Magnify } from "../../assets/search.svg";
import global from "../../index.module.css";
import styles from "../app.module.css";

interface ISearchProps {
  error?: string;
  loading: boolean;
  location: string;
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  onEnter: (e: KeyboardEvent<HTMLInputElement>) => void;
  getLocation: () => void;
}

const Search = (props: ISearchProps) => {
  const { error, loading, location, onSearch, onEnter, getLocation } = props;
  const input = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    input.current?.focus();
  };

  return (
    <div
      className={`${styles.search} ${loading ? global.loading : ""} ${
        error && styles.error
      }`}
    >
      <div className={global.spinner}></div>
      <Magnify onClick={focusInput} />
      <input
        type="text"
        name="search"
        ref={input}
        placeholder={"Enter a location or coordinates"}
        onChange={onSearch}
        value={location}
        onKeyDown={onEnter}
        disabled={loading}
      />
      {error && <span>{error}</span>}
      <Pin onClick={getLocation} />
    </div>
  );
};

export default Search;
