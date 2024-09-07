import { useState } from 'react';
import CropTypeDropdown from '../components/DropDown'; // Adjust path as needed
import { useNavigate } from "react-router-dom";

const SomeComponent = () => {
    const navigate = useNavigate();
    const [selectedCropType, setSelectedCropType] = useState('');

    const handleCropTypeSelect = (cropType) => {
        setSelectedCropType(cropType);
    };

    const handleClick = () => {
        navigate(`/Pest&Disease/FindDiseases/${selectedCropType}`);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-4xl font-light mb-8">Select Crop Type</h1>
                <div className="w-1/2 mx-auto">
                    <CropTypeDropdown onSelectCropType={handleCropTypeSelect} />
                </div>
                <p className="mt-4 text-lg">Selected Crop Type: {selectedCropType}</p>
                <button 
                    className="mt-8 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    data={selectedCropType}
                    onClick={handleClick}
                >
                    Find
                </button>
            </div>
        </div>
    );
};

export default SomeComponent;
