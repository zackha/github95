import React from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeadCell,
  TableDataCell,
  Anchor,
  Hourglass,
} from "react95";

import formatDate from "../../utilities/formatDate";

export default function Stars({ stars }) {
  return (
    <div className="userContent__bodyInner scrollable -yOnly">
      <div className="userRepos">
        <h3>Stars</h3>
        {stars && stars.length > 0 ? (
          <Table className="userRepos__table">
            <TableHead>
              <TableRow head>
                <TableHeadCell>Details</TableHeadCell>
                <TableHeadCell className="userRepos__headCell -language">
                  Main language
                </TableHeadCell>
                <TableHeadCell className="userRepos__headCell -link">
                  Link
                </TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stars.map(
                ({
                  name,
                  description,
                  url,
                  updatedAt,
                  primaryLanguage,
                  stargazers,
                  forks,
                }) => (
                  <TableRow key={name}>
                    <TableDataCell>
                      <p className="userRepos__repoName">{name}</p>
                      <p className="userRepos__repoDesc">{description}</p>
                      <div className="userRepos__badges">
                        <div className="badge userRepos__badge">
                          Stars: {stargazers.totalCount || 0}
                        </div>
                        <div className="badge userRepos__badge">
                          Forks: {forks.totalCount || 0}
                        </div>
                        <div className="badge userRepos__badge">
                          Updated: {formatDate(updatedAt)}
                        </div>
                      </div>
                    </TableDataCell>
                    <TableDataCell>
                      {primaryLanguage !== null ? (
                        <p
                          className={`userRepos__badge -language -${primaryLanguage.name}`}
                        >
                          <span
                            className="badge"
                            style={{ backgroundColor: primaryLanguage.color }}
                          ></span>
                          {primaryLanguage.name}
                        </p>
                      ) : (
                        <p>-</p>
                      )}
                    </TableDataCell>
                    <TableDataCell>
                      <Anchor href={url}>Go to repo</Anchor>
                    </TableDataCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        ) : (
          <p>TODO</p>
        )}
      </div>
    </div>
  );
}
