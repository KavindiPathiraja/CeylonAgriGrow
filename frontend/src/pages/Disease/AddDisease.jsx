import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BackgroundImg from '../../assets/pest.jpg';  // Import the background image
import Gif from '../../assets/ladybug.gif';  // Import the GIF
const DiseaseForm = () => {
    const [formData, setFormData] = useState({
        diseaseName: '',
        cropType: '',
        photo: '',
        information: '',
        remedy: '',
        type: '', // New state for type
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = () => {
        const errors = {};
        if (!formData.diseaseName) errors.diseaseName = 'Disease Name is required';
        if (!formData.cropType) errors.cropType = 'Crop Type is required';
        if (!formData.information) errors.information = 'Information is required';
        if (!formData.remedy) errors.remedy = 'Remedy is required';
        if (!formData.type) errors.type = 'Type is required';
        if (!formData.photo) errors.photo = 'Photo is required';

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const data = new FormData();
        data.append('photo', formData.photo);
        data.append('DiseaseName', formData.diseaseName);
        data.append('CropType', formData.cropType);
        data.append('Information', formData.information);
        data.append('Remedy', formData.remedy);
        data.append('Type', formData.type);

        axios.post('http://localhost:5556/diseases/add', data)
            .then(res => {
                console.log(res);
                alert("Disease Added Successfully");
                setFormData({
                    diseaseName: '',
                    cropType: '',
                    photo: '',
                    information: '',
                    remedy: '',
                    type: '',
                });
                navigate('/Pest&Disease/diseaseTable'); // Redirect to the disease list page
            })
            .catch(err => {
                console.log(err);
                alert('Error adding disease');
            });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePhoto = (e) => {
        setFormData({ ...formData, photo: e.target.files[0] });
    };

    return (
        <div className="flex justify-end items-center min-h-screen bg-gray-100 pr-8 min-h-screen flex items-start  pt-12 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${BackgroundImg})` }}
        > {/* Adjusted to justify end and add padding */}

        <div className="flex justify-center my-4" style={{paddingBottom:"550px" , paddingLeft:'200px'}}>
          <img src={Gif} alt="Ladybug" className="w-24 h-24" />
        </div>
            <form
                onSubmit={handleSubmit}
                encType='multipart/form-data'
                className="bg-white p-8 rounded-lg shadow-md border border-gray-300 max-w-md w-full space-y-6"
            >
                <h2 className="text-2xl font-bold text-center text-gray-800">Disease Form</h2>

                <div className="space-y-4">
                    <input
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        name="photo"
                        onChange={handlePhoto}
                        className={`block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none ${errors.photo ? 'border-red-500' : ''}`}
                    />
                    {errors.photo && <p className="text-red-500 text-sm">{errors.photo}</p>}

                    <input
                        type="text"
                        placeholder="Disease Name"
                        name="diseaseName"
                        value={formData.diseaseName}
                        onChange={handleChange}
                        className={`w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.diseaseName ? 'border-red-500' : ''}`}
                    />
                    {errors.diseaseName && <p className="text-red-500 text-sm">{errors.diseaseName}</p>}

                    <fieldset className="space-y-2 space-x-6 flex items-center">
                        <legend className="text-lg font-medium">Type</legend>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="disease"
                                name="type"
                                value="Disease"
                                checked={formData.type === 'Disease'}
                                onChange={handleChange}
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
                                checked={formData.type === 'Pest'}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            <label htmlFor="pest" className="text-gray-700">Pest</label>
                        </div>
                    </fieldset>
                    {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}

                    <input
                        type="text"
                        placeholder="Crop Type"
                        name="cropType"
                        value={formData.cropType}
                        onChange={handleChange}
                        className={`w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.cropType ? 'border-red-500' : ''}`}
                    />
                    {errors.cropType && <p className="text-red-500 text-sm">{errors.cropType}</p>}

                    <textarea
                        placeholder="Information"
                        name="information"
                        value={formData.information}
                        onChange={handleChange}
                        className={`w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.information ? 'border-red-500' : ''}`}
                    />
                    {errors.information && <p className="text-red-500 text-sm">{errors.information}</p>}

                    <textarea
                        placeholder="Remedy"
                        name="remedy"
                        value={formData.remedy}
                        onChange={handleChange}
                        className={`w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.remedy ? 'border-red-500' : ''}`}
                    />
                    {errors.remedy && <p className="text-red-500 text-sm">{errors.remedy}</p>}

                    <input
                        type="submit"
                        value="Submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-lg cursor-pointer hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
            </form>
        </div>
    );
};

export default DiseaseForm;
