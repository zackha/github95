import React from "react";
import { TextField, Button } from "react95";

import "./styles.scss";

export default function SearchInput({
  labelText,
  placeholder,
  initalValue,
  className,
  onSearch,
}) {
  const [state, setState] = React.useState(initalValue);

  React.useEffect(() => {
    if (initalValue !== state) setState(initalValue);
  }, [initalValue]);

  const handleChange = ({ target }) => {
    setState(target.value.trim());
  };

  const handleClick = () => {
    state.length > 0 && onSearch(state);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    state.length > 0 && onSearch(state);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex justify-center searchInput__form${
        className && className.length && " " + className
      }`}
    >
      <label
        htmlFor={"search_" + labelText.replace(/\s/g, "")}
        className="searchInput__label"
      >
        {labelText}
      </label>
      <TextField
        id={"search_" + labelText.replace(/\s/g, "")}
        placeholder={placeholder}
        value={state}
        onChange={handleChange}
        className="searchInput__input"
      />
      <Button onClick={handleClick} className="searchInput__button">
        Search
      </Button>
    </form>
  );
}
