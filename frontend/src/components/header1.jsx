import React from 'react';
import "./slider.css";
import { useParams, Link } from 'react-router-dom';

const Header = () => {
    const { FarmerID } = useParams(); // Extract FarmerID from the route

    return (
        <div className='w-full h-24 bg-gray-100 bg-opacity-70'>
            <div className='h-24 flex justify-center items-center'>
                <div className='w-2/5 logo'>
                    <div className='text-secondary text-4xl font-Carnero -mt-4'>
                        <Link to='/'>Ceylon Agri Grow</Link>
                    </div>
                </div>
                <div className='menu menu1 w-1/2 text-lg'>
                    <ul className='flex'>
                        <li className='ml-7 font-Zodiak-Bold'>
                            <Link to='/myCrops'>Fertilizer</Link>
                        </li>
                        <li className='ml-7 font-Zodiak-Bold'>
                            <Link to='/Pest&Disease/PredictDisease'>Pest & Diseases</Link>
                        </li>
                        <li className='ml-7 font-Zodiak-Bold'>
                            <Link to='/crops/getall'>Crop Prediction</Link>
                        </li>
                        <li className='ml-7 font-Zodiak-Bold'>
                            <a href='#products'>Marketplace</a>
                            </li>
                            <Link to={`/my-orders/${FarmerID}`} className="flex items-center">
                        <span className='text-green-800 text-xl'>My Orders</span>
                    </Link>
                    </ul>
                    
                </div>
                <div className='search'>

                    <div className='w-12'>
                        
                        <Link to={`/farmers/details/${FarmerID}`}>
                            <img src='/farmer(2).png' alt='Farmer Icon' />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
