import React from "react";

import { WINDOW_OBJ } from "../data/constants";
import { windowList } from "../hooks/sharedStates";

import capitalize from "../utilities/capitalize";

export default function Desktop() {
  const [, set] = windowList();
  const [focused, setFocus] = React.useState("");

  const handleClick = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const name = e.currentTarget.id.replace("desktopButton", "");

    setFocus(name);
  };

  const handleDblClick = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const name = e.currentTarget.id.replace("desktopButton", "");
    window.setTimeout(() => {
      set({ [name]: [true, true] });
    }, 300);
  };

  return (
    <section
      className="flex flex-column max-width-5 ml1"
      style={{ height: "calc(100% - 2rem)", paddingTop: "2rem" }}
    >
      {Object.keys(WINDOW_OBJ).map((name) => (
        <div
          key={name}
          style={{
            width: "100px",
            height: "100px",
            margin: "10px 0 20px",
            textAlign: "center",
            border: "1px dotted",
            borderColor: focused === name ? "#000" : "transparent",
          }}
        >
          <button
            style={{
              width: "100%",
              height: "100%",
              background: "transparent",
              outline: "none",
              border: "none",
              color: "#fff",
            }}
            id={"desktopButton" + name}
            onClick={handleClick}
            onDoubleClick={handleDblClick}
          >
            <img src={require(`../images/${name}.png`)} alt="icon" width="50" />
            <p style={{ paddingTop: "10px" }}>{capitalize(name)}</p>
          </button>
        </div>
      ))}
    </section>
  );
}
