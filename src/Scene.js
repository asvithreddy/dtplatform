


import { GizmoHelper, GizmoViewport, OrbitControls, PerspectiveCamera, OrthographicCamera, Grid, Line } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { useState, useEffect } from 'react';

function Vehicle({ isSolid, isWireframe }) {
  const Material = isSolid ? 'meshBasicMaterial' : 'meshStandardMaterial';

  return (
    <group position={[0, 0, 0]}>
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[3, 1, 2]} />
        <Material wireframe={isWireframe} />
      </mesh>
      <mesh position={[2, 1, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <Material wireframe={isWireframe} />
      </mesh>
    </group>
  );
}

function AxisHelpers() {
  return (
    <>
      <Line points={[[-100, 0, 0], [100, 0, 0]]} color="red" lineWidth={2} />
      <Line points={[[0, -100, 0], [0, 100, 0]]} color="green" lineWidth={2} />
      <Line points={[[0, 0, -100], [0, 0, 100]]} color="blue" lineWidth={2} />
    </>
  );
}

function SceneContent({ isSolid, isWireframe, cameraPosition, cameraLookAt, showGrid, isPerspective,defaultPosition }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Vehicle isSolid={isSolid} isWireframe={isWireframe} />
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

function Scene() {
  const [isSolid, setIsSolid] = useState(false);
  const [isWireframe, setIsWireframe] = useState(false);
  const [cameraPosition, setCameraPosition] = useState([0, 2, 5]);
  const [defaultPosition,setDefaultPosition]= useState([0,0,5]);
  const [cameraLookAt, setCameraLookAt] = useState([0, 0, 0]);
  const [showGrid, setShowGrid] = useState(true);
  const [isPerspective, setIsPerspective] = useState(true);

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

  return (
    <>
      <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1 }}>
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

        .camera-position-container {
          margin-top: 20px;
          padding: 15px;
          background-color: #1A1A1A;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.6);
        }

        .inputs {
          display: flex;
          gap: 10px;
        }

        .camera-input {
          width: 70px;
          padding: 8px;
          background-color: #333;
          border: 1px solid #777;
          border-radius: 5px;
          color: white;
          font-size: 14px;
          text-align: center;
        }

        .camera-input:focus {
          border-color: #a881af;
          outline: none;
        }
      `}</style>
    </>
  );
}

export default Scene;


