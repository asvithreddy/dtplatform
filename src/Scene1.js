
// shift+w controls


// import { GizmoHelper, GizmoViewport, OrbitControls, PerspectiveCamera, Grid, Line } from '@react-three/drei';
// import { Canvas } from '@react-three/fiber';
// import React, { useState, useEffect } from 'react';

// function Vehicle({ isSolid, isWireframe }) {
//   const Material = isSolid ? 'meshBasicMaterial' : 'meshStandardMaterial';

//   return (
//     <group position={[0, 0, 0]}>
//       <mesh position={[0, 0.5, 0]}>
//         <boxGeometry args={[3, 1, 2]} />
//         <Material wireframe={isWireframe} />
//       </mesh>
//       <mesh position={[2, 1, 0]}>
//         <sphereGeometry args={[0.5, 32, 32]} />
//         <Material wireframe={isWireframe} />
//       </mesh>
//     </group>
//   );
// }

// function AxisHelpers() {
//   return (
//     <>
//       <Line points={[[-100, 0, 0], [100, 0, 0]]} color="red" lineWidth={2} />
//       <Line points={[[0, -100, 0], [0, 100, 0]]} color="green" lineWidth={2} />
//       <Line points={[[0, 0, -100], [0, 0, 100]]} color="blue" lineWidth={2} />
//     </>
//   );
// }

// function SceneContent({ isSolid, isWireframe, cameraPosition, cameraLookAt, showGrid }) {
//   return (
//     <>
//       <ambientLight intensity={0.5} />
//       <directionalLight position={[5, 5, 5]} intensity={1} />
//       <Vehicle isSolid={isSolid} isWireframe={isWireframe} />
//       <GizmoHelper alignment="top-right" margin={[80, 80]}>
//         <GizmoViewport />
//       </GizmoHelper>
//       {showGrid && (
//         <Grid
//           position={[0, -0.1, 0]}
//           args={[1000, 1000]}
//           cellSize={1}
//           infiniteGrid={true}
//           cellColor="white"
//           sectionColor="white"
//           fadeDistance={100}
//         />
//       )}
//       <AxisHelpers />
//       <PerspectiveCamera makeDefault fov={75} position={cameraPosition} near={0.1} far={1000} />
//       <OrbitControls target={cameraLookAt} />
//     </>
//   );
// }

// function Scene() {
//   const [isSolid, setIsSolid] = useState(false);
//   const [isWireframe, setIsWireframe] = useState(false);
//   const [cameraPosition, setCameraPosition] = useState([0, 2, 5]);
//   const [cameraLookAt, setCameraLookAt] = useState([0, 0, 0]);
//   const [showGrid, setShowGrid] = useState(true);

//   const [inputX, setInputX] = useState(0);
//   const [inputY, setInputY] = useState(2);
//   const [inputZ, setInputZ] = useState(5);

//   const toggleMaterial = () => setIsSolid((prev) => !prev);
//   const toggleWireframe = () => setIsWireframe((prev) => !prev);
//   const toggleGrid = () => setShowGrid((prev) => !prev);

//   const setViewA = () => setCameraPosition([0, 5, 10]);
//   const setViewB = () => setCameraPosition([4, 2, 4]);
//   const setViewC = () => setCameraPosition([-4, 3, 6]);

//   useEffect(() => {
//     setCameraPosition([parseFloat(inputX), parseFloat(inputY), parseFloat(inputZ)]);
//   }, [inputX, inputY, inputZ]);

//   // Keyboard controls for camera movement
//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (event.shiftKey) {
//         const [x, y, z] = cameraPosition;
//         const moveStep = 0.5;
//         switch (event.key.toLowerCase()) {
//           case 'w':
//             setCameraPosition([x, y, z - moveStep]);
//             break;
//           case 's':
//             setCameraPosition([x, y, z + moveStep]);
//             break;
//           case 'a':
//             setCameraPosition([x - moveStep, y, z]);
//             break;
//           case 'd':
//             setCameraPosition([x + moveStep, y, z]);
//             break;
//           default:
//             break;
//         }
//       }
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [cameraPosition]);

//   return (
//     <>
//       <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1 }}>
//         <button className="styled-button" onClick={toggleMaterial}>Toggle Solid Mesh</button>
//         <button className="styled-button" onClick={toggleWireframe}>Toggle Wireframe</button>
//         <button className="styled-button" onClick={setViewA}>View A</button>
//         <button className="styled-button" onClick={setViewB}>View B</button>
//         <button className="styled-button" onClick={setViewC}>View C</button>
//         <button className="styled-button" onClick={toggleGrid}>Toggle Grid</button>
//         <div className="camera-position-container">
//           <label style={{ color: '#A0A0A0', fontSize: '16px', fontWeight: 'bold' }}>Custom Camera Position:</label>
//           <div className="inputs">
//             <input 
//               type="number" 
//               value={inputX} 
//               onChange={(e) => setInputX(e.target.value)} 
//               placeholder="X" 
//               className="camera-input" 
//             />
//             <input 
//               type="number" 
//               value={inputY} 
//               onChange={(e) => setInputY(e.target.value)} 
//               placeholder="Y" 
//               className="camera-input" 
//             />
//             <input 
//               type="number" 
//               value={inputZ} 
//               onChange={(e) => setInputZ(e.target.value)} 
//               placeholder="Z" 
//               className="camera-input" 
//             />
//           </div>
//         </div>
//       </div>

