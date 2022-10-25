import React, { useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import classNames from "classnames";

const SearchBar = ({ variant, onCardSubmit }) => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const onNytSubmit = (e) => {
    e.preventDefault();
    router.push(`/news/${query}`);
  };
  return (
    <form
      className={classNames("search", { [`search--${variant}`]: !!variant })}
      onSubmit={(e) => (variant === "card" ? onCardSubmit(e, query) : onNytSubmit(e))}
    >
      <input
        type="text"
        placeholder={
          variant === "card" ? "Filter content" : "Search news articles"
        }
        onChange={(e) => setQuery(e.target.value)}
        className={classNames("search-bar", {
          [`search-bar--${variant}`]: !!variant,
        })}
      />
      <input
        type="submit"
        value={
          variant === "card" ? "Apply" : "Go"
        }
        className={classNames("search-button", {
          [`search-button--${variant}`]: !!variant,
        })}
      />
    </form>
  );
};

SearchBar.defaultProps = {
  variant: "",
  onCardSubmit: null,
};

SearchBar.propTypes = {
  variant: PropTypes.string,
  onCardSubmit: PropTypes.func,
};

export default SearchBar;
