import React from 'react';
import Slider from '../components/Slider';
import Header from '../components/header';
import AnimationComponent1 from './Farmers';
import AnimatedSVG from './AnimatedSVG';
import Footer from '../components/footer';

function MyCrops() {
    return (
        <>
            <Header />
            <Slider />
            <AnimatedSVG />
            <Footer />
        </>
    );

}

export default MyCrops;