//       <Canvas style={{ background: 'black' }}>
//         <SceneContent 
//           isSolid={isSolid} 
//           isWireframe={isWireframe} 
//           cameraPosition={cameraPosition} 
//           cameraLookAt={cameraLookAt} 
//           showGrid={showGrid} 
//         />
//       </Canvas>

//       <style jsx>{`
//         .styled-button {
//           background-color: #a881af;
//           color: white;
//           border: none;
//           padding: 10px 15px;
//           margin: 5px 0;
//           font-size: 14px;
//           border-radius: 5px;
//           cursor: pointer;
//           transition: background-color 0.3s;
//         }

//         .styled-button:hover {
//           background-color: #357ab8;
//         }

//         .styled-button:focus {
//           outline: none;
//         }

//         .camera-position-container {
//           margin-top: 20px;
//           padding: 15px;
//           background-color: #1A1A1A;
//           border-radius: 8px;
//           box-shadow: 0 4px 10px rgba(0, 0, 0, 0.6);
//         }

//         .inputs {
//           display: flex;
//           gap: 10px;
//         }

//         .camera-input {
//           width: 70px;
//           padding: 8px;
//           background-color: #333;
//           border: 1px solid #777;
//           border-radius: 5px;
//           color: white;
//           font-size: 14px;
//           text-align: center;
//         }

//         .camera-input:focus {
//           border-color: #a881af;
//           outline: none;
//         }
//       `}</style>
//     </>
//   );
// }

// export default Scene;


// import React, { useState, useEffect } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { GizmoHelper, GizmoViewport, OrbitControls, PerspectiveCamera, OrthographicCamera, Grid, Line } from '@react-three/drei';


// import Hierarchy from './Hierarchy'; // Import the new Hierarchy component
// function Vehicle({ isSolid, isWireframe }) {
//     const Material = isSolid ? 'meshBasicMaterial' : 'meshStandardMaterial';
  
//     return (
//       <group position={[0, 0, 0]}>
//         <mesh position={[0, 0.5, 0]}>
//           <boxGeometry args={[3, 1, 2]} />
//           <Material wireframe={isWireframe} />
//         </mesh>
//         <mesh position={[2, 1, 0]}>
//           <sphereGeometry args={[0.5, 32, 32]} />
//           <Material wireframe={isWireframe} />
//         </mesh>
//       </group>
//     );
//   }
//   function AxisHelpers() {
//     return (
//       <>
//         <Line points={[[-100, 0, 0], [100, 0, 0]]} color="red" lineWidth={2} />
//         <Line points={[[0, -100, 0], [0, 100, 0]]} color="green" lineWidth={2} />
//         <Line points={[[0, 0, -100], [0, 0, 100]]} color="blue" lineWidth={2} />
//       </>
//     );
//   }  
//   function SceneContent({ isSolid, isWireframe, cameraPosition, cameraLookAt, showGrid, isPerspective,defaultPosition }) {
//     return (
//       <>
//         <ambientLight intensity={0.5} />
//         <directionalLight position={[5, 5, 5]} intensity={1} />
//         <Vehicle isSolid={isSolid} isWireframe={isWireframe} />
//         <GizmoHelper alignment="top-right" margin={[80, 80]}>
//           <GizmoViewport />
//         </GizmoHelper>
//         {showGrid && (
//           <Grid
//             position={[0, -0.1, 0]}
//             args={[50, 50]}
//             cellSize={1}
//             infiniteGrid={false}
//             fadeDistance={20}
//             cellColor="gray"
//             sectionColor="darkgray"
//           />
//         )}
//         <AxisHelpers />
//         {isPerspective ? (
//           <PerspectiveCamera makeDefault fov={75} position={cameraPosition} near={0.1} far={1000} />
//         ) : (
//           <OrthographicCamera makeDefault position={defaultPosition} zoom={100} near={-1000} far={1000} />
//         )}
//         <OrbitControls target={cameraLookAt} />
//       </>
//     );
//   }
// // function Sce() {
// //   const [isSolid, setIsSolid] = useState(false);
// //   const [isWireframe, setIsWireframe] = useState(false);
// //   const [cameraPosition, setCameraPosition] = useState([0, 2, 5]);
// //   const [cameraLookAt, setCameraLookAt] = useState([0, 0, 0]);
// //   const [showGrid, setShowGrid] = useState(true);
// //   const [isPerspective, setIsPerspective] = useState(true);
  
