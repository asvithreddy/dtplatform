


import { GizmoHelper, GizmoViewport, OrbitControls, PerspectiveCamera, OrthographicCamera, Grid, Line } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import React, { useState, useEffect } from 'react';
import * as THREE from 'three';

// Vehicle Component
function Vehicle({ isSolid, isWireframe, selectedObject, onObjectClick }) {
  const Material = isSolid ? THREE.MeshStandardMaterial : THREE.MeshBasicMaterial;

  const handleClick = (objectName) => {
    onObjectClick(objectName);
  };

  return (
    <group name="VehicleCube" position={[0, 0, 0]}>
      <mesh
        name="CubeParent"
        position={[0, 0.5, 0]}
        onClick={() => handleClick('CubeParent')}
        material={selectedObject === 'CubeParent' ? new THREE.MeshBasicMaterial({ color: 'yellow' }) : new Material({ wireframe: isWireframe })}
      >
        <boxGeometry args={[3, 1, 2]} />
      </mesh>
      <mesh
        name="Sphere"
        position={[2, 1, 0]}
        onClick={() => handleClick('Sphere')}
        material={selectedObject === 'Sphere' ? new THREE.MeshBasicMaterial({ color: 'yellow' }) : new Material({ wireframe: isWireframe })}
      >
        <sphereGeometry args={[0.5, 32, 32]} />
      </mesh>
    </group>
  );
}

// Hierarchy Component
function ObjectHierarchy({ sceneObjects, onObjectClick }) {
  const [expanded, setExpanded] = useState({}); // Manage expanded state for parent objects

  const toggleExpand = (objectName) => {
    setExpanded((prev) => ({
      ...prev,
      [objectName]: !prev[objectName],
    }));
  };

  const renderHierarchy = (objects) =>
    objects.map((obj) => (
      <div key={obj.name} style={{ marginLeft: obj.level * 10 }}>
        <div
          style={{ cursor: 'pointer', color: 'white', margin: '5px 0' }}
          onClick={() => {
            if (obj.children?.length) toggleExpand(obj.name);
            onObjectClick(obj.name);
          }}
        >
          {obj.children?.length ? (expanded[obj.name] ? '▼ ' : '▶ ') : '• '}
          {obj.name}
        </div>
        {expanded[obj.name] && obj.children?.length > 0 && renderHierarchy(obj.children)}
      </div>
    ));

  return <div>{renderHierarchy(sceneObjects)}</div>;
}

// Axis Helper
function AxisHelpers() {
  return (
    <>
      <Line points={[[-100, 0, 0], [100, 0, 0]]} color="red" lineWidth={2} />
      <Line points={[[0, -100, 0], [0, 100, 0]]} color="green" lineWidth={2} />
      <Line points={[[0, 0, -100], [0, 0, 100]]} color="blue" lineWidth={2} />
    </>
  );
}

// SceneContent Component
function SceneContent({ isSolid, isWireframe, cameraPosition, cameraLookAt, showGrid, isPerspective, defaultPosition, selectedObject, onObjectClick }) {
  const { camera, scene } = useThree();

  // Highlight object by name
  useEffect(() => {
    if (selectedObject) {
      const object = scene.getObjectByName(selectedObject);
      if (object) {
        camera.lookAt(object.position); // Point camera to the object
        object.material = new THREE.MeshBasicMaterial({ color: 'yellow' }); // Highlight the object
        setTimeout(() => {
          object.material = isSolid ? new THREE.MeshBasicMaterial() : new THREE.MeshStandardMaterial();
        }, 1000);
      }
    }
  }, [selectedObject, camera, scene, isSolid]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Vehicle isSolid={isSolid} isWireframe={isWireframe} selectedObject={selectedObject} onObjectClick={onObjectClick} />
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
        <OrthographicCamera makeDefault position={defaultPosition} zoom={100} near={-1000} far={1000} />
      )}
      <OrbitControls target={cameraLookAt} />
    </>
  );
}

