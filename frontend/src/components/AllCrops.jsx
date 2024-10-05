import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './AllCrops.css';
import PDF from '../components/reportPDF';
import Header from './header';
import Footer from './footer';

const AllCrops = () => {

    const [crops, setCrops] = useState([]);
    const [search, setSearch] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5556/myCrops').then((response) => {
            const crops = response.data;
            setCrops(crops);
            setSearch(crops);
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

    const filter = (e) => {
        setSearch(
            crops.filter((f) =>
                f.CropName.toLowerCase().includes(e.target.value.toLowerCase())
            )
        );
    };

    return (
        <>
            <Header />
            <div className="bg-[url('/12.jpg')] bg-cover h-screen">
                <div className="h-12 text-right">
                    <input
                        type="text"
                        className="h-12 w-1/4 p-2 m-5 border-2 border-primary shadow-md bg-slate-50 text-black rounded-md"
                        onChange={filter}
                        placeholder="Search Crop"
                    ></input>
                </div>
                <div className='single_crop p-5'>
                    {search.map((crop) => (
                        <div className="crop p-5 border-2 border-primary shadow-md bg-secondary text-white" key={crop._id}>
                            <h3 className='text-center font-Carnero text-xl mb-3'>{crop.CropName}</h3>
                            <p>Soil Type: {crop.SoilType}</p>
                            <p>Rainfall: {crop.RainFall}</p>
                            <p>Temperature: {crop.Temperature}</p>
                            <p>Growth Stage: {crop.GrowthStage}</p>
                            <div className='action_btn mt-5'>
                                <button class="bg-primary hover:bg-yellow-300 text-white font-bold py-2 px-4 rounded inline-flex items-center" onClick={() => updateCrop(crop._id)}>
                                    <span>Edit</span>
                                </button>
                                <button class="bg-primary hover:bg-red-500 text-white font-bold py-2 px-4 rounded inline-flex items-center" onClick={() => deleteCrop(crop._id)}>
                                    <span>Delete</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <PDF crops={crops} />
            </div>
            <Footer />
        </>
    );
}

export default AllCrops;
