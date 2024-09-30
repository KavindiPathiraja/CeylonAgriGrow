import React, { useEffect, useRef, useState } from "react";
import './style.css';

const AnimationComponent1 = () => {
  const pathRef = useRef(null);
  const sectionRef = useRef(null);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const path = pathRef.current;
    const length = path.getTotalLength();

    path.style.strokeDasharray = `${length} ${length}`;
    path.style.strokeDashoffset = length;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const sectionTop = sectionRef.current.offsetTop; // Get the position of the section after which animation should start
      const scrollPercentage = (scrollTop - sectionTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
      const drawLength = length * scrollPercentage;

      if (scrollTop >= sectionTop) {
        path.style.strokeDashoffset = length - drawLength;

        if (scrollPercentage >= 1) {
          setAnimationComplete(true);
          document.body.style.backgroundColor = "#19342f"; // Change to the desired color when the animation ends
          path.style.stroke = "#ffffff";
        } else if (animationComplete && scrollPercentage < 1) {
          document.body.style.backgroundColor = "#ffffff"; // Revert to original color when scrolling up
          path.style.stroke = "#23603F";
          setAnimationComplete(false); // Reset animation completion when scrolling up
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [animationComplete]);

  return (
    <div>
      <section ref={sectionRef}>
        <img alt="Placeholder" />
      </section>
      <section className="one">
        <h1 className="scroll" data-rate=".4" data-direction="vertical">
          Local Farmers
        </h1>
        <br />
        <p>are the backbone of the country</p>
      </section>
      <div className="line-container">
        <svg fill="none" viewBox="0 0 178 403" preserveAspectRatio="xMidYMax meet"><path ref={pathRef} d="m1 401.5c13.8333-9 48.8-27.8 78-31m0 0c0-11.6 0-44.167 0-59 14.6667 2.667 43.531 2.699 54.5-6 14.5-11.5 25-26.5 23-67-3.5 0-24.5-3-37.5 0s-26.5 15-30 20c-5.5 6-10 24-10 28.5h-25c-11.5-.167-34-4-41-15.5-2-2-9.5-14.5-9.5-25.5 0-6 0-24.833 0-33.5 11.8333-.5 37-.4 43 4 2.5 1.5 31.5 16.5 31 34.5-.4 14.4-.1667-22 0-42h31c14.333-.667 35.5-10.5 42-31 6.901-21.764 6-38 6-43h-26.5c-11.833 1-36.9 6.9-42.5 22.5-1 2.5-7 16.5-7 26-10.4 0-27 0-34 0-11-1-31-7.5-38-21.5-4-10.4-5-19.333-5-22.5v-28.5l34.5 1c4.5.833 16.6 3.1 21 7.5s10 11.5 12 16c2.3987 5.397 5.5 9.9 5.5 13.5l1.5-41m1 262.5c27.167 4.167 84.7 16.2 97.5 31m-98.5-293.5c8.6667-8.1667 26.9-26.7 30.5-35.5s3-22.6667 1.5-28.5c-4.371-17-26.4-42.80002-32-42.00002-11.5 1.64286-31.5 30.80002-31.5 42.00002-1.3333 5.5-1.9657 17.6199 0 24.5 3 10.5 22 35.5 31.5 39.5z" stroke="#167e4c" stroke-width="4" /></svg>
      </div>
    </div>
  );
};

export default AnimationComponent1;
