// import { GizmoHelper, GizmoViewport, OrbitControls,PerspectiveCamera } from '@react-three/drei'
// import { Canvas } from '@react-three/fiber'
// import React, { useRef, useEffect } from 'react'
// function Vehicle() {
//     return (
//       <group position={[0, 0, 0]}>
//         {/* Vehicle Mesh */}
//         <mesh position={[0, 0.5, 0]}>
//           <boxGeometry args={[3, 1, 2]} />
//           <meshStandardMaterial color="blue" />
//         </mesh>
  
//         {/* Character Mesh Inside Vehicle */}
//         <mesh position={[0, 1, 0]}>
//           <boxGeometry args={[0.5, 1, 0.5]} />
//           <meshStandardMaterial color="orange" />
//         </mesh>
//       </group>
//     )
//   }
  

// function Scene() {
//   return (
//     <Canvas>
//       {/* Ambient light and directional light */}
//       <ambientLight intensity={0.5} />
//       <directionalLight position={[5, 5, 5]} intensity={1} />

//       {/* Vehicle with Character Mesh Hierarchy */}
//       <Vehicle />

//       {/* Wireframe on a separate object */}
//       <mesh position={[3, 1, 0]}>
//         <boxGeometry args={[1, 1, 1]} />
//         <meshStandardMaterial color="green" wireframe />
//       </mesh>

//       {/* Gizmo for transforming and orienting */}
//       <GizmoHelper alignment="top-right" margin={[80, 80]}>
//         <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" />
//       </GizmoHelper>

//       {/* OrbitControls for camera movement */}
//       {/* <OrbitControls /> */}
//       <CameraSetup />
//     </Canvas>
//   )
// }
// function CameraSetup() {
//     return (
//       <>
//         {/* Perspective Camera with specific parameters */}
//         <PerspectiveCamera
//           makeDefault
//           fov={75}
//           position={[0, 2, 5]}
//           near={0.1}
//           far={1000}
//         />
//         <OrbitControls />
//       </>
//     )
//   }

// // Scene.js




// function Cube() {
//   const meshRef = useRef()

//   // Rotate the cube
// //   useEffect(() => {
// //     const animate = () => {
// //       meshRef.current.rotation.x += 0.01
// //       meshRef.current.rotation.y += 0.01
// //       requestAnimationFrame(animate)
// //     }
// //     animate()
// //   }, [])

//   return (
//     <mesh ref={meshRef}>
//       <boxGeometry args={[1, 1, 1]} />
//       <meshStandardMaterial color="orange" />
//     </mesh>
//   )
// }

// export default Scene




// import { Canvas } from '@react-three/fiber';
// import { GizmoHelper, GizmoViewport, OrbitControls, PerspectiveCamera } from '@react-three/drei';
// import React, { useState, useRef, useEffect } from 'react';

// function Vehicle({ onSelect }) {
//   return (
//     <group position={[0, 0, 0]} onClick={onSelect}>
//       {/* Vehicle Mesh */}
//       <mesh position={[0, 0.5, 0]}>
//         <boxGeometry args={[3, 1, 2]} />
//         <meshStandardMaterial color="blue" />
//       </mesh>

//       {/* Character Mesh Inside Vehicle */}
//       <mesh position={[0, 1, 0]} onClick={onSelect}>
//         <boxGeometry args={[0.5, 1, 0.5]} />
//         <meshStandardMaterial color="orange" />
//       </mesh>
//     </group>
//   );
// }

// function Scene() {
//   const [selectedObject, setSelectedObject] = useState(null);
//   const [isMoving, setIsMoving] = useState(false);
//   const canvasRef = useRef();

//   const handleSelect = (event) => {
//     event.stopPropagation();
//     setSelectedObject(event.object);
//   };

//   const handleMouseMove = (event) => {
//     if (!isMoving || !selectedObject) return;

//     const rect = canvasRef.current.getBoundingClientRect();
//     const mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
//     const mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;

//     // Convert mouse position to 3D world position
//     const newPosition = [mouseX * 5, selectedObject.position.y, mouseY * 5]; // Adjust scaling as needed
//     selectedObject.position.set(...newPosition);
//   };

//   const toggleMoveMode = () => {
//     setIsMoving((prev) => !prev);
//   };

//   useEffect(() => {
//     const canvas = canvasRef.current;

//     const handleMouseUp = () => {
//       setIsMoving(false); // Stop moving when mouse is released
//     };

//     // Add mouse move listener
//     if (canvas) {
//       canvas.addEventListener('mousemove', handleMouseMove);
//       canvas.addEventListener('mouseup', handleMouseUp);
//     }

//     return () => {
//       if (canvas) {
//         canvas.removeEventListener('mousemove', handleMouseMove);
//         canvas.removeEventListener('mouseup', handleMouseUp);
//       }
//     };
//   }, [isMoving, selectedObject]);

//   return (
//     <>
//       <button onClick={toggleMoveMode} style={{ position: 'absolute', top: '10px', left: '10px' }}>
//         {isMoving ? 'Stop Moving' : 'Move'}
//       </button>
//       <Canvas ref={canvasRef} style={{ height: '100vh' }}>
//         {/* Ambient light and directional light */}
//         <ambientLight intensity={0.5} />
//         <directionalLight position={[5, 5, 5]} intensity={1} />

//         {/* Vehicle with Character Mesh Hierarchy */}
//         <Vehicle onSelect={handleSelect} />

//         {/* Wireframe on a separate object */}
//         <mesh position={[3, 1, 0]}>
//           <boxGeometry args={[1, 1, 1]} />
//           <meshStandardMaterial color="green" wireframe />
//         </mesh>

//         {/* Perspective Camera with specific parameters */}
//         <PerspectiveCamera
//           makeDefault
//           fov={75}
//           position={[0, 2, 5]}
//           near={0.1}
//           far={1000}
//         />
//         <OrbitControls />

//         {/* Gizmo for transforming and orienting, always visible on the right */}
//         <GizmoHelper alignment="top-right" margin={[80, 80]}>
//           <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" />
//         </GizmoHelper>
//       </Canvas>
//     </>
//   );
// }

// export default Scene;

// import { Canvas } from '@react-three/fiber';
// import { GizmoHelper, GizmoViewport, OrbitControls, PerspectiveCamera } from '@react-three/drei';
// import React, { useState, useRef, useEffect } from 'react';

