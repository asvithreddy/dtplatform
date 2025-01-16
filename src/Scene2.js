import { GizmoHelper, GizmoViewport, OrbitControls, PerspectiveCamera, OrthographicCamera, Grid, Line } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { useState, useRef } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Draggable Item Type
const ITEM_TYPE = 'MESH';

// Draggable Component
function DraggableMesh({ id, position, geometry, material, children, onUpdatePosition }) {
  const ref = useRef();

  const [, drag] = useDrag({
    type: ITEM_TYPE,
    item: { id, type: ITEM_TYPE },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult && onUpdatePosition) {
        onUpdatePosition(item.id, dropResult.position);
      }
    },
  });

  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    drop: () => ({ position }),
  });

  drag(drop(ref)); // Combine drag and drop refs

  return (
    <mesh ref={ref} position={position}>
      {geometry}
      {material}
      {children}
    </mesh>
  );
}

// Vehicle Component with Drag-and-Drop
function Vehicle({ isSolid, isWireframe, onUpdateHierarchy }) {
  const Material = isSolid ? <meshBasicMaterial /> : <meshStandardMaterial wireframe={isWireframe} />;

  const handleUpdatePosition = (id, newPosition) => {
    if (onUpdateHierarchy) {
      onUpdateHierarchy((prev) => {
        const updatedHierarchy = [...prev];
        const mesh = updatedHierarchy.find((m) => m.id === id);
        if (mesh) mesh.position = newPosition;
        return updatedHierarchy;
      });
    }
  };

  const vehicleMeshes = [
    { id: 'body', position: [0, 0.5, 0], geometry: <boxGeometry args={[3, 1, 2]} />, material: Material },
    { id: 'wheel', position: [2, 1, 0], geometry: <sphereGeometry args={[0.5, 32, 32]} />, material: Material },
  ];

  return (
    <>
      {vehicleMeshes.map((mesh) => (
        <DraggableMesh
          key={mesh.id}
          id={mesh.id}
          position={mesh.position}
          geometry={mesh.geometry}
          material={mesh.material}
          onUpdatePosition={handleUpdatePosition}
        />
      ))}
    </>
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
function SceneContent({ isSolid, isWireframe, cameraPosition, cameraLookAt, showGrid, isPerspective, hierarchy, onUpdateHierarchy }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Vehicle isSolid={isSolid} isWireframe={isWireframe} onUpdateHierarchy={onUpdateHierarchy} />
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
      {isPerspective ? (
        <PerspectiveCamera makeDefault fov={75} position={cameraPosition} near={0.1} far={1000} />
      ) : (
        <OrthographicCamera makeDefault position={cameraPosition} zoom={100} near={-1000} far={1000} />
      )}
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
  const [isPerspective, setIsPerspective] = useState(true);
  const [hierarchy, setHierarchy] = useState([
    { id: 'body', position: [0, 0.5, 0] },
    { id: 'wheel', position: [2, 1, 0] },
  ]);

  const toggleMaterial = () => setIsSolid((prev) => !prev);
  const toggleWireframe = () => setIsWireframe((prev) => !prev);
  const toggleGrid = () => setShowGrid((prev) => !prev);
  const toggleCameraType = () => setIsPerspective((prev) => !prev);

  const exportHierarchyToJson = () => {
    const json = JSON.stringify(hierarchy, null, 2);
    console.log('Hierarchy JSON:', json);
    alert(`Hierarchy exported to console:\n${json}`);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1 }}>
        <button className="styled-button" onClick={toggleMaterial}>Toggle Solid Mesh</button>
        <button className="styled-button" onClick={toggleWireframe}>Toggle Wireframe</button>
        <button className="styled-button" onClick={toggleGrid}>Toggle Grid</button>
        <button className="styled-button" onClick={toggleCameraType}>
          Toggle {isPerspective ? 'Orthographic' : 'Perspective'} View
        </button>
        <button className="styled-button" onClick={exportHierarchyToJson}>Export Hierarchy</button>
      </div>

      <Canvas style={{ background: 'black' }}>
        <SceneContent
          isSolid={isSolid}
          isWireframe={isWireframe}
          cameraPosition={cameraPosition}
          cameraLookAt={cameraLookAt}
          showGrid={showGrid}
          isPerspective={isPerspective}
          hierarchy={hierarchy}
          onUpdateHierarchy={setHierarchy}
        />
      </Canvas>
    </DndProvider>
  );
}

export default Scene;
