import React from 'react';
import AnimationComponent from './Animation';
import AnimationComponent1 from './Farmers';
import Header from '../components/header';
import Footer from '../components/footer';
import '../components/custom.css';
import HCard from './HomeCard/Hcard';



const Home1 = () => {
    return (
        <>
            <Header />
            <div className="bg-[url('/home1.jpg')] bg-cover h-screen overflow-hidden bg-zoom-out">
                <div className='font-semibold text-4xl w-3/5 text-center m-auto pt-32 text-primary leading-tight font-Zodiak-Bold h1'>
                    <span>Welcome</span>
                    <span>to</span>
                    <span>Ceylon</span>
                    <span>AgriGrow</span>
                    <span>Where</span>
                    <span>Farmers</span>
                    <span>can</span>
                    <span>manage</span>
                    <span>their</span>
                    <span>Crops</span>
                    <span>Diseases</span>
                    <span>&</span>
                    <span>Pesticides</span>
                    <span>Crop Predictions &</span>
                    <span>Marketplace</span>
                </div>
                <div className='text-3xl font-Pacifico text-white tracking-wider text-center pt-44 subheading-animation'>
                    Discover Our Services
                </div>
            </div>
            <div className='flex justify-center items-center -mt-52'>
                <div className='w-1/5 h-96 bg-primary mr-6 rounded-md border border-white card animate-fadeIn'>
                    <h4 className='text-white text-center font-semibold text-xl mt-11'>Fertilizer Recomender</h4>
                    <img src='public/fertilizer1-modified.png' className='w-2/3 m-auto mt-10'></img>
                </div>
                <div className='w-1/5 h-96 bg-primary mr-6 rounded-md border border-white card animate-fadeIn'>
                    <h4 className='text-white text-center font-semibold text-xl mt-11'>Pest & Disease Management</h4>
                    <img src='public/pest-modified.png' className='w-2/3 m-auto mt-10'></img>
                </div>
                <div className='w-1/5 h-96 bg-primary mr-6 rounded-md border border-white card animate-fadeIn'>
                    <h4 className='text-white text-center font-semibold text-xl mt-11'>Crop Prediction</h4>
                    <img src='public/wheat-modified.png' className='w-2/3 m-auto mt-10'></img>
                </div>
                <div className='w-1/5 h-96 bg-primary mr-6 rounded-md border border-white card animate-fadeIn'>
                    <h4 className='text-white text-center font-semibold text-xl mt-11'>Farmers' Marketplace</h4>
                    <img src='public/market-modified.png' className='w-2/3 m-auto mt-10'></img>
                </div>
            </div>

            <div className='mt-9 h-28'>
                <div className='text-center'>Lorem ipsum dolor sit consect eiusmod</div>
            </div>
            <div className="flex justify-center">
                <img src='public/aboutus.jpg' className='w-2/5 rounded-md' alt="About Us" />
                <div className='text-center w-2/5 ml-5'>
                    <div className='text-3xl font-Zodiak-Bold mb-4'>About Us</div>
                    <p className='text-lg'>
                        "Our platform is dedicated to helping farmers make smarter, more informed decisions. We provide tailored fertilizer recommendations, accurate crop predictions, and real-time insights on pest and disease management. Our mission is to support farmers in maximizing their yields, improving productivity, and promoting sustainable farming practices through easy-to-use, technology-driven solutions."
                    </p>
                    <div className='bg-primary w-2/4 h-11 rounded-md m-auto mt-9 font-semibold flex justify-center items-center text-white'>Read More</div>
                </div>
            </div>
            {/* Products section */}
            <div id="products" className="bg-gray-200 py-16 px-8 md:px-16 min-h-screen w-[100%] rounded-t-[20%]">
                <h3 className="text-5xl font-light text-pink-500 mb-16 text-center">Store</h3>
                <HCard />
            </div>
            <div>
                <div className='bg-secondary h-[600px]'>
                    <div className='text-center text-3xl font-Zodiak-Bold mt-14 pt-9 mb-16'>Our Unique Features for Farmers</div>
                    <div className='flex justify-center items-center w-11/12 m-auto mb-9'>
                        <div className='w-1/3 ml-8 animate-fade-scale'>
                            <img src='public/fertilizer1.png' className='w-20 h-20 m-auto mb-3' alt="Fertilizer Generator" />
                            <div className='mb-6 font-Zodiak-Bold text-center'>Fertilizer Generator</div>
                            <div className='text-center'>The Fertilizer Generator recommends optimal fertilizers based on soil type, crop needs, and nutrient levels, ensuring efficient crop growth.</div>
                        </div>

                        <div className='w-1/3 ml-8'>
                            <img src='public/wheat.png' className='w-20 h-20 m-auto mb-3' alt="Crop Prediction" />
                            <div className='mb-6 font-Zodiak-Bold text-center'>Crop Prediction</div>
                            <div className='text-center'>The Crop Prediction function analyzes factors like soil, rainfall, and region to suggest the most suitable crops for planting.</div>
                        </div>
                        <div className='w-1/3 ml-8'>

                            <img src='public/pest.png' className='w-20 h-20 m-auto mb-3'></img>
                            <div className='mb-6 font-Zodiak-Bold text-center'>Pest & Decises Management</div>
                            <div className='text-center'>This feature helps identify potential pest infestations and plant diseases, providing solutions for early intervention.</div>
                        </div>
                    </div>
                    <div className='flex justify-center items-center w-11/12 m-auto mb-9'>
                        <div className='w-1/3 ml-8'>
                            <img src='public/market.png' className='w-20 h-20 m-auto mb-3' alt="Marketplace" />
                            <div className='mb-6 font-Zodiak-Bold text-center'>Marketplace</div>
                            <div className='text-center'>The Marketplace allows farmers to buy and sell agricultural products and tools, facilitating a seamless exchange within the community.</div>
                        </div>
                        <div className='w-1/3 ml-8'>

                            <img src='public/crops-analytics.png' className='w-20 h-20 m-auto mb-3'></img>
                            <div className='mb-6 font-Zodiak-Bold text-center'>Crop Managenemt</div>
                            <div className='text-center'> Crop Management provides tools to monitor crop growth, track farming activities, and optimize yield through data-driven decisions.</div>
                        </div>
                        <div className='w-1/3 ml-8'>
                            <img src='public/report.png' className='w-20 h-20 m-auto mb-3'></img>
                            <div className='mb-6 font-Zodiak-Bold text-center'>Report Geanration</div>
                            <div className='text-center'>The Report Generation feature creates detailed reports on farming activities, productivity, and resource usage to support informed decision-making.</div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Home1;
