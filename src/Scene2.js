import {
  GizmoHelper,
  GizmoViewport,
  OrbitControls,
  PerspectiveCamera,
  Grid,
  Line,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { useState, useRef } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Draggable Item Type
const ITEM_TYPE = 'MESH';

// Draggable and Droppable Mesh
function DraggableMesh({ id, position, geometry, material, hierarchy, setHierarchy }) {
  const ref = useRef();

  // Dragging
  const [, drag] = useDrag({
    type: ITEM_TYPE,
    item: { id, type: ITEM_TYPE },
  });

  // Dropping
  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    drop: (item) => {
      if (item.id !== id) {
        // Update hierarchy: Set dragged item's parent to the current mesh
        setHierarchy((prev) => {
          const updatedHierarchy = [...prev];
          const draggedMesh = updatedHierarchy.find((mesh) => mesh.id === item.id);
          if (draggedMesh) {
            draggedMesh.parent = id; // Set new parent
          }
          return updatedHierarchy;
        });
      }
    },
  });

  drag(drop(ref)); // Combine drag and drop refs

  return (
    <mesh ref={ref} position={position}>
      {geometry}
      {material}
    </mesh>
  );
}

// Axis Helpers Component
function AxisHelpers() {
  return (
    <>
      <Line points={[[-100, 0, 0], [100, 0, 0]]} color="red" lineWidth={2} />
      <Line points={[[0, -100, 0], [0, 100, 0]]} color="green" lineWidth={2} />
      <Line points={[[0, 0, -100], [0, 0, 100]]} color="blue" lineWidth={2} />
    </>
  );
}

// Scene Content Component
function SceneContent({
  isSolid,
  isWireframe,
  cameraPosition,
  cameraLookAt,
  showGrid,
  hierarchy,
  setHierarchy,
}) {
  const Material = isSolid ? <meshBasicMaterial /> : <meshStandardMaterial wireframe={isWireframe} />;

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      {hierarchy.map((mesh) => {
        const { id, position } = mesh;
        return (
          <DraggableMesh
            key={id}
            id={id}
            position={position}
            geometry={<boxGeometry args={[1, 1, 1]} />}
            material={Material}
            hierarchy={hierarchy}
            setHierarchy={setHierarchy}
          />
        );
      })}
      <GizmoHelper alignment="top-right" margin={[80, 80]}>
        <GizmoViewport />
      </GizmoHelper>
      {showGrid && (
        <Grid
          position={[0, -0.1, 0]}
          args={[50, 50]}
          cellSize={1}
          infiniteGrid={false}
          fadeDistance={20}
          cellColor="gray"
          sectionColor="darkgray"
        />
      )}
      <AxisHelpers />
      <PerspectiveCamera makeDefault fov={75} position={cameraPosition} near={0.1} far={1000} />
      <OrbitControls target={cameraLookAt} />
    </>
  );
}

// Main Scene Component
function Scene() {
  const [isSolid, setIsSolid] = useState(false);
  const [isWireframe, setIsWireframe] = useState(false);
  const [cameraPosition, setCameraPosition] = useState([0, 2, 5]);
  const [cameraLookAt, setCameraLookAt] = useState([0, 0, 0]);
  const [showGrid, setShowGrid] = useState(true);

  // Hierarchy State
  const [hierarchy, setHierarchy] = useState([
    { id: 'body', position: [0, 0.5, 0], parent: null },
    { id: 'wheel1', position: [-1, 0, 1], parent: null },
    { id: 'wheel2', position: [1, 0, 1], parent: null },
  ]);

  const toggleMaterial = () => setIsSolid((prev) => !prev);
  const toggleWireframe = () => setIsWireframe((prev) => !prev);
  const toggleGrid = () => setShowGrid((prev) => !prev);

  // Export Hierarchy to JSON File
  const exportHierarchyToJson = () => {
    const json = JSON.stringify(hierarchy, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = 'hierarchy.json';
    link.click();

    // Revoke the object URL to free memory
    URL.revokeObjectURL(url);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1 }}>
        <button className="styled-button" onClick={toggleMaterial}>Toggle Solid Mesh</button>
        <button className="styled-button" onClick={toggleWireframe}>Toggle Wireframe</button>
        <button className="styled-button" onClick={toggleGrid}>Toggle Grid</button>
        <button className="styled-button" onClick={exportHierarchyToJson}>Export Hierarchy</button>
      </div>

      <Canvas style={{ background: 'black' }}>
        <SceneContent
          isSolid={isSolid}
          isWireframe={isWireframe}
          cameraPosition={cameraPosition}
          cameraLookAt={cameraLookAt}
          showGrid={showGrid}
          hierarchy={hierarchy}
          setHierarchy={setHierarchy}
        />
      </Canvas>

      <style jsx>{`
        .styled-button {
          background-color: #a881af;
          color: white;
          border: none;
          padding: 10px 15px;
          margin: 5px 0;
          font-size: 14px;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .styled-button:hover {
          background-color: #357ab8;
        }

        .styled-button:focus {
          outline: none;
        }
      `}</style>
    </DndProvider>
  );
}

export default Scene;
