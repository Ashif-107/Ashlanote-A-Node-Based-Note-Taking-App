import React from 'react';
import { Handle, Position } from '@xyflow/react';

// Circle Node
export const CircleNode = ({ data }: any) => {
  const text = data.label || '';
  const textLength = text.length;
  const diameter = Math.max(30, textLength * 3.5); // Adjust the size based on text length

  return (
    <div
      style={{
        width: `${diameter}px`,
        height: `${diameter}px`,
        borderRadius: '50%',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black',
        textAlign: 'center',
        border: '1px solid black',
        fontSize: '12px',
      }}
    >
      {text}
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  );
};

export const DiamondNode = ({ data }: any) => {
  const text = data.label || '';
  const textLength = text.length;
  const size = Math.max(70, textLength * 3.5); // Adjust the size based on text length

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: 'white',
        position: 'relative',
        transform: 'rotate(45deg)', // Rotate container to create diamond shape
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black',
        textAlign: 'center',
        border: '1px solid black',
        fontSize: '12px',
      }}
    >
      <div
        style={{
          transform: 'rotate(-45deg)', // Rotate text back to normal
        }}
      >
        {text}
      </div>
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  );
};
