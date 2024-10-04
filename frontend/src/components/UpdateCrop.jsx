import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'

const EditItems = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [cropData, setCropData] = useState({
        CropName: "",
        Img: "",
        GrowthStage: "",
        SoilType: "",
        RainFall: "",
        Temperature: "",
        SoilpHLevel: "",
        CropArea: "",
        IrrigationType: "",
        ScientificName: "",
        Location: ""
    });

    useEffect(() => {
        axios.get('http://localhost:5556/myCrop/' + id).then((response) => {
            const crops = response.data;
            setCropData(crops);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setCropData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:5556/crop/update/' + id, cropData)
            if (response.data.success) {
                navigate('/allCrops');
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Error updating item:', error);
            alert('Error updating item. Please try again.');
        }
    };

    return (
        <>
            <div className="bg-[url('/allCrop.jpg')] bg-cover h-screen">
                <div className="flex justify-center bg-primary w-2/5 m-auto pt-8 pb-8 rounded-lg opacity-90">
                    <form className="w-full max-w-lg" onSubmit={handleUpdate}>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-first-name">
                                    Crop Name
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" name="CropName" type="text" onChange={handleOnChange} value={cropData.CropName} required />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-first-name">
                                    Sciencetific Name
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" name="ScientificName" type="text" onChange={handleOnChange} value={cropData.ScientificName} required />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-first-name">
                                    Location
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" name="Location" type="text" onChange={handleOnChange} value={cropData.Location} required />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-last-name">
                                    Growth Stage
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" name="GrowthStage" type="text" onChange={handleOnChange} value={cropData.GrowthStage} required />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-city">
                                    Soil pH Level
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="SoilpHLevel" id="grid-city" type="text" onChange={handleOnChange} value={cropData.SoilpHLevel} required />
                            </div>
                            <div className="w-full md:w-2/3 px-3">
                                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-password">
                                    Soil Type
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" name="SoilType" type="text" onChange={handleOnChange} value={cropData.SoilType} required />
                                <p className="text-stone-300 text-xs italic">Make it as long and as crazy as you'd like</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-password">
                                    Crop Area
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" name="CropArea" type="text" onChange={handleOnChange} value={cropData.CropArea} required />
                                <p className="text-stone-300 text-xs italic">Make it as long and as crazy as you'd like</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-city">
                                    Rain Fall
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" name="RainFall" type="text" onChange={handleOnChange} value={cropData.RainFall} required />
                            </div>
                            {/* <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-state">
                    Temperature
                </label>
                <div className="relative">
                    <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-white py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                        <option>New Mexico</option>
                        <option>Missouri</option>
                        <option>Texas</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                    </div>
                </div>
            </div> */}
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-zip">
                                    Temperature
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" name="Temperature" type="text" onChange={handleOnChange} value={cropData.Temperature} required />
                            </div>
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-zip">
                                    Irrigation Type
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" name="IrrigationType" type="text" onChange={handleOnChange} value={cropData.IrrigationType} required />
                            </div>
                        </div>
                        <button className="w-full bg-lime-400 hover:bg-lime-500 text-grey-300 font-bold py-2 px-4 border-b-4 border-lime-800 hover:border-lime-900 rounded" type="submit">
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default EditItems