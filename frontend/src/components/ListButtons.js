import React, {useState} from "react";

export default function ListButtons(props) {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
    props.handleClick(props.list.id);
  };

  return (
    <button
      style={active ? styles.activeButton : styles.button}
      onClick={handleClick}
    >
      {props.list.name}
    </button>
  );
}

const styles = {
  button: {
    backgroundColor: "white",
    border: "1px solid #e0e0e0",
    borderRadius: "5px",
    padding: "5px 10px",
    margin: "5px",
    cursor: "pointer",
  },
  activeButton: {
    backgroundColor: "#f0c14b",
    border: "1px solid #e0e0e0",
    borderRadius: "5px",
    padding: "5px 10px",
    margin: "5px",
    cursor: "pointer",
  },
};