// //   // State for hierarchy
// //   const [hierarchyObjects, setHierarchyObjects] = useState([{ name: 'Scene', children: [] }]);

// //   // Function to update hierarchy when vehicles are added or modified
// //   const updateHierarchy = () => {
// //     const vehicleNode = {
// //       name: 'Vehicle',
// //       children: [
// //         { name: 'Box' },
// //         { name: 'Sphere' }
// //       ]
// //     };
    
// //     // Reset hierarchy and add vehicle node
// //     setHierarchyObjects([{ name: 'Scene', children: [vehicleNode] }]);
// //   };

// //   useEffect(() => {
// //     updateHierarchy(); // Call this whenever you want to update the hierarchy
// //   }, [isSolid, isWireframe]); // Add dependencies as needed

// //   return (
// //     <>
// //       <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1 }}>
// //         {/* Your buttons and inputs */}
// //       </div>

// //       <Canvas style={{ background: 'black' }}>
// //         <SceneContent
// //           isSolid={isSolid}
// //           isWireframe={isWireframe}
// //           cameraPosition={cameraPosition}
// //           cameraLookAt={cameraLookAt}
// //           showGrid={showGrid}
// //           isPerspective={isPerspective}
// //         />
// //       </Canvas>

// //       <div style={{ position: 'absolute', right: '20px', top: '20px', width: '200px', zIndex: 1 }}>
// //         <Hierarchy objects={hierarchyObjects} />
// //       </div>

// //       {/* Your styles */}
// //     </>
// //   );
// // }

// // export default Sce;
// function Sce() {
//     const [isSolid, setIsSolid] = useState(false);
//     const [isWireframe, setIsWireframe] = useState(false);
//     const [cameraPosition, setCameraPosition] = useState([0, 2, 5]);
//     const [cameraLookAt, setCameraLookAt] = useState([0, 0, 0]);
//     const [showGrid, setShowGrid] = useState(true);
//     const [isPerspective, setIsPerspective] = useState(true);
  
//     // State for hierarchy
//     const [hierarchyObjects, setHierarchyObjects] = useState([{ name: 'Scene', children: [] }]);
  
//     // Input states for custom camera position
//     const [inputX, setInputX] = useState(0);
//     const [inputY, setInputY] = useState(2);
//     const [inputZ, setInputZ] = useState(5);
  
//     // Toggle functions
//     const toggleMaterial = () => setIsSolid((prev) => !prev);
//     const toggleWireframe = () => setIsWireframe((prev) => !prev);
//     const toggleGrid = () => setShowGrid((prev) => !prev);
//     const toggleCameraType = () => setIsPerspective((prev) => !prev);
  
//     // Update camera position based on inputs
//     useEffect(() => {
//       setCameraPosition([parseFloat(inputX), parseFloat(inputY), parseFloat(inputZ)]);
//     }, [inputX, inputY, inputZ]);
  
//     // Function to update hierarchy when vehicles are added or modified
//     const updateHierarchy = () => {
//       const vehicleNode = {
//         name: 'Vehicle',
//         children: [
//           { name: 'Box' },
//           { name: 'Sphere' }
//         ]
//       };
      
//       // Reset hierarchy and add vehicle node
//       setHierarchyObjects([{ name: 'Scene', children: [vehicleNode] }]);
//     };
  
//     useEffect(() => {
//       updateHierarchy(); // Call this whenever you want to update the hierarchy
//     }, [isSolid, isWireframe]); // Add dependencies as needed
  
//     return (
//       <>
//         <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1 }}>
//           <button className="styled-button" onClick={toggleMaterial}>Toggle Solid Mesh</button>
//           <button className="styled-button" onClick={toggleWireframe}>Toggle Wireframe</button>
//           <button className="styled-button" onClick={toggleGrid}>Toggle Grid</button>
//           <button className="styled-button" onClick={toggleCameraType}>
//             Toggle {isPerspective ? 'Orthographic' : 'Perspective'} View
//           </button>
//           <div className="camera-position-container">
//             <label style={{ color: '#A0A0A0', fontSize: '16px', fontWeight: 'bold' }}>Custom Camera Position:</label>
//             <div className="inputs">
//               <input
//                 type="number"
//                 value={inputX}
//                 onChange={(e) => setInputX(e.target.value)}
//                 placeholder="X"
//                 className="camera-input"
//               />
//               <input
//                 type="number"
//                 value={inputY}
//                 onChange={(e) => setInputY(e.target.value)}
//                 placeholder="Y"
//                 className="camera-input"
//               />
//               <input
//                 type="number"
//                 value={inputZ}
//                 onChange={(e) => setInputZ(e.target.value)}
//                 placeholder="Z"
//                 className="camera-input"
//               />
//             </div>
//           </div>
//         </div>
  
