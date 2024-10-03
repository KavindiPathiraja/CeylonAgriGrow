import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from "../../components/Spinner";
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import ReportFarmer from './ReportFarmers';

const ShowFarmer = () => {
    const [farmers, setFarmers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchFarmers = async () => {
            try {
                const response = await axios.get('http://localhost:5556/farmers');
                // Adjusted to set farmers directly since response is an array
                if (Array.isArray(response.data)) {
                    setFarmers(response.data); // Set farmers directly as it is an array
                } else {
                    console.error("Invalid data format:", response.data);
                }
            } catch (error) {
                console.error("Error fetching farmers:", error);
                setError("Failed to fetch farmers.");
            } finally {
                setLoading(false);
            }
        };

        fetchFarmers();
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const filteredFarmers = farmers.filter(farmer =>
        Object.values(farmer).some(value =>
            value.toString().toLowerCase().includes(searchQuery)
        )
    );

    return (
        <div className='p-6 bg-gray-100 min-h-screen'>
            <li>
                <Link to="/" className="text-green-800 hover:text-green-600">Home</Link>
            </li>
            <h1 className="show-Farmers-title text-3xl my-4 text-green-800">Farmer's Marketplace</h1>
            <div className='flex flex-col md:flex-row justify-between items-center mb-6'>
                <label htmlFor="search" className="sr-only">Search farmers</label>
                <input
                    id="search"
                    type="text"
                    placeholder="Search farmers..."
                    className='text-lg my-4 p-2 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                    onChange={handleSearchChange}
                />
                <div className="flex items-center space-x-4">
                    <Link to='/farmers/create' className="flex items-center">
                        <MdOutlineAddBox className='text-green-800 text-4xl' />
                    </Link>
                    <ReportFarmer filteredFarmers={filteredFarmers} className="flex items-center" />
                </div>
            </div>

            {loading ? (
                <Spinner />
            ) : error ? (
                <div className="text-red-600">{error}</div>
            ) : (
                <table className='w-full border border-green-500 rounded-lg bg-white'>
                    <thead>
                        <tr className='bg-green-100'>
                            <th className='p-4 border border-green-300'>Profile Pic</th>
                            <th className='p-4 border border-green-300'>Farmer ID</th>
                            <th className='p-4 border border-green-300'>Farmer Name</th>
                            <th className='p-4 border border-green-300'>Contact No</th>
                            <th className='p-4 border border-green-300'>Email</th>
                            <th className='p-4 border border-green-300'>Address</th>
                            <th className='p-4 border border-green-300'>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredFarmers.map((farmer) => (
                            <tr key={farmer._id} className='text-center bg-white even:bg-green-50'>
                                <td className='p-4 border border-green-300'>
                                    <img src={farmer.image} alt="Profile Pic" className="w-16 h-16 object-cover rounded-full" />
                                </td>
                                <td className='p-4 border border-green-300'>{farmer.FarmerID}</td>
                                <td className='p-4 border border-green-300'>{farmer.FarmerName}</td>
                                <td className='p-4 border border-green-300'>{farmer.ContactNo}</td>
                                <td className='p-4 border border-green-300'>{farmer.Email}</td>
                                <td className='p-4 border border-green-300'>{farmer.Address}</td>
                                <td className='p-4 border border-green-300'>
                                    <div className='flex justify-center gap-4'>
                                        <Link to={`/farmers/details/${farmer._id}`}>
                                            <BsInfoCircle className='text-2xl text-green-800 hover:text-green-600' />
                                        </Link>
                                        <Link to={`/farmers/edit/${farmer._id}`}>
                                            <AiOutlineEdit className='text-2xl text-yellow-600 hover:text-yellow-500' />
                                        </Link>
                                        <Link to={`/farmers/delete/${farmer._id}`}>
                                            <MdOutlineDelete className='text-2xl text-red-600 hover:text-red-500' />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ShowFarmer;