// function Vehicle({ onSelect }) {
//   return (
//     <group position={[0, 0, 0]} onClick={onSelect}>
//       {/* Vehicle Mesh */}
//       <mesh position={[0, 0.5, 0]}>
//         <boxGeometry args={[3, 1, 2]} />
//         <meshStandardMaterial color="blue" />
//       </mesh>

//       {/* Character Mesh Inside Vehicle */}
//       <mesh position={[0, 1, 0]} onClick={onSelect}>
//         <boxGeometry args={[0.5, 1, 0.5]} />
//         <meshStandardMaterial color="orange" />
//       </mesh>
//     </group>
//   );
// }

// function Scene() {
//   const [selectedObject, setSelectedObject] = useState(null);
//   const [actionMode, setActionMode] = useState('move'); // 'move', 'rotate', 'scale'
//   const canvasRef = useRef();

//   const handleSelect = (event) => {
//     event.stopPropagation();
//     setSelectedObject(event.object);
//   };

//   const handleMouseMove = (event) => {
//     if (!selectedObject) return;

//     const rect = canvasRef.current.getBoundingClientRect();
//     const mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
//     const mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;

//     // Convert mouse position to 3D world position
//     const newPosition = [mouseX * 5, selectedObject.position.y, mouseY * 5]; // Adjust scaling as needed

//     if (actionMode === 'move') {
//       selectedObject.position.set(...newPosition);
//     } else if (actionMode === 'rotate') {
//       selectedObject.rotation.y += 0.01; // Rotate around Y-axis for simplicity
//     } else if (actionMode === 'scale') {
//       selectedObject.scale.set(1.5, 1.5, 1.5); // Scale up by 1.5 times
//     }
//   };

//   const toggleActionMode = (mode) => {
//     setActionMode(mode);
//   };

//   useEffect(() => {
//     const canvas = canvasRef.current;

//     const handleMouseUp = () => {
//       // Optionally handle mouse up if needed
//     };

//     // Add mouse move listener
//     if (canvas) {
//       canvas.addEventListener('mousemove', handleMouseMove);
//       canvas.addEventListener('mouseup', handleMouseUp);
//     }

//     return () => {
//       if (canvas) {
//         canvas.removeEventListener('mousemove', handleMouseMove);
//         canvas.removeEventListener('mouseup', handleMouseUp);
//       }
//     };
//   }, [selectedObject, actionMode]);

//   return (
//     <>
//       <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
//         <button onClick={() => toggleActionMode('move')}>Move</button>
//         <button onClick={() => toggleActionMode('rotate')}>Rotate</button>
//         <button onClick={() => toggleActionMode('scale')}>Scale</button>
//         <button onClick={() => toggleActionMode('transform')}>Transform</button>
//       </div>
//       <Canvas ref={canvasRef} style={{ height: '100vh' }}>
//         {/* Ambient light and directional light */}
//         <ambientLight intensity={0.5} />
//         <directionalLight position={[5, 5, 5]} intensity={1} />

//         {/* Vehicle with Character Mesh Hierarchy */}
//         <Vehicle onSelect={handleSelect} />

//         {/* Wireframe on a separate object */}
//         <mesh position={[3, 1, 0]}>
//           <boxGeometry args={[1, 1, 1]} />
//           <meshStandardMaterial color="green" wireframe />
//         </mesh>

//         {/* Perspective Camera with specific parameters */}
//         <PerspectiveCamera
//           makeDefault
//           fov={75}
//           position={[0, 2, 5]}
//           near={0.1}
//           far={1000}
//         />
//         <OrbitControls />

//         {/* Gizmo for transforming and orienting, always visible on the right */}
//         <GizmoHelper alignment="top-right" margin={[80, 80]}>
//           <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" />
//         </GizmoHelper>
//       </Canvas>
//     </>
//   );
// }

// export default Scene;


// import { Canvas, useFrame } from '@react-three/fiber';
// import { GizmoHelper, GizmoViewport, OrbitControls, PerspectiveCamera, TransformControls } from '@react-three/drei';
// import React, { useState, useRef, useEffect } from 'react';
// import { Euler } from 'three';

// function Vehicle({ onSelect }) {
//   return (
//     <group position={[0, 0, 0]} onClick={onSelect}>
//       {/* Vehicle Mesh */}
//       <mesh position={[0, 0.5, 0]}>
//         <boxGeometry args={[3, 1, 2]} />
//         <meshStandardMaterial color="blue" />
//       </mesh>

//       {/* Character Mesh Inside Vehicle */}
//       <mesh position={[0, 1, 0]} onClick={onSelect}>
//         <boxGeometry args={[0.5, 1, 0.5]} />
//         <meshStandardMaterial color="orange" />
//       </mesh>
//     </group>
//   );
// }

// function Scene() {
//   const [selectedObject, setSelectedObject] = useState(null);
//   const [actionMode, setActionMode] = useState('move'); // 'move', 'rotate', 'scale'
//   const gizmoRef = useRef();
//   const [isRotatingGizmo, setIsRotatingGizmo] = useState(false); // Track if the gizmo is being rotated
//   const [rotation, setRotation] = useState([0, 0, 0]); // Track the gizmo's rotation
//   const canvasRef = useRef();

//   const handleSelect = (event) => {
//     event.stopPropagation();
//     setSelectedObject(event.object); // Select the object on click
//   };

//   const handleMouseDown = (event) => {
//     // Check if we clicked inside the gizmo area
//     if (event.target === canvasRef.current) {
//       setIsRotatingGizmo(true);
//     }
//   };

//   const handleMouseUp = () => {
//     setIsRotatingGizmo(false); // Stop rotating the gizmo on mouse up
//   };

//   const handleMouseMove = (event) => {
//     if (isRotatingGizmo) {
//       const rect = canvasRef.current.getBoundingClientRect();
//       const mouseX = (event.clientX - rect.left) / rect.width;
//       const mouseY = (event.clientY - rect.top) / rect.height;

//       // Apply rotation to the gizmo based on mouse movement
//       const rotationX = (mouseY - 0.91) * Math.PI; // Convert to radians
//       const rotationY = (mouseX - 0.91) * Math.PI;

//       setRotation([rotationX, rotationY, 0]);
//     }
//   };

//   useEffect(() => {
//     const canvas = canvasRef.current;

