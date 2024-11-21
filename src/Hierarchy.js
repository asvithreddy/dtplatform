import React from 'react';

function Hierarchy({ objects }) {
  const renderTree = (node) => {
    return (
      <ul>
        <li>
          {node.name}
          {node.children && node.children.length > 0 && (
            <ul>
              {node.children.map((child) => renderTree(child))}
            </ul>
          )}
        </li>
      </ul>
    );
  };

  return (
    <div style={{ padding: '10px', background: '#1A1A1A', color: 'white', borderRadius: '8px', height: '100%', overflowY: 'auto' }}>
      <h3>Hierarchy</h3>
      {objects.length > 0 ? renderTree(objects[0]) : <p>No objects in scene</p>}
    </div>
  );
}

export default Hierarchy;