// src/components/Modal.js
import React from 'react';
import Gif from '../assets/ladybug.gif';  // Import the GIF

const PredictionModal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  // Slice the content to only include the first 5 items
  const displayedContent = content.slice(0, 5);

  // Function to format each item properly
  const formatItem = (item) => {
    // Remove any unwanted symbols or characters (e.g., quotes, special symbols)
    return item.replace(/[^a-zA-Z0-9\s]/g, ''); // Removes non-alphanumeric characters
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-gray-500 opacity-50" onClick={onClose}></div>

      {/* Modal content */}
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/3 max-w-md z-10 p-6 my-8 md:my-16">
        <h3 className="text-lg font-semibold mb-4 text-center">AI Disease Prediction:</h3>
        <ul className="list-none pl-0 text-green-700">
          {displayedContent.length > 0 ? (
            displayedContent.map((item, index) => (
              <li key={index} className="py-1 whitespace-pre-line">{formatItem(item)}</li>
            ))
          ) : (
            <li className="py-1">No predictions available.</li>
          )}
        </ul>

        {/* Add the GIF */}
        <div className="flex justify-center my-4">
          <img src={Gif} alt="Ladybug" className="w-24 h-24" />
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PredictionModal;
