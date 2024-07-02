import { useState } from "react";
import explorer from "../data/folderDat";

const Folder = ({ explorer, handleInsertNode }) => {
  const [expand, setExpand] = useState(false);

  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  const handleAddFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };
  if (explorer.isFolder) {
    return (
      <div>
        <div className="folder" onClick={() => setExpand(!expand)}>
          <span>📁{explorer.name}</span>
          <div>
            <button onClick={(e) => handleAddFolder(e, false)}>File➕</button>
            <button onClick={(e) => handleAddFolder(e, true)}>Folder➕</button>
          </div>
        </div>
        <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
          {showInput.visible && (
            <div className="input-container">
              <span>{showInput.isFolder ? "📁" : "📄"}</span>
              <input
                type="text"
                onKeyDown={onAddFolder}
                autoFocus
                className="input-box"
                onBlur={() => setShowInput({ ...showInput, visible: false })}
              />
            </div>
          )}
          {explorer.items.map((exp) => {
            return (
              <Folder
                handleInsertNode={handleInsertNode}
                explorer={exp}
                key={exp.id}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return <span className="file">📄{explorer.name}</span>;
  }
};

export default Folder;
