import React from 'react';
import AnimationComponent from './Animation';
import AnimationComponent1 from './Farmers';
import Header from '../components/header';
import Footer from '../components/footer';

const Home = () => {
  return (
    <>
      <Header />
      <div className="bg-[url('/home1.jpg')] bg-cover h-screen overflow-hidden">
        <div className='font-semibold text-4xl w-3/5 text-center m-auto pt-32 text-primary leading-tight'>Welcome to Ceylon AgriGrow Where Faramers can manage their Crops & Pesticieds</div>
        <div className='text-3xl font-Pacifico text-white tracking-wider text-center pt-32'>Discover Our Services</div>
      </div>
      <div className='flex justify-center items-center -mt-52'>
        <div className='w-1/5 h-96 bg-primary mr-6 rounded-md border border-white'>
          <h4 className='text-white text-center font-semibold text-xl mt-11'>Fertilizer Recomender</h4>
        </div>
        <div className='w-1/5 h-96 bg-primary mr-6 rounded-md border border-white'>
          <h4 className='text-white text-center font-semibold text-xl mt-11'>Pest & Disease Management</h4>
        </div>
        <div className='w-1/5 h-96 bg-primary mr-6 rounded-md border border-white'>
          <h4 className='text-white text-center font-semibold text-xl mt-11'>Crop Prediction</h4>
        </div>
        <div className='w-1/5 h-96 bg-primary mr-6 rounded-md border border-white'>
          <h4 className='text-white text-center font-semibold text-xl mt-11'>Farmers' Marketplace</h4>
        </div>
      </div>
      <div className='mt-9 h-28'>
        <div className='text-center'>Lorem ipsum dolor sit consect eiusmod</div>
      </div>
      <div className="flex justify-center">
        <img src='public/aboutus.jpg' className='w-2/5 rounded-md'></img>
        <div className='text-center w-2/5 ml-5'>
          <div className='text-2xl font-bold mb-4'>About US</div>
          <p>
            "Our platform is dedicated to helping farmers make smarter, more informed decisions. We provide tailored fertilizer recommendations, accurate crop predictions, and real-time insights on pest and disease management. Our mission is to support farmers in maximizing their yields, improving productivity, and promoting sustainable farming practices through easy-to-use, technology-driven solutions."
          </p>
          <div className='bg-secondary w-2/4 h-11 rounded-md m-auto mt-9 font-semibold flex justify-center items-center'>Read More</div>
        </div>
      </div>
      <div>
        <div className='bg-slate-300 h-[450px]'>
          <div className='text-center text-2xl font-bold mt-14 pt-9 mb-16'>Our Unique Features for Farmers</div>
          <div className='flex justify-center items-center w-11/12 m-auto mb-9'>
            <div className='w-1/3 ml-8'>
              <div className='mb-6 font-bold'>Fertilizer Genarator</div>
              <div>Lorem ipsum dolor sit amet, consing eli do eiod, Lorem ipsum dolor sit amet</div>
            </div>
            <div className='w-1/3 ml-8'>
              <div className='mb-6 font-bold'>Crop Prediction</div>
              <div>Lorem ipsum dolor sit amet, consing eli do eiod, Lorem ipsum dolor sit amet</div>
            </div>
            <div className='w-1/3 ml-8'>
              <div className='mb-6 font-bold'>Pest & Decises Management</div>
              <div>Lorem ipsum dolor sit amet, consing eli do eiod, Lorem ipsum dolor sit amet</div>
            </div>
          </div>
          <div className='flex justify-center items-center w-11/12 m-auto mb-9'>
            <div className='w-1/3 ml-8'>
              <div className='mb-6 font-bold'>Marketplace</div>
              <div>Lorem ipsum dolor sit amet, consing eli do eiod, Lorem ipsum dolor sit amet</div>
            </div>
            <div className='w-1/3 ml-8'>
              <div className='mb-6 font-bold'>Crop Managenemt</div>
              <div>Lorem ipsum dolor sit amet, consing eli do eiod, Lorem ipsum dolor sit amet</div>
            </div>
            <div className='w-1/3 ml-8'>
              <div className='mb-6 font-bold'>Report Geanration</div>
              <div>Lorem ipsum dolor sit amet, consing eli do eiod, Lorem ipsum dolor sit amet</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}



export default Home