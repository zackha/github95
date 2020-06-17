import React from "react";
import PropTypes from "prop-types";
import { Cutout, Anchor } from "react95";
import Pagination from "../Pagination";

import formatDate from "../../utilities/formatDate";

export default function Gists({ gists, total, onPageChange }) {
  const [pageNumber, setPageNumber] = React.useState(0);
  const [paginated, setPaginated] = React.useState([]);

  const handleClickNextPage = (page) => {
    setPageNumber(page);
    if (!paginated[page]) {
      onPageChange();
    }
  };

  const processGists = React.useCallback(() => {
    let reversed = [...gists].reverse();
    const grouped = reversed.reduce((newArray, item, i) => {
      const groupI = Math.floor(i / 20);
      if (!newArray[groupI]) newArray[groupI] = [];
      newArray[groupI].push(item);
      return newArray;
    }, []);
    return grouped;
  }, [gists]);

  React.useEffect(() => {
    if (gists && gists.length) {
      setPaginated(processGists());
    }
  }, [gists, processGists]);

  const processName = (name) => {
    return name.split(".").slice(0, -1).join(".");
  };

  return (
    <div className="gists">
      <h3>Gists</h3>
      {paginated && paginated.length > 0 ? (
        <>
          {paginated[pageNumber] &&
            paginated[pageNumber].map(
              ({
                cursor,
                node: { url, isFork, updatedAt, stargazers, files },
              }) => {
                const name = processName(files[0].name);
                return (
                  <div key={cursor}>
                    <h3>{files[0].name}</h3>
                    {isFork && (
                      <p className="badge -small userRepos__badge">Fork</p>
                    )}
                    <p className="badge -small userRepos__badge">
                      Updated at: {updatedAt}
                    </p>
                    <p className="badge -small userRepos__badge">
                      Number of stars: {stargazers.totalCount}
                    </p>

                    <div className="gist__block">
                      <Cutout className="gist__cutout">
                        <div className="gist__code">
                          <p>
                            C: \ Github95 {">"} cd {name} \
                          </p>
                          <p>
                            C: \ Github95 {">"} print {name}.
                            {files[0].extension}
                          </p>
                          <pre>{files[0].text}</pre>
                        </div>
                      </Cutout>
                    </div>
                    <Anchor href={url}>Open on gist.github.com</Anchor>
                  </div>
                );
              }
            )}

          {total > 10 && (
            <Pagination
              onPageChange={handleClickNextPage}
              totalCount={total}
              perPage={10}
            />
          )}
        </>
      ) : (
        <p>TODO</p>
      )}
    </div>
  );
}
