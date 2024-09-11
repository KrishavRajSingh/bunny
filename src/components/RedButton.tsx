import React from 'react';

const RedButton: React.FC = () => {
  return (
    <button
      style={{
        backgroundColor: 'red',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}
    >
      Dabao Mujhe
    </button>
  );
};

export default RedButton;