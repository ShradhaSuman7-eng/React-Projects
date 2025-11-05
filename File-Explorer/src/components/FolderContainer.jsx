import React, { useState } from "react";
import json from "../data/data.json";

const List = ({ list, addNodeToList }) => {
  const [isExpanded, setIsExpanded] = useState({});
  const [showInput, setShowInput] = useState({});
  const [inputValue, setInputValue] = useState({});
  const [inputType, setInputType] = useState({});

  const toggleExpand = (name) => {
    setIsExpanded((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleAddClick = (id, isFolder) => {
    setShowInput((prev) => ({
      ...prev,
      [id]: true,
    }));
    setInputType((prev) => ({
      ...prev,
      [id]: isFolder,
    }));
  };

  const handleSubmit = (e, parentId, isFolder) => {
    e.preventDefault();
    if (!inputValue[parentId]?.trim()) return;

    addNodeToList(parentId, inputValue[parentId], isFolder);
    setInputValue((prev) => ({ ...prev, [parentId]: " " }));
    setShowInput((prev) => ({ ...prev, [parentId]: false }));
  };

  const handleBlur = (id) => {
    // Hide input when it loses focus
    setTimeout(() => {
      setShowInput((prev) => ({ ...prev, [id]: false }));
    }, 150);
  };

  return (
    <div>
      {list.map((node) => (
        <div key={node.id} className="my-1 ml-2">
          <div className="flex items-center gap-2">
            {node.isFolder ? (
              <>
                <div
                  className="cursor-pointer"
                  onClick={() => toggleExpand(node.name)}
                >
                  {isExpanded[node.name] ? (
                    <i className="fa-solid fa-chevron-down"></i>
                  ) : (
                    <i className="fa-solid fa-angle-right"></i>
                  )}
                </div>
                <i className="fa-solid fa-folder text-amber-400"></i>
                <span>{node.name}</span>

                {/* Add folder */}
                <button
                  onClick={() => handleAddClick(node.id, true)}
                  className="ml-2 text-blue-500"
                >
                  <i className="fa-solid fa-folder-plus"></i>
                </button>

                {/* Add file */}
                <button
                  onClick={() => handleAddClick(node.id, false)}
                  className="text-blue-500"
                >
                  <i className="fa-solid fa-file-circle-plus"></i>
                </button>
              </>
            ) : (
              <>
                <i className="fa-solid fa-file text-blue-300"></i>
                <span>{node.name}</span>
              </>
            )}
          </div>

          {/* Input for new file/folder */}
          {showInput[node.id] && (
            <form
              onSubmit={(e) =>
                handleSubmit(e, node.id, inputType[node.id] ?? true)
              }
              className="ml-6 mt-1"
            >
              <input
                type="text"
                className="border px-1 text-sm"
                placeholder={`Enter ${
                  inputType[node.id] ? "folder" : "file"
                } name`}
                autoFocus
                value={inputValue[node.id] || ""}
                onChange={(e) =>
                  setInputValue((prev) => ({
                    ...prev,
                    [node.id]: e.target.value,
                  }))
                }
                onBlur={() => handleBlur(node.id)}
              />
            </form>
          )}

          {/* Recursive children */}
          {node.isFolder &&
            isExpanded[node.name] &&
            node.children?.length > 0 && (
              <div className="ml-6">
                <List list={node.children} addNodeToList={addNodeToList} />
              </div>
            )}
        </div>
      ))}
    </div>
  );
};

const FolderContainer = () => {
  const [data, setData] = useState(json);

  const addNodeToList = (parentId, name, isFolder) => {
    const updateTree = (list) =>
      list.map((node) => {
        if (node.id === parentId) {
          // Checking for duplicate name under the same parent
          const hasDuplicate =
            node.children &&
            node.children.some(
              (child) =>
                child.name.toLowerCase() === name.toLowerCase() &&
                child.isFolder === isFolder
            );

          if (hasDuplicate) {
            alert("A file/folder with the same name already exists!");
            return node; // return unchanged
          }

          // Create new node if not duplicate
          const newNode = {
            id: Date.now().toString(),
            name,
            isFolder,
            children: isFolder ? [] : undefined,
          };

          return {
            ...node,
            children: node.children ? [...node.children, newNode] : [newNode],
          };
        }

        if (node.children) {
          return { ...node, children: updateTree(node.children) };
        }

        return node;
      });

    setData((prev) => updateTree(prev));
  };

  return (
    <div className="p-4">
      <List addNodeToList={addNodeToList} list={data} />
    </div>
  );
};

export default FolderContainer;