//         <Canvas style={{ background: 'black' }}>
//           <SceneContent
//             isSolid={isSolid}
//             isWireframe={isWireframe}
//             cameraPosition={cameraPosition}
//             cameraLookAt={cameraLookAt}
//             showGrid={showGrid}
//             isPerspective={isPerspective}
//           />
//           <GizmoHelper alignment="top-right" margin={[80, 80]}>
//             <GizmoViewport />
//           </GizmoHelper>
//         </Canvas>
  
//         <div style={{ position: 'absolute', right: '20px', top: '20px', width: '200px', zIndex: 1 }}>
//           <Hierarchy objects={hierarchyObjects} />
//         </div>
  
//         {/* Your styles */}
//         <style jsx>{`
//           .styled-button {
//             background-color: #a881af;
//             color: white;
//             border: none;
//             padding: 10px 15px;
//             margin: 5px 0;
//             font-size: 14px;
//             border-radius: 5px;
//             cursor: pointer;
//             transition: background-color 0.3s;
//           }
  
//           .styled-button:hover {
//             background-color: #357ab8;
//           }
  
//           .styled-button:focus {
//             outline: none;
//           }
  
//           .camera-position-container {
//             margin-top: 20px;
//             padding: 15px;
//             background-color: #1A1A1A;
//             border-radius: 8px;
//             box-shadow: 0 4px 10px rgba(0, 0, 0, 0.6);
//           }
  
//           .inputs {
//             display: flex;
//             gap: 10px;
//           }
  
//           .camera-input {
//             width: 70px;
//             padding: 8px;
//             background-color: #333;
//             border: 1px solid #777;
//             border-radius: 5px;
//             color: white;
//             font-size: 14px;
//             text-align: center;
//           }
  
//           .camera-input:focus {
//             border-color: #a881af;
//             outline: none;
//           }
//         `}</style>
//       </>
//     );
//   }
  
//   export default Sce;
  


// import { GizmoHelper, GizmoViewport, OrbitControls, PerspectiveCamera, OrthographicCamera, Grid, Line } from '@react-three/drei';
// import { Canvas, useThree } from '@react-three/fiber';
// import React, { useState, useEffect, useRef } from 'react';
// import * as THREE from 'three'; // Import the THREE object


// // Vehicle Component
// function Vehicle({ isSolid, isWireframe }) {
//   const Material = isSolid ? 'meshBasicMaterial' : 'meshStandardMaterial';
//   return (
//     <group name="VehicleCube" position={[0, 0, 0]}>
//       <mesh name="CubeParent" position={[0, 0.5, 0]}>
//         <boxGeometry args={[3, 1, 2]} />
//         <Material wireframe={isWireframe} />
//       </mesh>
//       <mesh name="CubeChild" position={[2, 1, 0]}>
//         <sphereGeometry args={[0.5, 32, 32]} />
//         <Material wireframe={isWireframe} />
//       </mesh>
//     </group>
//   );
// }

// // Hierarchy Component
// function ObjectHierarchy({ sceneObjects, onObjectClick }) {
//   const [expanded, setExpanded] = useState({}); // Manage expanded state for parent objects

//   const toggleExpand = (objectName) => {
//     setExpanded((prev) => ({
//       ...prev,
//       [objectName]: !prev[objectName],
//     }));
//   };

//   const renderHierarchy = (objects) =>
//     objects.map((obj) => (
//       <div key={obj.name} style={{ marginLeft: obj.level * 10 }}>
//         <div
//           style={{ cursor: 'pointer', color: 'white', margin: '5px 0' }}
//           onClick={() => {
//             if (obj.children?.length) toggleExpand(obj.name);
//             onObjectClick(obj.name, obj.parent);
//           }}
//         >
//           {obj.children?.length ? (expanded[obj.name] ? '▼ ' : '▶ ') : '• '}
//           {obj.name}
//         </div>
//         {expanded[obj.name] && obj.children?.length > 0 && renderHierarchy(obj.children)}
//       </div>
//     ));

//   return <div>{renderHierarchy(sceneObjects)}</div>;
// }

// // Axis Helper
// function AxisHelpers() {
//   return (
//     <>
//       <Line points={[[-100, 0, 0], [100, 0, 0]]} color="red" lineWidth={2} />
//       <Line points={[[0, -100, 0], [0, 100, 0]]} color="green" lineWidth={2} />
//       <Line points={[[0, 0, -100], [0, 0, 100]]} color="blue" lineWidth={2} />
//     </>
//   );
// }

// // SceneContent Component
// function SceneContent({ isSolid, isWireframe, cameraPosition, cameraLookAt, showGrid, isPerspective, defaultPosition, selectedObject }) {
//   const { camera, scene } = useThree();

