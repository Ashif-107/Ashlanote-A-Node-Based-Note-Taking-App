import React from 'react';
import { Handle, Position } from '@xyflow/react';

// Circle Node
export const CircleNode = ({ data }: any) => {
  const { label, colorMode } = data;
  const textLength = label.length;
  const diameter = Math.max(30, textLength * 3.5); // Adjust the size based on text length

  const isDarkMode = colorMode === 'dark';

  return (
    <div
      style={{
        width: `${diameter}px`,
        height: `${diameter}px`,
        borderRadius: '50%',
        backgroundColor: isDarkMode ? '#1E1E1E' : 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: isDarkMode ? 'white' : 'black',
        textAlign: 'center',
        border: isDarkMode ? '1px solid #393939' : '1px solid black',
        fontSize: '12px',
      }}
    >
      {label}
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  );
};

export const DiamondNode = ({ data }: any) => {
  const { label, colorMode } = data;
  const textLength = label.length;
  const size = Math.max(70, textLength * 3.5); // Adjust the size based on text length

  const isDarkMode = colorMode === 'dark';

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: isDarkMode ? '#1E1E1E' : 'white',
        color: isDarkMode ? 'white' : 'black',
        border: isDarkMode ? '1px solid #393939' : '1px solid black',
        position: 'relative',
        transform: 'rotate(45deg)', // Rotate container to create diamond shape
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: '12px',
      }}
    >
      <div
        style={{
          transform: 'rotate(-45deg)', // Rotate text back to normal
        }}
      >
        {label}
      </div>
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  );
};
