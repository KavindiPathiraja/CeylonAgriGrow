import { useEffect, useState } from 'react';
import axios from 'axios';

const CropTypeDropdown = ({ onSelectCropType }) => {
    const [cropTypes, setCropTypes] = useState([]);

    useEffect(() => {
        const fetchCropTypes = async () => {
            try {
                const response = await axios.get('http://localhost:5556/api/crop-types');
                setCropTypes(response.data);
            } catch (error) {
                console.error('Error fetching crop types:', error);
            }
        };

        fetchCropTypes();
    }, []);

    return (
        <div className="relative w-full flex justify-center">
            <select 
                onChange={(e) => onSelectCropType(e.target.value)} 
                defaultValue="" 
                className="w-[300%] h-[4.2rem] px-4 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg appearance-none"
            >
                <option value="" disabled>Select Crop Type</option>
                {cropTypes.map((cropType, index) => (
                    <option key={index} value={cropType}>{cropType}</option>
                ))}
            </select>

            {/* Tailwind's arrow icon positioning */}
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.292 7.292a1 1 0 011.414 0L10 10.586l3.293-3.294a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </div>
        </div>
    );
};

export default CropTypeDropdown;
