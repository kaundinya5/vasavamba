import React from "react";

function List(props) {
  let current = props.currentIndex === props.index;
  return (
    <ul className="holder">
      <li
        className="question"
        style={{
          backgroundColor: current && "#00d782bf"
        }}
        onClick={() => props.handleChange(props.index)}
      >
        {props.question}
      </li>

      {props.answer.map((item,idx) =>
        (<li key={idx}  className={current ? "answer open" : "answer"}  onClick={() => props.handleClick(item,props.units[idx])}>
          {current && <p>{item}</p>}
        </li>))}
    </ul>
  );
}

export default List;