//     if (canvas) {
//       canvas.addEventListener('mousedown', handleMouseDown);
//       canvas.addEventListener('mouseup', handleMouseUp);
//       canvas.addEventListener('mousemove', handleMouseMove);
//     }

//     return () => {
//       if (canvas) {
//         canvas.removeEventListener('mousedown', handleMouseDown);
//         canvas.removeEventListener('mouseup', handleMouseUp);
//         canvas.removeEventListener('mousemove', handleMouseMove);
//       }
//     };
//   }, [isRotatingGizmo]);

//   const toggleActionMode = (mode) => {
//     setActionMode(mode);
//   };

//   return (
//     <>
//       <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
//         <button onClick={() => toggleActionMode('move')}>Move</button>
//         <button onClick={() => toggleActionMode('rotate')}>Rotate</button>
//         <button onClick={() => toggleActionMode('scale')}>Scale</button>
//       </div>
//       <Canvas ref={canvasRef} style={{ height: '100vh' }}>
//         <ambientLight intensity={0.5} />
//         <directionalLight position={[5, 5, 5]} intensity={1} />

//         <Vehicle onSelect={handleSelect} />

//         <mesh position={[3, 1, 0]}>
//           <boxGeometry args={[1, 1, 1]} />
//           <meshStandardMaterial color="green" wireframe />
//           <meshPhongMaterial  wireframe/>
//         </mesh>

//         <PerspectiveCamera makeDefault fov={75} position={[0, 2, 5]} near={0.1} far={1000} />
//         <OrbitControls />

//         {/* Gizmo for Move/Rotate/Scale */}
//         {selectedObject && (
//           <TransformControls
//             object={selectedObject}
//             mode={actionMode} // 'translate', 'rotate', or 'scale'
//           />
//         )}

//         {/* Gizmo Helper with custom rotation */}
//         <GizmoHelper alignment="top-right" margin={[80, 80]}>
//           <group ref={gizmoRef} rotation={new Euler(...rotation)}>
//             <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" />
//           </group>
//         </GizmoHelper>
        
//         <gridHelper args={[20, 20, 0xff22aa, 0x55ccff]} />
//   <OrbitControls />
//       </Canvas>
//     </>
//   );
// }

// export default Scene;




// import { GizmoHelper, GizmoViewport, OrbitControls,PerspectiveCamera } from '@react-three/drei'
// import { Canvas } from '@react-three/fiber'
// import React, { useRef, useEffect } from 'react'
// function Vehicle() {
//     return (
//       <group position={[0, 0, 0]}>
//         {/* Vehicle Mesh */}
//         <mesh position={[0, 0.5, 0]}>
//           <boxGeometry args={[3, 1, 2]} />
//           <meshStandardMaterial/>
//         </mesh>
  
//         {/* Character Mesh Inside Vehicle */}
      
       
//       </group>
//     )
//   }
  

// function Scene() {
//   return (
//     <Canvas>
//       {/* Ambient light and directional light */}
//       <ambientLight intensity={0.5} />
//       <directionalLight position={[5, 5, 5]} intensity={1} />

//       {/* Vehicle with Character Mesh Hierarchy */}
//       <Vehicle />

//       {/* Wireframe on a separate object */}
//       <mesh position={[3, 1, 0]}>
//         <boxGeometry args={[1, 1, 1]} />
//         <meshStandardMaterial color="green" wireframe />
//       </mesh>

//       {/* Gizmo for transforming and orienting */}
//       <GizmoHelper alignment="top-right" margin={[80, 80]}>
//         <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" />
//       </GizmoHelper>
//       <gridHelper args={[20, 20, 0xff22aa, 0x55ccff]} />
//       {/* OrbitControls for camera movement */}
//       {/* <OrbitControls /> */}
//       <CameraSetup />
//     </Canvas>
//   )
// }
// function CameraSetup() {
//     return (
//       <>
//         {/* Perspective Camera with specific parameters */}
//         <PerspectiveCamera
//           makeDefault
//           fov={75}
//           position={[0, 2, 5]}
//           near={0.1}
//           far={1000}
//         />
//         <OrbitControls />
//       </>
//     )
//   }


// export default Scene



// this toggles mesh

// import { GizmoHelper, GizmoViewport, OrbitControls, PerspectiveCamera } from '@react-three/drei'
// import { Canvas } from '@react-three/fiber'
// import React, { useRef, useState } from 'react'

// function Vehicle({ isSolid }) {
//     return (
//       <group position={[0, 0, 0]}>
//         {/* Vehicle Mesh */}
//         <mesh position={[0, 0.5, 0]}>
//           <boxGeometry args={[3, 1, 2]} />
//           {isSolid ? (
//             <meshBasicMaterial />
//           ) : (
//             <meshStandardMaterial  />
//           )}
//         </mesh>
//       </group>
//     )
// }

// function Scene() {
//   const [isSolid, setIsSolid] = useState(false)

//   return (
//     <>
//       {/* Button to toggle material */}
//       <button
//         style={{
//           position: 'absolute',
//           top: '20px',
//           left: '20px',
//           padding: '10px',
//           zIndex: 1
//         }}
//         onClick={() => setIsSolid(!isSolid)}
//       >
//         Toggle Solid Mesh
//       </button>

//       <Canvas>
//         {/* Ambient light and directional light */}
//         <ambientLight intensity={0.5} />
//         <directionalLight position={[5, 5, 5]} intensity={1} />

//         {/* Vehicle with Character Mesh Hierarchy */}
//         <Vehicle isSolid={isSolid} />

//         {/* Wireframe on a separate object */}
//         <mesh position={[3, 1, 0]}>
//           <boxGeometry args={[1, 1, 1]} />
//           <meshStandardMaterial color="green" wireframe />
//         </mesh>

//         {/* Gizmo for transforming and orienting */}
//         <GizmoHelper alignment="top-right" margin={[80, 80]}>
//           <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" />
//         </GizmoHelper>
//         <gridHelper args={[20, 20, 0xff22aa, 0x55ccff]} />

//         {/* OrbitControls for camera movement */}
//         <CameraSetup />
//       </Canvas>
//     </>
//   )
// }

// function CameraSetup() {
//   return (
//     <>
//       {/* Perspective Camera with specific parameters */}
//       <PerspectiveCamera
//         makeDefault
//         fov={75}
//         position={[0, 2, 5]}
//         near={0.1}
//         far={1000}
//       />
//       <OrbitControls />
//     </>
//   )
// }