//   // Highlight object by name
//   useEffect(() => {
//         if (selectedObject) {
//           const parentObject = scene.getObjectByName(selectedObject);
//           if (parentObject) {
//             camera.lookAt(parentObject.position); // Point camera to the object
//             parentObject.material = new THREE.MeshBasicMaterial({ color: 'yellow' }); // Highlight the object
//             setTimeout(() => {
//               parentObject.material = new THREE.MeshStandardMaterial(); // Remove highlight after 1s
//             }, 1000);
//           }
//         }
//       }, [selectedObject, camera, scene]);
      

//   return (
//     <>
//       <ambientLight intensity={0.5} />
//       <directionalLight position={[5, 5, 5]} intensity={1} />
//       <Vehicle isSolid={isSolid} isWireframe={isWireframe} />
//       <GizmoHelper alignment="top-right" margin={[80, 80]}>
//         <GizmoViewport />
//       </GizmoHelper>
//       {showGrid && (
//         <Grid
//           position={[0, -0.1, 0]}
//           args={[50, 50]}
//           cellSize={1}
//           infiniteGrid={false}
//           fadeDistance={20}
//           cellColor="gray"
//           sectionColor="darkgray"
//         />
//       )}
//       <AxisHelpers />
//       {isPerspective ? (
//         <PerspectiveCamera makeDefault fov={75} position={cameraPosition} near={0.1} far={1000} />
//       ) : (
//         <OrthographicCamera makeDefault position={defaultPosition} zoom={100} near={-1000} far={1000} />
//       )}
//       <OrbitControls target={cameraLookAt} />
//     </>
//   );
// }

// // Scene Component
// function Sce() {
//   const [isSolid, setIsSolid] = useState(false);
//   const [isWireframe, setIsWireframe] = useState(false);
//   const [cameraPosition, setCameraPosition] = useState([0, 2, 5]);
//   const [defaultPosition, setDefaultPosition] = useState([0, 0, 5]);
//   const [cameraLookAt, setCameraLookAt] = useState([0, 0, 0]);
//   const [showGrid, setShowGrid] = useState(true);
//   const [isPerspective, setIsPerspective] = useState(true);
//   const [selectedObject, setSelectedObject] = useState(null);

//   const sceneObjects = [
//     {
//       name: 'CubeParent',
//       level: 0,
//       children: [
//         {
//           name: 'CubeChild',
//           level: 1,
//           parent: 'CubeParent', // Reference to parent object
//           children: [],
//         },
//       ],
//     },
//   ];

//   const handleObjectClick = (objectName, parentName) => {
//     if (objectName === 'CubeChild') {
//       setSelectedObject(parentName); // Highlight parent when child is clicked
//     } else {
//       setSelectedObject(objectName);
//     }
//   };

//   return (
//     <>
//       <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1 }}>
//         <ObjectHierarchy
//           sceneObjects={sceneObjects}
//           onObjectClick={handleObjectClick}
//         />
//         <button className="styled-button" onClick={() => setIsSolid((prev) => !prev)}>Toggle Solid Mesh</button>
//         <button className="styled-button" onClick={() => setIsWireframe((prev) => !prev)}>Toggle Wireframe</button>
//         <button className="styled-button" onClick={() => setShowGrid((prev) => !prev)}>Toggle Grid</button>
//         <button className="styled-button" onClick={() => setIsPerspective((prev) => !prev)}>
//           Toggle {isPerspective ? 'Orthographic' : 'Perspective'} View
//         </button>
//       </div>

//       <Canvas style={{ background: 'black' }}>
//         <SceneContent
//           isSolid={isSolid}
//           isWireframe={isWireframe}
//           cameraPosition={cameraPosition}
//           cameraLookAt={cameraLookAt}
//           showGrid={showGrid}
//           isPerspective={isPerspective}
//           defaultPosition={defaultPosition}
//           selectedObject={selectedObject}
//         />
//       </Canvas>

//       <style jsx>{`
//         .styled-button {
//           background-color: #a881af;
//           color: white;
//           border: none;
//           padding: 10px 15px;
//           margin: 5px 0;
//           font-size: 14px;
//           border-radius: 5px;
//           cursor: pointer;
//           transition: background-color 0.3s;
//         }

//         .styled-button:hover {
//           background-color: #357ab8;
//         }
//       `}</style>
//     </>
//   );
// }

// export default Sce;


// import { GizmoHelper, GizmoViewport, OrbitControls, PerspectiveCamera, OrthographicCamera, Grid, Line } from '@react-three/drei';
// import { Canvas, useThree } from '@react-three/fiber';
// import React, { useState, useEffect } from 'react';
// import * as THREE from 'three';

// // Vehicle Component
// function Vehicle({ isSolid, isWireframe }) {
//     const Material = isSolid ? THREE.MeshStandardMaterial : THREE.MeshBasicMaterial;
  
