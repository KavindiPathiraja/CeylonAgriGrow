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
        <div className="flex justify-center w-full">
            <select 
                onChange={(e) => onSelectCropType(e.target.value)} 
                defaultValue="" 
                className="w-[300%] h-[4.2rem] px-4 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            >
                <option value="" disabled>Select Crop Type</option>
                {cropTypes.map((cropType, index) => (
                    <option key={index} value={cropType}>{cropType}</option>
                ))}
            </select>
        </div>
    );
};

export default CropTypeDropdown;