// export default Scene


// import { GizmoHelper, GizmoViewport, OrbitControls, PerspectiveCamera } from '@react-three/drei'
// import { Canvas } from '@react-three/fiber'
// import React, { useState } from 'react'

// function Vehicle({ isSolid, isWireframe }) {
//     return (
//       <group position={[0, 0, 0]}>
//         {/* Vehicle Mesh */}
//         <mesh position={[0, 0.5, 0]}>
//           <boxGeometry args={[3, 1, 2]} />
//           {isSolid ? (
//             <meshBasicMaterial  wireframe={isWireframe} />
//           ) : (
//             <meshStandardMaterial wireframe={isWireframe} />
//           )}
//         </mesh>
//       </group>
//     )
// }

// function Scene() {
//   const [isSolid, setIsSolid] = useState(false)
//   const [isWireframe, setIsWireframe] = useState(false)

//   // Function to toggle material between solid and standard
//   const toggleMaterial = () => {
//     setIsSolid(prevState => !prevState)
//   }

//   // Function to toggle wireframe mode
//   const toggleWireframe = () => {
//     setIsWireframe(prevState => !prevState)
//   }

//   return (
//     <>
//       {/* Button to toggle material */}
//       <button
//         style={{
//           position: 'absolute',
//           top: '20px',
//           left: '20px',
//           padding: '10px',
//           zIndex: 1
//         }}
//         onClick={toggleMaterial}
//       >
//         Toggle Solid Mesh
//       </button>

//       {/* Button to toggle wireframe mode */}
//       <button
//         style={{
//           position: 'absolute',
//           top: '20px',
//           left: '150px',
//           padding: '10px',
//           zIndex: 1
//         }}
//         onClick={toggleWireframe}
//       >
//         Toggle Wireframe
//       </button>

//       <Canvas>
//         {/* Ambient light and directional light */}
//         <ambientLight intensity={0.5} />
//         <directionalLight position={[5, 5, 5]} intensity={1} />

//         {/* Vehicle with Character Mesh Hierarchy */}
//         <Vehicle isSolid={isSolid} isWireframe={isWireframe} />

//         {/* Wireframe on a separate object */}
//         {/* <mesh position={[3, 1, 0]}>
//           <boxGeometry args={[1, 1, 1]} />
//           <meshStandardMaterial wireframe={isWireframe} />
//         </mesh> */}

//         {/* Gizmo for transforming and orienting */}
//         <GizmoHelper alignment="top-right" margin={[80, 80]}>
//           {/* <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" /> */}
//           <GizmoViewport/>
//         </GizmoHelper>
//         <gridHelper args={[10, 20,0xff22aa, 0x55ccff]} />

//         {/* OrbitControls for camera movement */}
//         <CameraSetup />
//       </Canvas>
//     </>
//   )
// }

// function CameraSetup() {
//   return (
//     <>
//       {/* Perspective Camera with specific parameters */}
//       <PerspectiveCamera
//         makeDefault
//         fov={75}
//         position={[0, 2, 5]}
//         near={0.1}
//         far={1000}
//       />
//       <OrbitControls />
//     </>
//   )
// }

// export default Scene



// import { GizmoHelper, GizmoViewport, OrbitControls, PerspectiveCamera } from '@react-three/drei'
// import { Canvas } from '@react-three/fiber'
// import React, { useState } from 'react'

// function Vehicle({ isSolid, isWireframe }) {
//     return (
//       <group position={[0, 0, 0]}>
//         {/* Vehicle Mesh */}
//         <mesh position={[0, 0.5, 0]}>
//           <boxGeometry args={[3, 1, 2]} />
//           {isSolid ? (
//             <meshBasicMaterial wireframe={isWireframe} />
//           ) : (
//             <meshStandardMaterial wireframe={isWireframe} />
//           )}
//         </mesh>

//         {/* Sphere Mesh */}
//         <mesh position={[2, 1, 0]}>
//           <sphereGeometry args={[0.5, 32, 32]} />
//           {isSolid ? (
//             <meshBasicMaterial wireframe={isWireframe} />
//           ) : (
//             <meshStandardMaterial wireframe={isWireframe} />
//           )}
//         </mesh>
//       </group>
//     )
// }

// function Scene() {
//   const [isSolid, setIsSolid] = useState(false)
//   const [isWireframe, setIsWireframe] = useState(false)

//   // Function to toggle material between solid and standard
//   const toggleMaterial = () => {
//     setIsSolid(prevState => !prevState)
//   }

//   // Function to toggle wireframe mode
//   const toggleWireframe = () => {
//     setIsWireframe(prevState => !prevState)
//   }

//   return (
//     <>
//       {/* Button to toggle material */}
//       <button
//         style={{
//           position: 'absolute',
//           top: '20px',
//           left: '20px',
//           padding: '10px',
//           zIndex: 1
//         }}
//         onClick={toggleMaterial}
//       >
//         Toggle Solid Mesh
//       </button>

//       {/* Button to toggle wireframe mode */}
//       <button
//         style={{
//           position: 'absolute',
//           top: '20px',
//           left: '150px',
//           padding: '10px',
//           zIndex: 1
//         }}
//         onClick={toggleWireframe}
//       >
//         Toggle Wireframe
//       </button>

//       <Canvas>
//         {/* Ambient light and directional light */}
//         <ambientLight intensity={0.5} />
//         <directionalLight position={[5, 5, 5]} intensity={1} />

//         {/* Vehicle with Character Mesh Hierarchy */}
//         <Vehicle isSolid={isSolid} isWireframe={isWireframe} />

//         {/* Gizmo for transforming and orienting */}
//         <GizmoHelper alignment="top-right" margin={[80, 80]}>
//           <GizmoViewport/>
//         </GizmoHelper>
//         <gridHelper args={[10, 20, 0xff22aa, 0x55ccff]} />

//         {/* OrbitControls for camera movement */}
//         <CameraSetup />
//       </Canvas>
//     </>
//   )
// }

// function CameraSetup() {
//   return (
//     <>
//       {/* Perspective Camera with specific parameters */}
//       <PerspectiveCamera
//         makeDefault
//         fov={75}
//         position={[0, 2, 5]}
//         near={0.1}
//         far={1000}
//       />
//       <OrbitControls />
//     </>
//   )
// }

