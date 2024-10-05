import React from 'react';
import AnimationComponent from './Animation';
import AnimationComponent1 from './Farmers';
import Header from '../components/header1';
import Footer from '../components/footer';
import '../components/custom.css';
import { useParams } from 'react-router-dom';
import HCard from './HomeCard/Hcard';

const ReadOneHome = () => {
  const { FarmerID } = useParams(); // Extract FarmerID from the route

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
        {['Fertilizer Recommender', 'Pest & Disease Management', 'Crop Prediction', "Farmers' Marketplace"].map((service, index) => (
          <div key={index} className='w-1/5 h-96 bg-primary mr-6 rounded-md border border-white card animate-fadeIn'>
            <h4 className='text-white text-center font-semibold text-xl mt-11'>{service}</h4>
          </div>
        ))}
      </div>

      <div className='mt-9 h-28'>
        <div className='text-center'>Lorem ipsum dolor sit consect eiusmod</div>
      </div>
      <div className="flex justify-center">
        <img src='/aboutus.jpg' className='w-2/5 rounded-md' alt="About Us" />
        <div className='text-center w-2/5 ml-5'>
          <div className='text-3xl font-Zodiak-Bold mb-4'>About US</div>
          <p className='text-lg'>
            "Our platform is dedicated to helping farmers make smarter, more informed decisions. We provide tailored fertilizer recommendations, accurate crop predictions, and real-time insights on pest and disease management. Our mission is to support farmers in maximizing their yields, improving productivity, and promoting sustainable farming practices through easy-to-use, technology-driven solutions."
          </p>
          <div className='bg-primary w-2/4 h-11 rounded-md m-auto mt-9 font-semibold flex justify-center items-center text-white'>Read More</div>
        </div>
      </div>
      
      {/* Products section */}
      <div id="products" className="bg-gray-200 py-16 px-8 md:px-16 min-h-screen w-[100%] rounded-t-[20%]">
        <h3 className="text-5xl font-light text-pink-500 mb-16 text-center">Store</h3>
        <HCard FarmerID={FarmerID} />
      </div>

      <div className='bg-secondary h-[600px]'>
        <div className='text-center text-3xl font-Zodiak-Bold mt-14 pt-9 mb-16'>Our Unique Features for Farmers</div>
        <div className='flex justify-center items-center w-11/12 m-auto mb-9'>
          {[
            { img: '/fertilizer1.png', title: 'Fertilizer Generator' },
            { img: '/wheat.png', title: 'Crop Prediction' },
            { img: '/pest.png', title: 'Pest & Diseases Management' },
            { img: '/market.png', title: 'Marketplace' },
            { img: '/crops-analytics.png', title: 'Crop Management' },
            { img: '/report.png', title: 'Report Generation' }
          ].map((feature, index) => (
            <div key={index} className='w-1/3 ml-8'>
              <img src={feature.img} className='w-20 h-20 m-auto mb-3' alt={feature.title} />
              <div className='mb-6 font-Zodiak-Bold text-center'>{feature.title}</div>
              <div className='text-center'>Lorem ipsum dolor sit amet, consing eli do eiod, Lorem ipsum dolor sit amet</div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ReadOneHome;
