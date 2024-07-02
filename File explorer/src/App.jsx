import { useState } from "react";
import "./App.css";
import Folder from "./components/Folder";
import explorer from "./data/folderDat";
import useTreeTraversal from "./hooks/useTreeTraversal";

function App() {
  const [explorerData, setExplorerData] = useState(explorer);
  const { insertNode } = useTreeTraversal();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);

    setExplorerData(finalTree);
  };
  return (
    <div>
      <Folder handleInsertNode={handleInsertNode} explorer={explorerData} />
    </div>
  );
}

export default App;
