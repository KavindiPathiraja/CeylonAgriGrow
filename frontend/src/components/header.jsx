import React from 'react'
import "./slider.css";

const Header = () => {
    return (
        <>
            <div className='w-full h-24 bg-gray-100 bg-opacity-70'>
                <div className='h-24 flex justify-center items-center'>
                    <div className='w-2/5 logo'>
                        <div className='text-secondary text-4xl font-Carnero -mt-4'><a href='/'>Ceylon Agri Grow</a></div>
                    </div>
                    <div className='menu menu1 w-1/2 text-lg'>
                        <ul className='flex'>
                            <li className='ml-7 font-Zodiak-Bold'><a href='/myCrops'>Fertilizer</a></li>
                            <li className='ml-7 font-Zodiak-Bold'><a href='/Pest&Disease/PredictDisease'>Pest & Decises</a></li>
                            <li className='ml-7 font-Zodiak-Bold'><a href='/crops/getall'>Crop Prediction</a></li>
                            <li className='ml-7 font-Zodiak-Bold'><a href='/products/allProducts'>MarketPlace</a></li>
                        </ul>
                    </div>
                    <div className='search'>
                        <div className='w-12'>
                            <a href='/signin'><img src='public/farmer(2).png' /></a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header