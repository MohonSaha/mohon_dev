"use client";
import { useState } from "react";

interface Box {
  id: number;
  count: number;
  children: Box[];
  height: number;
  isClickedOnce: boolean;
}

const Home = () => {
  const [boxes, setBoxes] = useState<Box[]>([
    { id: 0, count: 0, children: [], height: 40, isClickedOnce: false },
  ]);

  const handleBoxClick = (box: Box) => {
    const updateBoxes = (currentBoxes: Box[], targetBox: Box): Box[] => {
      return currentBoxes.map((b) => {
        if (b.id === targetBox.id) {
          const newChild = {
            id: Date.now(),
            count: 0,
            children: [],
            height: 40,
            isClickedOnce: false,
          };

          if (!b.isClickedOnce) {
            return {
              ...b,
              count: b.count + 1,
              isClickedOnce: true,
              children: [...b.children, newChild],
            };
          }

          return {
            ...b,
            count: b.count + 1,
            height: b.height + 40,
            children: [...b.children, newChild],
          };
        }

        const updatedChildren = updateBoxes(b.children, targetBox);
        const hasChildHeightChanged = updatedChildren.some(
          (child) =>
            child.height !== b.children.find((c) => c.id === child.id)?.height
        );

        return {
          ...b,
          height:
            hasChildHeightChanged && b.isClickedOnce ? b.height + 40 : b.height,
          children: updatedChildren,
        };
      });
    };

    setBoxes((prevBoxes) => updateBoxes(prevBoxes, box));
  };

  const renderBoxes = (boxList: Box[]) => {
    return boxList.map((box) => (
      <div
        key={box.id}
        style={{
          display: "flex",
          flexDirection: "row",
          margin: "0px 0",
          borderRadius: "50px",
        }}
      >
        <div
          onClick={() => handleBoxClick(box)}
          style={{
            width: "40px",
            height: `${box.height}px`,
            border: "1px solid black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            backgroundColor: "lightgray",
            borderRadius: "5px",
          }}
        >
          {box.count}
        </div>
        <div style={{ marginLeft: "10px" }}>{renderBoxes(box.children)}</div>
      </div>
    ));
  };

  return (
    <div style={{ padding: "20px" }}>
      <div>{renderBoxes(boxes)}</div>
    </div>
  );
};

export default Home;