// Scene Component
function Scene() {
  const [isSolid, setIsSolid] = useState(false);
  const [isWireframe, setIsWireframe] = useState(false);
  const [cameraPosition, setCameraPosition] = useState([0, 2, 5]);
  const [defaultPosition, setDefaultPosition] = useState([0, 0, 5]);
  const [cameraLookAt, setCameraLookAt] = useState([0, 0, 0]);
  const [showGrid, setShowGrid] = useState(true);
  const [isPerspective, setIsPerspective] = useState(true);
  const [selectedObject, setSelectedObject] = useState(null);

  const [inputX, setInputX] = useState(0);
  const [inputY, setInputY] = useState(2);
  const [inputZ, setInputZ] = useState(5);

  const toggleMaterial = () => setIsSolid((prev) => !prev);
  const toggleWireframe = () => setIsWireframe((prev) => !prev);
  const toggleGrid = () => setShowGrid((prev) => !prev);
  const toggleCameraType = () => setIsPerspective((prev) => !prev);

  const setViewTop = () => setCameraPosition([0, 10, 0]);
  const setViewFront = () => setCameraPosition([0, 2, 10]);
  const setViewSide = () => setCameraPosition([10, 2, 0]);

  useEffect(() => {
    setCameraPosition([parseFloat(inputX), parseFloat(inputY), parseFloat(inputZ)]);
  }, [inputX, inputY, inputZ]);

  const sceneObjects = [
    {
      name: 'Vehicle',
      level: 0,
      children: [
        {
          name: 'CubeParent',
          level: 1,
          parent: 'Vehicle',
          children: [],
        },
        {
          name: 'Sphere',
          level: 1,
          parent: 'Vehicle',
          children: [],
        },
      ],
    },
  ];

  const handleObjectClick = (objectName) => {
    setSelectedObject(objectName);
  };

  return (
    <>
      <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1 }}>
        <ObjectHierarchy sceneObjects={sceneObjects} onObjectClick={handleObjectClick} />
        <button className="styled-button" onClick={toggleMaterial}>Toggle Solid Mesh</button>
        <button className="styled-button" onClick={toggleWireframe}>Toggle Wireframe</button>
        <button className="styled-button" onClick={setViewTop}>Top View</button>
        <button className="styled-button" onClick={setViewFront}>Front View</button>
        <button className="styled-button" onClick={setViewSide}>Side View</button>
        <button className="styled-button" onClick={toggleGrid}>Toggle Grid</button>
        <button className="styled-button" onClick={toggleCameraType}>
          Toggle {isPerspective ? 'Orthographic' : 'Perspective'} View
        </button>
        <div className="camera-position-container">
          <label style={{ color: '#A0A0A0', fontSize: '16px', fontWeight: 'bold' }}>Custom Camera Position:</label>
          <div className="inputs">
            <input
              type="number"
              value={inputX}
              onChange={(e) => setInputX(e.target.value)}
              placeholder="X"
              className="camera-input"
            />
            <input
              type="number"
              value={inputY}
              onChange={(e) => setInputY(e.target.value)}
              placeholder="Y"
              className="camera-input"
            />
            <input
              type="number"
              value={inputZ}
              onChange={(e) => setInputZ(e.target.value)}
              placeholder="Z"
              className="camera-input"
            />
          </div>
        </div>
      </div>

      <Canvas style={{ background: 'black' }}>
        <SceneContent
          isSolid={isSolid}
          isWireframe={isWireframe}
          cameraPosition={cameraPosition}
          cameraLookAt={cameraLookAt}
          showGrid={showGrid}
          isPerspective={isPerspective}
          defaultPosition={defaultPosition}
          selectedObject={selectedObject}
          onObjectClick={handleObjectClick}
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

        .camera-position-container {
          margin-top: 20px;
        }

        .inputs {
          display: flex;
          gap: 10px;
        }

        .camera-input {
          width: 60px;
          padding: 5px;
          font-size: 14px;
        }
      `}</style>
    </>
  );
}

export default Scene;
