import React from 'react'
import "./slider.css";

const Header = () => {
    return (
        <>
            <div className='w-full h-24 bg-gray-100'>
                <div className='h-24 flex justify-center items-center'>
                    <div className='w-2/5 logo'>
                        <div className='text-secondary text-4xl font-Carnero -mt-4'><a href='/'>Ceylon Agri Grow</a></div>
                    </div>
                    <div className='menu menu1 w-1/2'>
                        <ul className='flex'>
                            <li className='ml-7 font-bold'><a href='/myCrops'>My Crops</a></li>
                            <li className='ml-7 font-bold'><a href='/Pest&Disease/PredictDisease'>Pest & Decises</a></li>
                            <li className='ml-7 font-bold'><a href='/crops/getall'>Crop Prediction</a></li>
                            <li className='ml-7 font-bold'><a href='/products/allProducts'>MarketPlace</a></li>
                        </ul>
                    </div>
                    <div className='search'>
                        <div className='w-12'>
                            <a href='/profile'><img src='public/farmer.png' /></a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header