//     return (
//       <group name="VehicleCube" position={[0, 0, 0]}>
//         <mesh name="CubeParent" position={[0, 0.5, 0]}>
//           <boxGeometry args={[3, 1, 2]} />
//           <primitive object={new Material({ wireframe: isWireframe })} />
//         </mesh>
//         <mesh name="CubeChild" position={[2, 1, 0]}>
//           <sphereGeometry args={[0.5, 32, 32]} />
//           <primitive object={new Material({ wireframe: isWireframe })} />
//         </mesh>
//       </group>
//     );
//   }
//   function Sphere({ isSolid, isWireframe }) {
//     const Material = isSolid ? THREE.MeshStandardMaterial : THREE.MeshBasicMaterial;
  
//     return (
//       <mesh name="Sphere" position={[0, 1, 0]}>
//         <sphereGeometry args={[1, 32, 32]} />
//         <primitive object={new Material({ wireframe: isWireframe })} />
//       </mesh>
//     );
//   }
    
// // Hierarchy Component
// function ObjectHierarchy({ sceneObjects, onObjectClick }) {
//   const [expanded, setExpanded] = useState({}); // Manage expanded state for parent objects

//   const toggleExpand = (objectName) => {
//     setExpanded((prev) => ({
//       ...prev,
//       [objectName]: !prev[objectName],
//     }));
//   };

//   const renderHierarchy = (objects) =>
//     objects.map((obj) => (
//       <div key={obj.name} style={{ marginLeft: obj.level * 10 }}>
//         <div
//           style={{ cursor: 'pointer', color: 'white', margin: '5px 0' }}
//           onClick={() => {
//             if (obj.children?.length) toggleExpand(obj.name);
//             onObjectClick(obj.name, obj.parent);
//           }}
//         >
//           {obj.children?.length ? (expanded[obj.name] ? '▼ ' : '▶ ') : '• '}
//           {obj.name}
//         </div>
//         {expanded[obj.name] && obj.children?.length > 0 && renderHierarchy(obj.children)}
//       </div>
//     ));

//   return <div>{renderHierarchy(sceneObjects)}</div>;
// }

// // Axis Helper
// function AxisHelpers() {
//   return (
//     <>
//       <Line points={[[-100, 0, 0], [100, 0, 0]]} color="red" lineWidth={2} />
//       <Line points={[[0, -100, 0], [0, 100, 0]]} color="green" lineWidth={2} />
//       <Line points={[[0, 0, -100], [0, 0, 100]]} color="blue" lineWidth={2} />
//     </>
//   );
// }

// // SceneContent Component
// function SceneContent({ isSolid, isWireframe, cameraPosition, cameraLookAt, showGrid, isPerspective, defaultPosition, selectedObject }) {
//   const { camera, scene } = useThree();

//   // Highlight object by name
//   useEffect(() => {
//     if (selectedObject) {
//       const object = scene.getObjectByName(selectedObject);
//       if (object) {
//         camera.lookAt(object.position); // Point camera to the object
//         object.material = new THREE.MeshBasicMaterial({ color: 'yellow' }); // Highlight the object
//         setTimeout(() => {
//           object.material = isSolid ? new THREE.MeshBasicMaterial() : new THREE.MeshStandardMaterial();
//         }, 1000);
//       }
//     }
//   }, [selectedObject, camera, scene, isSolid]);

//   return (
//     <>
//       <ambientLight intensity={0.5} />
//       <directionalLight position={[5, 5, 5]} intensity={1} />
//       <Vehicle isSolid={isSolid} isWireframe={isWireframe} />
//       <GizmoHelper alignment="top-right" margin={[80, 80]}>
//         <GizmoViewport />
//       </GizmoHelper>
//       {showGrid && (
//         <Grid
//           position={[0, -0.1, 0]}
//           args={[50, 50]}
//           cellSize={1}
//           infiniteGrid={false}
//           fadeDistance={20}
//           cellColor="gray"
//           sectionColor="darkgray"
//         />
//       )}
//       <AxisHelpers />
//       {isPerspective ? (
//         <PerspectiveCamera makeDefault fov={75} position={cameraPosition} near={0.1} far={1000} />
//       ) : (
//         <OrthographicCamera makeDefault position={defaultPosition} zoom={100} near={-1000} far={1000} />
//       )}
//       <OrbitControls target={cameraLookAt} />
//     </>
//   );
// }

// // Scene Component
// function Scene() {
//   const [isSolid, setIsSolid] = useState(false);
//   const [isWireframe, setIsWireframe] = useState(false);
//   const [cameraPosition, setCameraPosition] = useState([0, 2, 5]);
//   const [defaultPosition, setDefaultPosition] = useState([0, 0, 5]);
//   const [cameraLookAt, setCameraLookAt] = useState([0, 0, 0]);
//   const [showGrid, setShowGrid] = useState(true);
//   const [isPerspective, setIsPerspective] = useState(true);
//   const [selectedObject, setSelectedObject] = useState(null);

