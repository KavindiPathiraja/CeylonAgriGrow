import { useEffect, useState } from "react";
import axios from "axios";  // Import axios
import { useParams } from "react-router-dom";
import BackgroundImg from '../../assets/field.jpg';  // Import the background image
import DiseaseDetails from './dieases'; // Ensure this path is correct

const SetDiseases = () => {
    const [diseases, setDiseases] = useState([]);
    const [search, setSearch] = useState('');
    const [sortType, setSortType] = useState(''); // New state for sorting
    const { cropType } = useParams();  // Get crop type from URL params

    useEffect(() => {
        const fetchDiseasesByCropType = async () => {
            try {
                const response = await axios.get(`http://localhost:5556/diseases/crop/${cropType}`);  // Fetch diseases by crop type
                
                if (response.status === 200) {
                    setDiseases(response.data);  // Set diseases based on crop type
                } else {
                    console.error('Failed to fetch diseases');
                }
            } catch (error) {
                // Log more details from the error
                console.error('Error fetching diseases:', error.message);
                console.error('Full error:', error.response?.data || error);
            }
        };
    
        fetchDiseasesByCropType();
    }, [cropType]);  // The effect runs whenever the crop type changes

    // Sorting and searching logic
    const sortedDiseases = () => {
        let filteredDiseases = diseases.filter((disease) => 
            search.toLowerCase() === '' || 
            disease.DiseaseName.toLowerCase().includes(search.toLowerCase())
        );

        if (sortType) {
            filteredDiseases = filteredDiseases.sort((a, b) => 
                (a.Type > b.Type) ? 1 : -1 // Sort by Type field
            );
        }

        return filteredDiseases;
    };

    return (
        
        <div className="flex flex-col items-center p-4 min-h-screen flex items-start justify-center pt-12 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${BackgroundImg})` }}
        >
            <input 
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                name="search"
                placeholder="Search Diseases"
                className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 h-12 px-4 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg mb-4"
            />

            <div className="flex items-center mb-4">
                <label htmlFor="sortType" className="mr-2 text-lg font-medium">Sort by Type:</label>
                <select
                    id="sortType"
                    onChange={(e) => setSortType(e.target.value)}
                    value={sortType}
                    className="h-12 px-4 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                >
                    <option value="">None</option>
                    <option value="Disease">Disease</option>
                    <option value="Pest">Pest</option>
                </select>
            </div>

            <div className="disease-home w-full">
                <div className="disease-list flex flex-wrap justify-center">
                    {sortedDiseases().map((disease) => (
                        <DiseaseDetails key={disease._id} disease={disease} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SetDiseases;
