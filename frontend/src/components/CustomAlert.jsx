import React from 'react';

const CustomAlert = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl text-center mb-4">{message}</h2>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white py-2 px-4 rounded block mx-auto"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CustomAlert;
