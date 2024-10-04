import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './AllCrops.css';

const AllCrops = () => {

    const [crops, setCrops] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5556/myCrops').then((response) => {
            const crops = response.data;
            setCrops(crops);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    const deleteCrop = async (id) => {
        try {
            await axios.delete('http://localhost:5556/crop/delete/' + id);
        } catch (error) {
            console.log(error);
        }
    };

    const updateCrop = async (id) => {
        navigate(`/updateCrop/${id}`);
    };

    return (
        <>
            <div className="bg-[url('/allCrop.jpg')] bg-cover h-screen">
                <div className='single_crop p-5'>
                    {crops.map((crop) => (
                        <div className="crop p-5 border-2 shadow-md" key={crop._id}>
                            <h3 className='text-center font-Carnero text-lg mb-3'>{crop.CropName}</h3>
                            <p>Soil Type: {crop.SoilType}</p>
                            <p>Rainfall: {crop.RainFall}</p>
                            <p>Temperature: {crop.Temperature}</p>
                            <p>Growth Stage: {crop.GrowthStage}</p>
                            <div className='action_btn mt-5'>
                                <button class="bg-gray-300 hover:bg-yellow-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" onClick={() => updateCrop(crop._id)}>
                                    <span>Edit</span>
                                </button>
                                <button class="bg-gray-300 hover:bg-red-500 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" onClick={() => deleteCrop(crop._id)}>
                                    <span>Delete</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default AllCrops;
