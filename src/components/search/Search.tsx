import { ChangeEvent, KeyboardEvent, useRef } from "react";
import { ReactComponent as Pin } from "../../assets/pin.svg";
import { ReactComponent as Magnify } from "../../assets/search.svg";
import { useWeatherContext } from "../../context/provider";
import global from "../../index.module.css";
import styles from "../app.module.css";

interface ISearchProps {
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  onEnter: (e: KeyboardEvent<HTMLInputElement>) => void;
  getLocation: () => void;
}

const Search = (props: ISearchProps) => {
  const { isDay, location, error, loading } = useWeatherContext();
  const { onSearch, onEnter, getLocation } = props;
  const input = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    input.current?.focus();
  };

  return (
    <>
      {error && (
        <span
          className={`${styles.error} ${error && global.error} ${
            isDay ? global.day : global.night
          }`}
        >
          {error}
        </span>
      )}
      <div
        className={`${styles.search} ${loading ? global.loading : ""} ${
          error && global.error
        } ${isDay ? global.day : global.night}`}
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
        <Pin onClick={getLocation} />
      </div>
    </>
  );
};

export default Search;
