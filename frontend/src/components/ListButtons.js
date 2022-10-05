import React, {useState} from "react";

export default function ListButtons(props) {
  const [checked, setChecked] = useState(false);
  const handleChange = (listItem) => {
    setChecked(!checked);
    props.handleClick(props.list.id);
  };

  const { list } = props;
  const type = props.type ? props.type : "checkbox";
  const name = props.name ? props.name : "checkbox";
  return (
        <div style={styles.listItem}>
          <label htmlFor="checkbox">{list.name}</label>
          <input style={styles.checkbox}
            type={type}
            name={name}
            checked={checked}
            onChange={handleChange}
          />
        </div>
  );
}

const styles = {
  listItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0.1em 0.4em",
    height: "30px",
    margin: "5px",
    backgroundColor: "white",
    borderRadius: "5px",
    boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.2)",
    cursor: "pointer",
  },
  checkbox: {
    marginLeft: "10px",
    cursor: "pointer",
  },
};