//   const sceneObjects = [
//     {
//       name: 'CubeParent',
//       level: 0,
//       children: [
//         {
//           name: 'CubeChild',
//           level: 1,
//           parent: 'CubeParent', // Reference to parent object
//           children: [],
//         },
//       ],
//     },
//   ];

//   const handleObjectClick = (objectName, parentName) => {
//     setSelectedObject(objectName);
//   };

//   return (
//     <>
//       <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1 }}>
//         <ObjectHierarchy sceneObjects={sceneObjects} onObjectClick={handleObjectClick} />
//         <button className="styled-button" onClick={() => setIsSolid((prev) => !prev)}>Toggle Solid Mesh</button>
//         <button className="styled-button" onClick={() => setIsWireframe((prev) => !prev)}>Toggle Wireframe</button>
//         <button className="styled-button" onClick={() => setShowGrid((prev) => !prev)}>Toggle Grid</button>
//         <button className="styled-button" onClick={() => setIsPerspective((prev) => !prev)}>
//           Toggle {isPerspective ? 'Orthographic' : 'Perspective'} View
//         </button>
//       </div>

//       <Canvas style={{ background: 'black' }}>
//         <SceneContent
//           isSolid={isSolid}
//           isWireframe={isWireframe}
//           cameraPosition={cameraPosition}
//           cameraLookAt={cameraLookAt}
//           showGrid={showGrid}
//           isPerspective={isPerspective}
//           defaultPosition={defaultPosition}
//           selectedObject={selectedObject}
//         />
//       </Canvas>

//       <style jsx>{`
//         .styled-button {
//           background-color: #a881af;
//           color: white;
//           border: none;
//           padding: 10px 15px;
//           margin: 5px 0;
//           font-size: 14px;
//           border-radius: 5px;
//           cursor: pointer;
//           transition: background-color 0.3s;
//         }

//         .styled-button:hover {
//           background-color: #357ab8;
//         }
//       `}</style>
//     </>
//   );
// }

// export default Scene;



// import { GizmoHelper, GizmoViewport, OrbitControls, PerspectiveCamera, OrthographicCamera, Grid, Line } from '@react-three/drei';
// import { Canvas, useThree } from '@react-three/fiber';
// import React, { useState, useEffect } from 'react';
// import * as THREE from 'three';

// // Vehicle Component
// function Vehicle({ isSolid, isWireframe, selectedObject, onObjectClick }) {
//   const Material = isSolid ? THREE.MeshStandardMaterial : THREE.MeshBasicMaterial;

//   const handleClick = (objectName) => {
//     onObjectClick(objectName);
//   };

//   return (
//     <group name="VehicleCube" position={[0, 0, 0]}>
//       <mesh
//         name="CubeParent"
//         position={[0, 0.5, 0]}
//         onClick={() => handleClick('CubeParent')}
//         material={selectedObject === 'CubeParent' ? new THREE.MeshBasicMaterial({ color: 'yellow' }) : new Material({ wireframe: isWireframe })}
//       >
//         <boxGeometry args={[3, 1, 2]} />
//       </mesh>
//       <mesh
//         name="Sphere"
//         position={[2, 1, 0]}
//         onClick={() => handleClick('Sphere')}
//         material={selectedObject === 'Sphere' ? new THREE.MeshBasicMaterial({ color: 'yellow' }) : new Material({ wireframe: isWireframe })}
//       >
//         <sphereGeometry args={[0.5, 32, 32]} />
//       </mesh>
//     </group>
//   );
// }

// // Hierarchy Component
// function ObjectHierarchy({ sceneObjects, onObjectClick }) {
//   const [expanded, setExpanded] = useState({}); // Manage expanded state for parent objects

//   const toggleExpand = (objectName) => {
//     setExpanded((prev) => ({
//       ...prev,
//       [objectName]: !prev[objectName],
//     }));
//   };

//   const renderHierarchy = (objects) =>
//     objects.map((obj) => (
//       <div key={obj.name} style={{ marginLeft: obj.level * 10 }}>
//         <div
//           style={{ cursor: 'pointer', color: 'white', margin: '5px 0' }}
//           onClick={() => {
//             if (obj.children?.length) toggleExpand(obj.name);
//             onObjectClick(obj.name);
//           }}
//         >
//           {obj.children?.length ? (expanded[obj.name] ? '▼ ' : '▶ ') : '• '}
//           {obj.name}
//         </div>
//         {expanded[obj.name] && obj.children?.length > 0 && renderHierarchy(obj.children)}
//       </div>
//     ));

//   return <div>{renderHierarchy(sceneObjects)}</div>;
// }

// // Axis Helper
// function AxisHelpers() {
//   return (
//     <>
//       <Line points={[[-100, 0, 0], [100, 0, 0]]} color="red" lineWidth={2} />
//       <Line points={[[0, -100, 0], [0, 100, 0]]} color="green" lineWidth={2} />
//       <Line points={[[0, 0, -100], [0, 0, 100]]} color="blue" lineWidth={2} />
//     </>
//   );
// }

