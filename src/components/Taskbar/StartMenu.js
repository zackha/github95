import React from "react";
import { useRecoilState } from "recoil";
import { Button, List, ListItem, Divider } from "react95";

import { windowObj } from "../../store";

export default function StartMenu() {
  const [currentWindows, setWindows] = useRecoilState(windowObj);
  const [isOpen, setOpen] = React.useState(false);
  const refMenu = React.useRef(undefined);

  const toggleMenu = (toggle) => {
    setOpen(toggle);
    if (toggle) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  };

  const handleButtonClick = () => {
    toggleMenu(!isOpen);
  };

  const handleListClick = (name) => () => {
    setWindows({ ...currentWindows, [name]: [true, true] });
    toggleMenu(false);
  };

  const handleClickOutside = ({ target }) => {
    if (refMenu.current.contains(target)) return;
    toggleMenu(false);
  };

  const handleSoundToggle = () => {
    console.log("~/Sites/github95/src/components/Taskbar/StartMenu >>>");
  };

  return (
    <div className="startMenu" ref={refMenu}>
      {isOpen && (
        <List
          horizontalAlign="left"
          verticalAlign="top"
          open={isOpen}
          className="startMenu__menu"
        >
          <ListItem onClick={handleListClick("about")}>
            <p className="startMenu__menuItem">
              <span role="img" aria-label="about">
                👨‍💻
              </span>{" "}
              About
            </p>
          </ListItem>
          <ListItem onClick={handleListClick("user")}>
            <p className="startMenu__menuItem">
              <span role="img" aria-label="profile">
                👨‍💻
              </span>{" "}
              Profile
            </p>
          </ListItem>
          <ListItem onClick={handleListClick("code")}>
            <p className="startMenu__menuItem">
              <span role="img" aria-label="view code">
                📁
              </span>{" "}
              View Code
            </p>
          </ListItem>
          <Divider />
          <ListItem onClick={handleSoundToggle}>
            <p className="startMenu__menuItem -soundItem">
              Startup sound: <span className="badge -grey">On</span>
            </p>
          </ListItem>
        </List>
      )}
      <Button
        onClick={handleButtonClick}
        active={isOpen}
        className="mr1 startMenu__triggerButton"
      >
        <img
          src={require("../../assets/win-logo.png")}
          alt=""
          className="startMenu__logo"
        />
        Github 95
      </Button>
    </div>
  );
}