// export default Scene



// import { GizmoHelper, GizmoViewport, OrbitControls, PerspectiveCamera } from '@react-three/drei'
// import { Canvas } from '@react-three/fiber'
// import React, { useState } from 'react'

// function Vehicle({ isSolid, isWireframe }) {
//   // Select material based on isSolid prop
//   const Material = isSolid ? 'meshBasicMaterial' : 'meshStandardMaterial';

//   return (
//     <group position={[0, 0, 0]}>
//       {/* Vehicle Mesh */}
//       <mesh position={[0, 0.5, 0]}>
//         <boxGeometry args={[3, 1, 2]} />
//         <Material wireframe={isWireframe} />
//       </mesh>

//       {/* Sphere Mesh */}
//       <mesh position={[2, 1, 0]}>
//         <sphereGeometry args={[0.5, 32, 32]} />
//         <Material wireframe={isWireframe} />
//       </mesh>
//     </group>
//   )
// }

// function Scene() {
//   const [isSolid, setIsSolid] = useState(false)
//   const [isWireframe, setIsWireframe] = useState(false)

//   // Toggle functions for material and wireframe
//   const toggleMaterial = () => setIsSolid(prev => !prev)
//   const toggleWireframe = () => setIsWireframe(prev => !prev)

//   return (
//     <>
//       {/* Button to toggle material */}
//       <button
//         style={{ position: 'absolute', top: '20px', left: '20px', padding: '10px', zIndex: 1 }}
//         onClick={toggleMaterial}
//       >
//         Toggle Solid Mesh
//       </button>

//       {/* Button to toggle wireframe mode */}
//       <button
//         style={{ position: 'absolute', top: '20px', left: '150px', padding: '10px', zIndex: 1 }}
//         onClick={toggleWireframe}
//       >
//         Toggle Wireframe
//       </button>

//       <Canvas>
//         {/* Lighting */}
//         <ambientLight intensity={0.5} />
//         <directionalLight position={[5, 5, 5]} intensity={1} />

//         {/* Vehicle component */}
//         <Vehicle isSolid={isSolid} isWireframe={isWireframe} />

//         {/* Gizmo and Grid Helper */}
//         <GizmoHelper alignment="top-right" margin={[80, 80]}>
//           <GizmoViewport />
//         </GizmoHelper>
//         <gridHelper args={[10, 20, 0xff22aa, 0x55ccff]} />

//         {/* Camera and controls */}
//         <PerspectiveCamera makeDefault fov={75} position={[0, 2, 5]} near={0.1} far={1000} />
//         <OrbitControls />
//       </Canvas>
//     </>
//   )
// }

// export default Scene


// import { GizmoHelper, GizmoViewport, OrbitControls, PerspectiveCamera } from '@react-three/drei';
// import { Canvas } from '@react-three/fiber';
// import React, { useState } from 'react';

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

// function SceneContent({ isSolid, isWireframe, cameraPosition, cameraLookAt }) {
//   return (
//     <>
//       <ambientLight intensity={0.5} />
//       <directionalLight position={[5, 5, 5]} intensity={1} />
//       <Vehicle isSolid={isSolid} isWireframe={isWireframe} />
//       <GizmoHelper alignment="top-right" margin={[80, 80]}>
//         <GizmoViewport />
//       </GizmoHelper>
//       <gridHelper args={[10, 20, 0xff22aa, 0x55ccff]} />
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

//   const toggleMaterial = () => setIsSolid((prev) => !prev);
//   const toggleWireframe = () => setIsWireframe((prev) => !prev);

//   const setViewA = () => {
//     setCameraPosition([0, 5, 10]); // Position for View A
//     setCameraLookAt([0, 0, 0]); // Look at the origin
//   };

//   const setViewB = () => {
//     setCameraPosition([4, 2, 4]); // New Position for View B
//     setCameraLookAt([0, 0, 0]); // Look at the origin
//   };

//   const setViewC = () => {
//     setCameraPosition([-4, 3, 6]); // New Position for View C
//     setCameraLookAt([0, 0, 0]); // Look at the origin
//   };

//   return (
//     <>
//       <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1 }}>
//         <button className="styled-button" onClick={toggleMaterial}>
//           Toggle Solid Mesh
//         </button>
//         <button className="styled-button" onClick={toggleWireframe}>
//           Toggle Wireframe
//         </button>
//         <button className="styled-button" onClick={setViewA}>
//           View A
//         </button>
//         <button className="styled-button" onClick={setViewB}>
//           View B
//         </button>
//         <button className="styled-button" onClick={setViewC}>
//           View C
//         </button>
//       </div>

//       <Canvas>
//         <SceneContent isSolid={isSolid} isWireframe={isWireframe} cameraPosition={cameraPosition} cameraLookAt={cameraLookAt} />
//       </Canvas>

//       <style jsx>{`
//         .styled-button {
//           background-color: #4a90e2; /* Button background color */
//           color: white; /* Button text color */
//           border: none; /* Remove border */
//           padding: 10px 15px; /* Button padding */
//           margin: 5px 0; /* Space between buttons */
//           font-size: 14px; /* Font size */
//           border-radius: 5px; /* Rounded corners */
//           cursor: pointer; /* Pointer cursor on hover */
//           transition: background-color 0.3s; /* Transition for hover effect */
//         }

//         .styled-button:hover {
//           background-color: #357ab8; /* Darker shade on hover */
//         }

//         .styled-button:focus {
//           outline: none; /* Remove outline on focus */
//         }
//       `}</style>
//     </>
//   );
// }

// export default Scene;



// import { GizmoHelper, GizmoViewport, OrbitControls, PerspectiveCamera, Grid, Line } from '@react-three/drei';
// import { Canvas } from '@react-three/fiber';
// import React, { useState } from 'react';

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
//       {/* X Axis */}
//       <Line points={[[-100, 0, 0], [100, 0, 0]]} color="red" lineWidth={2} />
//       {/* Y Axis */}
//       <Line points={[[0, -100, 0], [0, 100, 0]]} color="green" lineWidth={2} />
//       {/* Z Axis */}
//       <Line points={[[0, 0, -100], [0, 0, 100]]} color="blue" lineWidth={2} />
//     </>
//   );
// }