// // SceneContent Component
// function SceneContent({ isSolid, isWireframe, cameraPosition, cameraLookAt, showGrid, isPerspective, defaultPosition, selectedObject, onObjectClick }) {
//   const { camera, scene } = useThree();

//   // Highlight object by name
//   useEffect(() => {
//     if (selectedObject) {
//       const object = scene.getObjectByName(selectedObject);
//       if (object) {
//         camera.lookAt(object.position); // Point camera to the object
//         object.material = new THREE.MeshBasicMaterial({ color: 'yellow' }); // Highlight the object
//         setTimeout(() => {
//           object.material = isSolid ? new THREE.MeshBasicMaterial() : new THREE.MeshStandardMaterial();
//         }, 1000);
//       }
//     }
//   }, [selectedObject, camera, scene, isSolid]);

//   return (
//     <>
//       <ambientLight intensity={0.5} />
//       <directionalLight position={[5, 5, 5]} intensity={1} />
//       <Vehicle isSolid={isSolid} isWireframe={isWireframe} selectedObject={selectedObject} onObjectClick={onObjectClick} />
//       <GizmoHelper alignment="top-right" margin={[80, 80]}>
//         <GizmoViewport />
//       </GizmoHelper>
//       {showGrid && (
//         <Grid
//           position={[0, -0.1, 0]}
//           args={[50, 50]}
//           cellSize={1}
//           infiniteGrid={false}
//           fadeDistance={20}
//           cellColor="gray"
//           sectionColor="darkgray"
//         />
//       )}
//       <AxisHelpers />
//       {isPerspective ? (
//         <PerspectiveCamera makeDefault fov={75} position={cameraPosition} near={0.1} far={1000} />
//       ) : (
//         <OrthographicCamera makeDefault position={defaultPosition} zoom={100} near={-1000} far={1000} />
//       )}
//       <OrbitControls target={cameraLookAt} />
//     </>
//   );
// }

// // Scene Component
// function Scene() {
//   const [isSolid, setIsSolid] = useState(false);
//   const [isWireframe, setIsWireframe] = useState(false);
//   const [cameraPosition, setCameraPosition] = useState([0, 2, 5]);
//   const [defaultPosition, setDefaultPosition] = useState([0, 0, 5]);
//   const [cameraLookAt, setCameraLookAt] = useState([0, 0, 0]);
//   const [showGrid, setShowGrid] = useState(true);
//   const [isPerspective, setIsPerspective] = useState(true);
//   const [selectedObject, setSelectedObject] = useState(null);

//   const sceneObjects = [
//     {
//       name: 'Vehicle',
//       level: 0,
//       children: [
//         {
//           name: 'CubeParent',
//           level: 1,
//           parent: 'Vehicle',
//           children: [],
//         },
//         {
//           name: 'Sphere',
//           level: 1,
//           parent: 'Vehicle',
//           children: [],
//         },
//       ],
//     },
//   ];

//   const handleObjectClick = (objectName) => {
//     setSelectedObject(objectName);
//   };

//   return (
//     <>
//       <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1 }}>
//         <ObjectHierarchy sceneObjects={sceneObjects} onObjectClick={handleObjectClick} />
//         <button className="styled-button" onClick={() => setIsSolid((prev) => !prev)}>Toggle Solid Mesh</button>
//         <button className="styled-button" onClick={() => setIsWireframe((prev) => !prev)}>Toggle Wireframe</button>
//         <button className="styled-button" onClick={() => setShowGrid((prev) => !prev)}>Toggle Grid</button>
//         <button className="styled-button" onClick={() => setIsPerspective((prev) => !prev)}>
//           Toggle {isPerspective ? 'Orthographic' : 'Perspective'} View
//         </button>
//       </div>

//       <Canvas style={{ background: 'black' }}>
//         <SceneContent
//           isSolid={isSolid}
//           isWireframe={isWireframe}
//           cameraPosition={cameraPosition}
//           cameraLookAt={cameraLookAt}
//           showGrid={showGrid}
//           isPerspective={isPerspective}
//           defaultPosition={defaultPosition}
//           selectedObject={selectedObject}
//           onObjectClick={handleObjectClick}
//         />
//       </Canvas>

//       <style jsx>{`
//         .styled-button {
//           background-color: #a881af;
//           color: white;
//           border: none;
//           padding: 10px 15px;
//           margin: 5px 0;
//           font-size: 14px;
//           border-radius: 5px;
//           cursor: pointer;
//           transition: background-color 0.3s;
//         }

//         .styled-button:hover {
//           background-color: #357ab8;
//         }
//       `}</style>
//     </>
//   );
// }

// export default Scene;


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
