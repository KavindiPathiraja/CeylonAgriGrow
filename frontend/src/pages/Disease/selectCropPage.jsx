import { useState } from 'react';
import CropTypeDropdown from '../../components/DropDown'; // Adjust path as needed
import { useNavigate } from "react-router-dom";
import BackgroundImg from '../../assets/plant-growing-from-soil.jpg';  // Import the background image

const SomeComponent = () => {
    const navigate = useNavigate();
    const [selectedCropType, setSelectedCropType] = useState('');

    const handleCropTypeSelect = (cropType) => {
        setSelectedCropType(cropType);
    };

    const handleClick = () => {
        navigate(`/Pest&Disease/selectCrop/${selectedCropType}`);
    };

    const handleAllPestsDiseasesClick = () => {
        navigate('/Pest&Disease/all');  // Navigate to the "All Pest & Diseases" page
    };

    return (
        <div className="relative flex flex-col items-center justify-center h-screen bg-gray-100 min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${BackgroundImg})` }}
        >
            {/* Top-right button */}
            <button 
                onClick={handleAllPestsDiseasesClick} 
                className="absolute top-4 right-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-green-300"
            >
                All Pest & Diseases
            </button>
            
            <div className="text-center">
                <h1 className="text-7xl font-light mb-8">Select Crop Type</h1>
                <div className="w-5/6 mx-auto">
                    <CropTypeDropdown onSelectCropType={handleCropTypeSelect} />
                </div>
                <p className="mt-4 text-4xl">Selected Crop Type: {selectedCropType}</p>
                <button 
                    className="mt-8 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    onClick={handleClick}
                >
                    Find
                </button>
            </div>
        </div>
    );
};

export default SomeComponent;