// function SceneContent({ isSolid, isWireframe, cameraPosition, cameraLookAt }) {
//   return (
//     <>
//       <ambientLight intensity={0.5} />
//       <directionalLight position={[5, 5, 5]} intensity={1} />
//       <Vehicle isSolid={isSolid} isWireframe={isWireframe} />
//       <GizmoHelper alignment="top-right" margin={[80, 80]}>
//         <GizmoViewport />
//       </GizmoHelper>

//       {/* Infinite Grid positioned lower to remain visible */}
//       {/* <Grid 
//         position={[0, -0.1, 0]} // Lower the grid slightly
//         args={[100, 100]} // Large enough grid size
//         cellSize={1} // Size of grid cells
//         infiniteGrid={true} // Infinite grid
//         color="white"  
        
//         /> */}
//         <Grid
//   position={[0, -0.1, 0]}
//   args={[100, 100]}
//   cellSize={1}
//   infiniteGrid={true}
//   cellColor="white" // Set cell lines to white
//   sectionColor="white" // Set sections to white
//   fadeDistance={100} // Increase the fading distance for visibility
// />


//       {/* Custom Axis Helpers */}
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

//   const toggleMaterial = () => setIsSolid((prev) => !prev);
//   const toggleWireframe = () => setIsWireframe((prev) => !prev);

//   const setViewA = () => {
//     setCameraPosition([0, 5, 10]); // Position for View A
//     setCameraLookAt([0, 0, 0]); // Look at the origin
//   };

//   const setViewB = () => {
//     setCameraPosition([4, 2, 4]); // New Position for View B
//     setCameraLookAt([0, 0, 0]); // Look at the origin
//   };

//   const setViewC = () => {
//     setCameraPosition([-4, 3, 6]); // New Position for View C
//     setCameraLookAt([0, 0, 0]); // Look at the origin
//   };

//   return (
//     <>
//       <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1 }}>
//         <button className="styled-button" onClick={toggleMaterial}>
//           Toggle Solid Mesh
//         </button>
//         <button className="styled-button" onClick={toggleWireframe}>
//           Toggle Wireframe
//         </button>
//         <button className="styled-button" onClick={setViewA}>
//           View A
//         </button>
//         <button className="styled-button" onClick={setViewB}>
//           View B
//         </button>
//         <button className="styled-button" onClick={setViewC}>
//           View C
//         </button>
//       </div>

//       <Canvas style={{ background: 'black' }}>
//         <SceneContent isSolid={isSolid} isWireframe={isWireframe} cameraPosition={cameraPosition} cameraLookAt={cameraLookAt} />
//       </Canvas>

//       <style jsx>{`
//         .styled-button {
//           background-color:  #a881af; /* Button background color */
//           color: white; /* Button text color */
//           border: none; /* Remove border */
//           padding: 10px 15px; /* Button padding */
//           margin: 5px 0; /* Space between buttons */
//           font-size: 14px; /* Font size */
//           border-radius: 5px; /* Rounded corners */
//           cursor: pointer; /* Pointer cursor on hover */
//           transition: background-color 0.3s; /* Transition for hover effect */
//         }

//         .styled-button:hover {
//           background-color: #357ab8;
//         }

//         .styled-button:focus {
//           outline: none; 
//         }
//       `}</style>
//     </>
//   );
// }

// export default Scene;


// import { GizmoHelper, GizmoViewport, OrbitControls, PerspectiveCamera, Grid, Line } from '@react-three/drei';
// import { Canvas } from '@react-three/fiber';
// import React, { useState } from 'react';

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
//       {/* X Axis */}
//       <Line points={[[-100, 0, 0], [100, 0, 0]]} color="red" lineWidth={2} />
//       {/* Y Axis */}
//       <Line points={[[0, -100, 0], [0, 100, 0]]} color="green" lineWidth={2} />
//       {/* Z Axis */}
//       <Line points={[[0, 0, -100], [0, 0, 100]]} color="blue" lineWidth={2} />
//     </>
//   );
// }

// function SceneContent({ isSolid, isWireframe, cameraPosition, cameraLookAt }) {
//   return (
//     <>
//       <ambientLight intensity={0.5} />
//       <directionalLight position={[5, 5, 5]} intensity={1} />
//       <Vehicle isSolid={isSolid} isWireframe={isWireframe} />
//       <GizmoHelper alignment="top-right" margin={[80, 80]}>
//         <GizmoViewport />
//       </GizmoHelper>

//       <Grid
//         position={[0, -0.1, 0]}
//         args={[100, 100]}
//         cellSize={1}
//         infiniteGrid={true}
//         cellColor="white" // Set cell lines to white
//         sectionColor="white" // Set sections to white
//         fadeDistance={100} // Increase the fading distance for visibility
//       />

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

//   const [inputX, setInputX] = useState(0);
//   const [inputY, setInputY] = useState(2);
//   const [inputZ, setInputZ] = useState(5);

//   const toggleMaterial = () => setIsSolid((prev) => !prev);
//   const toggleWireframe = () => setIsWireframe((prev) => !prev);

//   const setViewA = () => {
//     setCameraPosition([0, 5, 10]); // Position for View A
//     setCameraLookAt([0, 0, 0]); // Look at the origin
//   };

//   const setViewB = () => {
//     setCameraPosition([4, 2, 4]); // New Position for View B
//     setCameraLookAt([0, 0, 0]); // Look at the origin
//   };

//   const setViewC = () => {
//     setCameraPosition([-4, 3, 6]); // New Position for View C
//     setCameraLookAt([0, 0, 0]); // Look at the origin
//   };

//   const updatePosition = () => {
//     setCameraPosition([parseFloat(inputX), parseFloat(inputY), parseFloat(inputZ)]);
//   };

//   return (
//     <>
//       <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1 }}>
//         <button className="styled-button" onClick={toggleMaterial}>
//           Toggle Solid Mesh
//         </button>
//         <button className="styled-button" onClick={toggleWireframe}>
//           Toggle Wireframe
//         </button>
//         <button className="styled-button" onClick={setViewA}>
//           View A
//         </button>
//         <button className="styled-button" onClick={setViewB}>
//           View B
//         </button>
//         <button className="styled-button" onClick={setViewC}>
//           View C
//         </button>
//         <div style={{ marginTop: '10px' }}>
//           <label style={{ color: 'white', display: 'block' }}>Custom Camera Position:</label>
//           <input type="number" value={inputX} onChange={(e) => setInputX(e.target.value)} placeholder="X" />
//           <input type="number" value={inputY} onChange={(e) => setInputY(e.target.value)} placeholder="Y" />
//           <input type="number" value={inputZ} onChange={(e) => setInputZ(e.target.value)} placeholder="Z" />
//           <button className="styled-button" onClick={updatePosition}>
//             Update Position
//           </button>
//         </div>
//       </div>

