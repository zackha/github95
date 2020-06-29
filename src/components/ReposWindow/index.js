import React from "react";
import PropTypes from "prop-types";
import { TextField, Button } from "react95";
import { useRecoilState } from "recoil";

import Topic from "./Topic";
import Filter from "./Filter";
import SearchResults from "./SearchResults";

import {
  reposListObj,
  searchInputOfType,
  searchResultsOfType,
} from "../../store";
import { useReposApi } from "../../githubApi";
import { REPOS } from "../../constants";

import "./styles.scss";

export default function ReposWindow() {
  const [repoList, setList] = useRecoilState(reposListObj);
  const [input, setInput] = useRecoilState(searchInputOfType(REPOS));
  const [results, setResults] = useRecoilState(searchResultsOfType(REPOS));
  const refSort = React.useRef("");

  const { getRepoSearchResults } = useReposApi();

  const handleChange = ({ target }) => {
    setInput(target.value.trim());
  };

  const handleClick = () => {
    // input.length && getRepoSearchResults(input);
    getRepoSearchResults("react");
    refSort.current = "";
  };

  const handleSort = (sort) => {
    getRepoSearchResults("react", sort);
    refSort.current = sort;
  };

  const handlePageChange = () => {
    const { endCursor } = results.pageInfo;
    getRepoSearchResults("react", refSort.current, endCursor);
  };

  return (
    <>
      <div className="repoWindow__content">
        <TextField
          value={input}
          onChange={handleChange}
          className="searchForm__input"
        />
        <Button onClick={handleClick} className="searchForm__button">
          Search
        </Button>
        {results.nodes && results.nodes.length > 0 && (
          <div
            className="scrollable -yOnly"
            style={{ width: "100%", height: "80%" }}
          >
            <Topic />
            <div>
              <p>{results.repositoryCount} repository results</p>
              <Filter onChange={handleSort} />
            </div>
            <SearchResults onPageChange={handlePageChange} />
          </div>
        )}
      </div>
    </>
  );
}
