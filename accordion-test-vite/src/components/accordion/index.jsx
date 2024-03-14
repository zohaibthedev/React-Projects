import { useState } from "react";
import accordionData from "./data";
import "./style.css";

export default function Accordion() {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multipleSelected, setMultipleSelected] = useState([]);

  function handleSingleSelection(getCurrentId) {
    setSelected(getCurrentId === selected ? null : getCurrentId);
  }

  function handleMultiSelection(getCurrentId) {
    let copyMultiple = [...multipleSelected];
    const findIndexOfCurrentId = copyMultiple.indexOf(getCurrentId);
    console.log(findIndexOfCurrentId);

    if (findIndexOfCurrentId === -1) copyMultiple.push(getCurrentId);
    else copyMultiple.splice(findIndexOfCurrentId, 1);

    setMultipleSelected(copyMultiple);
  }

  console.log(selected, multipleSelected);

  return (
    // eslint-disable-next-line no-console
    <div className="wrapper">
      <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
        Enable Multi-Selection
      </button>
      <div className="accordion">
        {accordionData && accordionData.length > 0 ? (
          accordionData.map((dataItem) => (
            <div className="item" key={dataItem.id}>
              <div
                onClick={
                  enableMultiSelection
                    ? () => handleMultiSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
                className="title"
              >
                <h3>{dataItem.title}</h3>
                <span>+</span>
              </div>
              {enableMultiSelection
                ? multipleSelected.indexOf(dataItem.id) !== -1 && (
                  <div className="content"> {dataItem.content} </div>
                )
                : selected === dataItem.id && (
                  <div className="content"> {dataItem.content} </div>
                )}
            </div>
          ))
        ) : (
          <div>No data found</div>
        )}
      </div>
    </div>
  );
}
