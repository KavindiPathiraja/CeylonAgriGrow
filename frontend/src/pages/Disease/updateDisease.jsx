import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SellInfo = () => {
    const { id } = useParams();
    const [disease, setDisease] = useState(null);
    const [diseaseName, setDiseaseName] = useState('');
    const [cropType, setCropType] = useState('');
    const [photo, setPhoto] = useState('');
    const [information, setInformation] = useState('');
    const [remedy, setRemedy] = useState('');
    const [file, setFile] = useState(null);
    const [type, setType] = useState('Disease'); // Default to 'Disease'
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDiseaseDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5556/diseases/${id}`);
                setDisease(response.data);
                setDiseaseName(response.data.DiseaseName);
                setCropType(response.data.CropType);
                setPhoto(response.data.photo);
                setInformation(response.data.Information);
                setRemedy(response.data.Remedy);
                setType(response.data.Type); // Set the type from the API response
            } catch (error) {
                console.error('Error fetching disease details:', error);
            }
        };

        fetchDiseaseDetails();
    }, [id]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!diseaseName || !cropType || !information || !remedy) {
            alert('Please fill in all fields');
            return;
        }
    
        const formData = new FormData();
        formData.append('DiseaseName', diseaseName);
        formData.append('CropType', cropType);
        formData.append('Information', information);
        formData.append('Remedy', remedy);
        formData.append('Type', type); // Include the type in form data
        if (file) {
            formData.append('photo', file);
        }
    
        try {
            await axios.put(`http://localhost:5556/diseases/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Disease updated successfully');
            navigate(-1);
        } catch (error) {
            console.error('Error updating disease:', error);
            alert('Failed to update disease');
        }
    };

    if (!disease) {
        return <div className="text-center text-lg">Loading...</div>;
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-300 max-w-lg w-full">
                <h2 className="text-2xl font-bold mb-4">Update Disease Information</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Disease Name:
                        </label>
                        <input
                            type="text"
                            value={diseaseName}
                            onChange={(e) => setDiseaseName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Crop Type:
                        </label>
                        <input
                            type="text"
                            value={cropType}
                            onChange={(e) => setCropType(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Image:
                        </label>
                        <img
                            src={photo}
                            alt={diseaseName}
                            className="w-full h-auto rounded-lg mb-4"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Change Image:
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Type:
                        </label>
                        <fieldset className="space-y-2">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="disease"
                                    name="type"
                                    value="Disease"
                                    checked={type === 'Disease'}
                                    onChange={(e) => setType(e.target.value)}
                                    className="mr-2"
                                />
                                <label htmlFor="disease" className="text-gray-700">Disease</label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="pest"
                                    name="type"
                                    value="Pest"
                                    checked={type === 'Pest'}
                                    onChange={(e) => setType(e.target.value)}
                                    className="mr-2"
                                />
                                <label htmlFor="pest" className="text-gray-700">Pest</label>
                            </div>
                        </fieldset>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Information:
                        </label>
                        <input
                            type="text"
                            value={information}
                            onChange={(e) => setInformation(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Remedy:
                        </label>
                        <input
                            type="text"
                            value={remedy}
                            onChange={(e) => setRemedy(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-lg cursor-pointer hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SellInfo;
