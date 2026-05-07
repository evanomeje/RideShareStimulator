import React from 'react';

const CustomerIcon = ({ x, y }) => {
  return (
    <svg
      x={x}
      y={y}
      width="20"
      height="20"
      viewBox="0 0 56 56"
      style={{ position: 'absolute', pointerEvents: 'none' }}
    >
      <circle cx="28" cy="28" r="26" fill="#10b981" stroke="#047857" strokeWidth="2" />
      <circle cx="28" cy="22" r="8" fill="#ffffff" />
      <path d="M 12,42 Q 28,32 44,42" fill="#ffffff" />
    </svg>
  );
};

export default CustomerIcon;
