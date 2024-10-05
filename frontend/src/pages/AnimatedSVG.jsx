import React, { useEffect, useRef, useState } from 'react';
import { svgPath } from '../assets/constants';
import { Link } from "react-router-dom";

const AnimatedSVG = () => {
    const pathRef = useRef(null);
    const svgRef = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const path = pathRef.current;
        const length = path.getTotalLength();

        // Set initial styles for the path
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setInView(true);
                        path.style.transition = 'stroke-dashoffset 5s ease-in';
                        path.style.strokeDashoffset = '0'; // Start animation
                    } else {
                        setInView(false);
                        path.style.strokeDashoffset = length; // Reset if out of view
                    }
                });
            },
            { threshold: 0.1 } // Trigger when 10% of the SVG is visible
        );

        if (svgRef.current) {
            observer.observe(svgRef.current);
        }

        return () => {
            if (svgRef.current) {
                observer.unobserve(svgRef.current);
            }
        };
    }, []);

    return (
        <>
            <div className='flex justify-center mt-14'>
                <div className=''>
                    <svg
                        ref={svgRef}
                        fill="none"
                        viewBox="0 0 512 496"
                        preserveAspectRatio="xMidYMax meet"
                    >
                        <path
                            ref={pathRef}
                            d={svgPath}
                            stroke="#167e4c"
                            strokeWidth="7"
                        />
                    </svg>
                </div>
                <div className='w-8/12 ml-5'>
                    <h1 className='text-5xl font-Carnero mb-5'>Scroll down to see the animation</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur voluptas error omnis sint et rerum beatae, hic quaerat tempora placeat eligendi, vitae pariatur nisi quidem? Harum quas numquam tempore nam!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas eos quae autem assumenda deleniti dignissimos quasi blanditiis fuga accusamus quo est ipsa sed nisi, temporibus atque inventore ipsam. Corrupti, autem.
                    </p>
                    <button className="mt-4 bg-secondary hover:bg-zinc-300 text-grey-300 font-bold py-2 px-4 border-b-4 border-lime-800 hover:border-lime-900 rounded mr-4" type="submit">
                        Learn More
                    </button>
                    <a href="/allCrops">
                        <button className="mt-4 bg-secondary hover:bg-zinc-300 text-grey-300 font-bold py-2 px-4 border-b-4 border-lime-800 hover:border-lime-900 rounded mr-4 ml-4" type="submit">
                            See All My Crops
                        </button>
                    </a>
                    <a href="/addCrop">
                        <button className="mt-4 bg-secondary hover:bg-zinc-300 text-grey-300 font-bold py-2 px-4 border-b-4 border-lime-800 hover:border-lime-900 rounded mr-4 ml-4" type="submit">
                            Add new Crop
                        </button>
                    </a>
                </div>
            </div>
            {/* <div className='flex justify-center'>
                <div className='w-2/3'>
                    <h2>See All My Cops</h2>
                </div>
                <div className='w-1/3'>
                    <h2>See All My Cops</h2>
                </div>

            </div> */}
        </>
    );
};

export default AnimatedSVG;