//       <Canvas style={{ background: 'black' }}>
//         <SceneContent isSolid={isSolid} isWireframe={isWireframe} cameraPosition={cameraPosition} cameraLookAt={cameraLookAt} />
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

//         input {
//           width: 50px;
//           margin: 5px;
//           padding: 5px;
//           border-radius: 5px;
//           border: 1px solid #a881af;
//           background-color: #333;
//           color: white;
//         }
//       `}</style>
//     </>
//   );
// }

// export default Scene;




// import { GizmoHelper, GizmoViewport, OrbitControls, PerspectiveCamera, Grid, Line } from '@react-three/drei';
// import { Canvas } from '@react-three/fiber';
// import React, { useState } from 'react';

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
//       {/* X Axis */}
//       <Line points={[[-100, 0, 0], [100, 0, 0]]} color="red" lineWidth={2} />
//       {/* Y Axis */}
//       <Line points={[[0, -100, 0], [0, 100, 0]]} color="green" lineWidth={2} />
//       {/* Z Axis */}
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
//           args={[100, 100]}
//           cellSize={1}
//           infiniteGrid={true}
//           cellColor="white" // Set cell lines to white
//           sectionColor="white" // Set sections to white
//           fadeDistance={100} // Increase the fading distance for visibility
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
//   const [showGrid, setShowGrid] = useState(true); // State for toggling the grid visibility

//   const [inputX, setInputX] = useState(0);
//   const [inputY, setInputY] = useState(2);
//   const [inputZ, setInputZ] = useState(5);

//   const toggleMaterial = () => setIsSolid((prev) => !prev);
//   const toggleWireframe = () => setIsWireframe((prev) => !prev);
//   const toggleGrid = () => setShowGrid((prev) => !prev); // Function to toggle the grid visibility

//   const setViewA = () => {
//     setCameraPosition([0, 5, 10]); // Position for View A
//     setCameraLookAt([0, 0, 0]); // Look at the origin
//   };

//   const setViewB = () => {
//     setCameraPosition([4, 2, 4]); // New Position for View B
//     setCameraLookAt([0, 0, 0]); // Look at the origin
//   };

//   const setViewC = () => {
//     setCameraPosition([-4, 3, 6]); // New Position for View C
//     setCameraLookAt([0, 0, 0]); // Look at the origin
//   };

//   const updatePosition = () => {
//     setCameraPosition([parseFloat(inputX), parseFloat(inputY), parseFloat(inputZ)]);
//   };

//   return (
//     <>
//       <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1 }}>
//         <button className="styled-button" onClick={toggleMaterial}>
//           Toggle Solid Mesh
//         </button>
//         <button className="styled-button" onClick={toggleWireframe}>
//           Toggle Wireframe
//         </button>
//         <button className="styled-button" onClick={setViewA}>
//           View A
//         </button>
//         <button className="styled-button" onClick={setViewB}>
//           View B
//         </button>
//         <button className="styled-button" onClick={setViewC}>
//           View C
//         </button>
//         <button className="styled-button" onClick={toggleGrid}> {/* New button for toggling grid */}
//           Toggle Grid
//         </button>
//         <div style={{ marginTop: '10px' }}>
//           <label style={{ color: 'white', display: 'block' }}>Custom Camera Position:</label>
//           <input type="number" value={inputX} onChange={(e) => setInputX(e.target.value)} placeholder="X" />
//           <input type="number" value={inputY} onChange={(e) => setInputY(e.target.value)} placeholder="Y" />
//           <input type="number" value={inputZ} onChange={(e) => setInputZ(e.target.value)} placeholder="Z" />
//           <button className="styled-button" onClick={updatePosition}>
//             Update Position
//           </button>
//         </div>
//       </div>

//       <Canvas style={{ background: 'black' }}>
//         <SceneContent 
//           isSolid={isSolid} 
//           isWireframe={isWireframe} 
//           cameraPosition={cameraPosition} 
//           cameraLookAt={cameraLookAt} 
//           showGrid={showGrid} // Pass grid visibility as a prop
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

//         input {
//           width: 50px;
//           margin: 5px;
//           padding: 5px;
//           border-radius: 5px;
//           border: 1px solid #a881af;
//           background-color: #333;
//           color: white;
//         }
//       `}</style>
//     </>
//   );
// }

// export default Scene;



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
//       {/* X Axis */}
//       <Line points={[[-100, 0, 0], [100, 0, 0]]} color="red" lineWidth={2} />
//       {/* Y Axis */}
//       <Line points={[[0, -100, 0], [0, 100, 0]]} color="green" lineWidth={2} />
//       {/* Z Axis */}
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
//           args={[100, 100]}
//           cellSize={1}
//           infiniteGrid={true}
//           cellColor="white" // Set cell lines to white
//           sectionColor="white" // Set sections to white
//           fadeDistance={100} // Increase the fading distance for visibility
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
//   const [showGrid, setShowGrid] = useState(true); // State for toggling the grid visibility

//   const [inputX, setInputX] = useState(0);
//   const [inputY, setInputY] = useState(2);
//   const [inputZ, setInputZ] = useState(5);

//   const toggleMaterial = () => setIsSolid((prev) => !prev);
//   const toggleWireframe = () => setIsWireframe((prev) => !prev);
//   const toggleGrid = () => setShowGrid((prev) => !prev); // Function to toggle the grid visibility

//   const setViewA = () => {
//     setCameraPosition([0, 5, 10]); // Position for View A
//     setCameraLookAt([0, 0, 0]); // Look at the origin
//   };

//   const setViewB = () => {
//     setCameraPosition([4, 2, 4]); // New Position for View B
//     setCameraLookAt([0, 0, 0]); // Look at the origin
//   };

//   const setViewC = () => {
//     setCameraPosition([-4, 3, 6]); // New Position for View C
//     setCameraLookAt([0, 0, 0]); // Look at the origin
//   };

