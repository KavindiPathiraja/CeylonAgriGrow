import React, { useState, useEffect } from "react";
import axios from "axios";
import "./slider.css";
import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI('AIzaSyBMvLY-N-RS0i0NpIHSmXmCMFm410RjVfQ');
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const Slider = () => {
    const [myCrops, setMyCrops] = useState([]);
    const [slides, setSlides] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [showPopupFertilizer, setShowPopupFertilizer] = useState(false);
    const [search, setSearch] = useState('');
    const [aiResponse, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios
            .get("http://localhost:5556/myCrops")
            .then((response) => {
                const crops = response.data;
                setMyCrops(crops);

                // Create slides from crops and update the slides state
                const newSlides = crops.map((crop) => ({
                    img: crop.Img,
                    name: crop.CropName,
                    soilType: crop.SoilType,
                    rain: crop.RainFall,
                    temperature: crop.Temperature,
                    growthStage: crop.GrowthStage,
                    soilpHLevel: crop.SoilpHLevel,
                    cropArea: crop.CropArea,
                    irrigationType: crop.IrrigationType,
                    scientificName: crop.ScientificName,
                    location: crop.Location
                }));
                setSlides(newSlides);
            })
            .catch((err) => console.log(err));
    }, []);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastIndex = currentIndex === slides.length - 1;
        const newIndex = isLastIndex ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const togglePopupFretilizer = () => {
        setShowPopupFertilizer(!showPopupFertilizer);
    };

    // Generative AI Call to fetch dishes

    async function aiRun() {
        setLoading(true);
        const prompt = `give me a list of name for the best 5 fretilizers for ${search} a person can find in Sri Lanka and give a little description. give me the fertilizers in <ul><li className="fertilizer"><h4 style="font-weight:bolder">fretilzer name</h4><p>description</p></li><br></ul>`;
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        setResponse(text);
        setLoading(false);
    }


    const handleClick = (crop) => {
        setShowPopupFertilizer(!showPopupFertilizer);
        setSearch(crop);
        aiRun();
    }

    return (
        <>
            <div className="bg-primary">
                <div className="slider pt-12">
                    {slides.length > 0 && (
                        <div className="slide-wrapper">
                            <div className="cropImg">
                                <img src={slides[currentIndex]?.img} alt="Crop" />
                            </div>
                        </div>
                    )}
                </div>
                <div className="cropName pb-6">
                    <h2 className="slide-up-text">
                        {slides[currentIndex]?.name}
                    </h2>
                </div>
                <img src="next.png" className="btn-pre" onClick={prevSlide} alt="Previous" />
                <div className="wrap text-box">
                    <button className="button" onClick={togglePopup}><img src="/info.png" className="w-7" /></button>
                </div>
                <div className="wrap fertilizer">
                    <button className="button" onClick={() => handleClick(slides[currentIndex])}><img src="/fertilizer.png" className="w-9" /></button>
                </div>
                <img src="next1.png" className="btn-next" onClick={nextSlide} alt="Next" />
                {showPopup && (
                    <div className="overlay" id="overlay">
                        <div
                            className="popup"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="modal_btn">
                                <button id="close" onClick={togglePopup}>&times;</button>
                            </div>
                            <div className="modal_info">
                                <h2>Information</h2>
                                <h6>Scientific Name: <i>{slides[currentIndex]?.scientificName}</i></h6>
                                <h6>Soil Type: {slides[currentIndex]?.soilType}</h6>
                                <h6>Soil pH Level: {slides[currentIndex]?.soilpHLevel}</h6>
                                <h6>Growth Stage: {slides[currentIndex]?.growthStage}</h6>
                                <h6>Location: {slides[currentIndex]?.location}</h6>
                                <h6>Crop Area: {slides[currentIndex]?.cropArea}</h6>
                                <h6>Rain Fall: {slides[currentIndex]?.rain}</h6>
                                <h6>Irrigation Type: {slides[currentIndex]?.irrigationType}</h6>
                                <h6>Temperature: {slides[currentIndex]?.temperature}</h6>
                            </div>
                        </div>
                    </div>
                )}
                {showPopupFertilizer && (
                    <div className="overlay" id="overlay">
                        <div
                            className="popup"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="modal_btn">
                                <button id="close" onClick={togglePopupFretilizer}>&times;</button>
                            </div>
                            <div className="modal_info">
                                {loading == true && search != '' ?
                                    <>
                                        <div className="loader">
                                            <div className="inner one"></div>
                                            <div className="inner two"></div>
                                            <div className="inner three"></div>
                                        </div>

                                        {/* <p style={{ margin: '30px 0' }}>Loading ...</p> */}
                                    </>
                                    :
                                    <div style={{ margin: '30px 0' }}>
                                        <div dangerouslySetInnerHTML={{ __html: aiResponse }} />
                                    </div>}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Slider;