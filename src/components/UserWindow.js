import React from "react";
import { useRecoilValue } from "recoil";
import { Hourglass } from "react95";

import { userData, searchInput } from "../store";

import SearchInput from "./SearchInput";
import UserContent from "./UserContent";

import useGithubApi from "../githubApi";

export default function UserWindow() {
  const user = useRecoilValue(userData);
  const searchInputValue = useRecoilValue(searchInput);

  const [isLoading, hasErrored, { getUserProfile }] = useGithubApi();

  React.useEffect(() => {
    if (searchInputValue.length) {
      getUserProfile();
    }
  }, [searchInputValue]);

  React.useEffect(() => {
    console.log("~/Sites/github95/src/components/UserWindow >>>", user);
  }, [user]);

  const handleTabChange = (activeTab) => {
    // if (activeTab === 2 && !user.repos.length) {
    //   getRepos();
    // }
  };

  const windowContent = () => {
    if (isLoading && !user.profile.name)
      return (
        <div
          className="flex justify-center items-center"
          style={{ minHeight: 100 }}
        >
          <Hourglass size={32} />
          <p>&nbsp;Finding user...</p>
        </div>
      );
    if (!isLoading && user.profile.error === "Not found")
      return <p>not found</p>;
    if (user.profile.name)
      return <UserContent user={user.profile} onTabChange={handleTabChange} />;
    return (
      <div
        className="flex justify-center items-center"
        style={{ minHeight: 100 }}
      >
        <p>Search for a user</p>
      </div>
    );
  };

  return (
    <>
      <div className="flex profileSearch">
        <p style={{ paddingLeft: 5, width: 60, lineHeight: "14px" }}>
          Search username
        </p>
        <SearchInput />
      </div>
      {windowContent()}
    </>
  );
}
