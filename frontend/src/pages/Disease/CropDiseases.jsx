import { useEffect, useState } from "react";
import axios from "axios";

// components
import DiseaseDetails from './dieases'; // Ensure this path is correct

const SetDiseases = ({ cropName }) => {
    const [diseases, setDiseases] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchDiseases = async () => {
            try {
                const response = await axios.get('http://localhost:5556/diseases/all');
                
                if (response.status === 200) {
                    setDiseases(response.data);
                } else {
                    console.error('Failed to fetch diseases');
                }
            } catch (error) {
                console.error('Error fetching diseases:', error.message);
                console.error('Full error:', error.response?.data || error);
            }
        };
    
        fetchDiseases();
    }, []);

    // Filter diseases by the crop name if provided
    const filteredDiseases = diseases.filter(disease => {
        const matchesCropName = cropName ? disease.CropType.toLowerCase() === cropName.toLowerCase() : true;
        const matchesSearch = search.toLowerCase() === ''
            ? true
            : disease.DiseaseName.toLowerCase().includes(search.toLowerCase());
        
        return matchesCropName && matchesSearch;
    });

    return (
        <div className="p-4">
            <center>
            <input 
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                name="search"
                placeholder="Search records"
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 h-12 px-4 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg mb-4 mx-auto"
            />
            </center>

            <div className="disease-home">
                <div className="disease-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredDiseases.map((disease) => (
                        <DiseaseDetails key={disease._id} disease={disease} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SetDiseases;