//   // Update the camera position live as the input values change
//   useEffect(() => {
//     setCameraPosition([parseFloat(inputX), parseFloat(inputY), parseFloat(inputZ)]);
//   }, [inputX, inputY, inputZ]);

//   return (
//     <>
//       <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1 }}>
//         <button className="styled-button" onClick={toggleMaterial}>
//           Toggle Solid Mesh
//         </button>
//         <button className="styled-button" onClick={toggleWireframe}>
//           Toggle Wireframe
//         </button>
//         <button className="styled-button" onClick={setViewA}>
//           View A
//         </button>
//         <button className="styled-button" onClick={setViewB}>
//           View B
//         </button>
//         <button className="styled-button" onClick={setViewC}>
//           View C
//         </button>
//         <button className="styled-button" onClick={toggleGrid}> {/* New button for toggling grid */}
//           Toggle Grid
//         </button>
//         <div style={{ marginTop: '10px' }}>
//           <label style={{ color: 'white', display: 'block' }}>Custom Camera Position:</label>
//           <input type="number" value={inputX} onChange={(e) => setInputX(e.target.value)} placeholder="X" />
//           <input type="number" value={inputY} onChange={(e) => setInputY(e.target.value)} placeholder="Y" />
//           <input type="number" value={inputZ} onChange={(e) => setInputZ(e.target.value)} placeholder="Z" />
//         </div>
//       </div>

//       <Canvas style={{ background: 'black' }}>
//         <SceneContent 
//           isSolid={isSolid} 
//           isWireframe={isWireframe} 
//           cameraPosition={cameraPosition} 
//           cameraLookAt={cameraLookAt} 
//           showGrid={showGrid} // Pass grid visibility as a prop
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

//         input {
//           width: 50px;
//           margin: 5px;
//           padding: 5px;
//           border-radius: 5px;
//           border: 1px solid #a881af;
//           background-color: #333;
//           color: white;
//         }
//       `}</style>
//     </>
//   );
// }

// export default Scene;



// toggle grid, with css for camera positioning



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
//       {/* X Axis */}
//       <Line points={[[-100, 0, 0], [100, 0, 0]]} color="red" lineWidth={2} />
//       {/* Y Axis */}
//       <Line points={[[0, -100, 0], [0, 100, 0]]} color="green" lineWidth={2} />
//       {/* Z Axis */}
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
//           cellColor="white" // Set cell lines to white
//           sectionColor="white" // Set sections to white
//           fadeDistance={100} // Increase the fading distance for visibility
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
//   const [showGrid, setShowGrid] = useState(true); // State for toggling the grid visibility

//   const [inputX, setInputX] = useState(0);
//   const [inputY, setInputY] = useState(2);
//   const [inputZ, setInputZ] = useState(5);

//   const toggleMaterial = () => setIsSolid((prev) => !prev);
//   const toggleWireframe = () => setIsWireframe((prev) => !prev);
//   const toggleGrid = () => setShowGrid((prev) => !prev); // Function to toggle the grid visibility

//   const setViewA = () => {
//     setCameraPosition([0, 5, 10]); // Position for View A
//     setCameraLookAt([0, 0, 0]); // Look at the origin
//   };

//   const setViewB = () => {
//     setCameraPosition([4, 2, 4]); // New Position for View B
//     setCameraLookAt([0, 0, 0]); // Look at the origin
//   };

//   const setViewC = () => {
//     setCameraPosition([-4, 3, 6]); // New Position for View C
//     setCameraLookAt([0, 0, 0]); // Look at the origin
//   };

//   // Update the camera position live as the input values change
//   useEffect(() => {
//     setCameraPosition([parseFloat(inputX), parseFloat(inputY), parseFloat(inputZ)]);
//   }, [inputX, inputY, inputZ]);

//   return (
//     <>
//       <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1 }}>
//         <button className="styled-button" onClick={toggleMaterial}>
//           Toggle Solid Mesh
//         </button>
//         <button className="styled-button" onClick={toggleWireframe}>
//           Toggle Wireframe
//         </button>
//         <button className="styled-button" onClick={setViewA}>
//           View A
//         </button>
//         <button className="styled-button" onClick={setViewB}>
//           View B
//         </button>
//         <button className="styled-button" onClick={setViewC}>
//           View C
//         </button>
//         <button className="styled-button" onClick={toggleGrid}> {/* New button for toggling grid */}
//           Toggle Grid
//         </button>

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
//           showGrid={showGrid} // Pass grid visibility as a prop
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

//         .camera-position-container label {
//           display: block;
//           margin-bottom: 8px;
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





// import { GizmoHelper, GizmoViewport, OrbitControls, PerspectiveCamera, OrthographicCamera, Grid, Line } from '@react-three/drei';
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

// function SceneContent({ isSolid, isWireframe, cameraPosition, cameraLookAt, showGrid, isPerspective }) {
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
//         position={[0, -0.1, 0]}  // Slightly below the main plane to avoid overlap
//         args={[50, 50]}           // Smaller size
//         cellSize={1}
//         infiniteGrid={false}      // Disable infinite grid
//         fadeDistance={20}         // Fade grid as it extends further
//         cellColor="gray"
//         sectionColor="darkgray"
//       />
      
//       )}
//       <AxisHelpers />
//       {isPerspective ? (
//         <PerspectiveCamera makeDefault fov={75} position={cameraPosition} near={0.1} far={1000} />
//       ) : (
//         <OrthographicCamera makeDefault position={cameraPosition} zoom={100}   near={-1000}  far={1000}    // Adjust far clipping plane
// />

//       )}
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
//   const [isPerspective, setIsPerspective] = useState(true); // New state for camera type

//   const [inputX, setInputX] = useState(0);
//   const [inputY, setInputY] = useState(2);
//   const [inputZ, setInputZ] = useState(5);

//   const toggleMaterial = () => setIsSolid((prev) => !prev);
//   const toggleWireframe = () => setIsWireframe((prev) => !prev);
//   const toggleGrid = () => setShowGrid((prev) => !prev);
//   const toggleCameraType = () => setIsPerspective((prev) => !prev); // Toggle camera type

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
//         <button className="styled-button" onClick={toggleCameraType}>
//           Toggle {isPerspective ? 'Orthographic' : 'Perspective'} View
//         </button>
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
//           isPerspective={isPerspective} // Pass camera type as prop
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


