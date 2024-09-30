import React, { useEffect, useRef, useState } from "react";
import './style.css';

const AnimationComponent = () => {
  const pathRef = useRef(null);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const path = pathRef.current;
    const length = path.getTotalLength();
    let lastScrollTop = 0;

    path.style.strokeDasharray = `${length} ${length}`;
    path.style.strokeDashoffset = length;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollPercentage = scrollTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
      const drawLength = length * scrollPercentage;

      path.style.strokeDashoffset = length - drawLength;

      if (scrollPercentage >= 1) {
        setAnimationComplete(true);
        document.body.style.backgroundColor = "#19342f"; // Change to the desired color when the animation ends
        path.style.stroke = "#ffffff";
      } else if (animationComplete && scrollPercentage < 1) {
        document.body.style.backgroundColor = "#ffffff"; // Revert to original color when scrolling up
        path.style.stroke = "#23603F";
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For mobile or negative scrolling
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [animationComplete]);

  return (
    <div>
      <div className="line-container">
        {/* <svg viewBox="0 0 1512 982" fill="none" preserveAspectRatio="xMidYMax meet">
          <path
            ref={pathRef}
            d="M726 0.5V218.5C706 287 599.3 372.9 414.5 376.5C368.5 376.5 353.5 373 342 370V360C331.5 358.5 311.3 353.7 314.5 326.5C314.5 317 315 311 304.5 306.5C294 302 307.5 299 314.5 300.5C321.5 302 331 303 336.5 308.5C339.5 300.5 345 292.5 358.5 289.5C372 286.5 357.5 246.5 339 249C320.5 251.5 309 295.5 314.5 295.5C318.9 295.5 329.333 298.833 334 300.5C343.667 295.167 365.8 285 377 287C391 289.5 369.5 292 371 298C368.2 302.8 368.167 311.333 368.5 315C369.5 323.5 369.9 342.1 363.5 348.5C355.5 356.5 332 365 330.5 366C329.3 366.8 330.602 391.027 329.5 406C328.973 413.152 334 427 355.5 445C377 463 513.572 581.232 726 565C876.5 553.5 1066 629.333 1134 665.5V637.5C1129 638.167 1118.9 637.8 1118.5 631C1118.1 624.2 1118.33 607.167 1118.5 599.5H1134V633.5C1138.67 634.333 1148 633.9 1148 625.5C1148 617.1 1148 604.667 1148 599.5L1155.5 576.5C1155.83 584.5 1161.8 601 1183 603C1193 603 1209.5 592.5 1210.5 576.5C1210.5 575.3 1210.5 573 1210.5 572C1191 574.833 1148.9 577.1 1136.5 563.5C1134.5 559.1 1148.67 555 1156 553.5L1162 533C1168.33 529.333 1185.4 524.1 1203 532.5C1207.4 547.3 1208.83 552 1209 552.5C1216.67 553.667 1231.6 557.2 1230 562C1228.4 566.8 1218 570.333 1213 571.5L1219 619.5C1229 622 1249.1 628.9 1249.5 636.5C1249.9 644.1 1249.67 655.667 1249.5 660.5H1227V640.5C1226.33 639.5 1224.3 637.8 1221.5 639C1221.5 635.8 1221.5 628 1221.5 624.5C1211.67 620.5 1186.2 613.9 1163 619.5C1163 628.7 1163 637.333 1163 640.5C1171.67 643.667 1191.8 648.1 1203 640.5C1211 640.5 1220.33 640.5 1224 640.5V660.5L1148 661.5V705.5C1153.67 734.333 1144.5 799.1 1062.5 827.5C960 863 776 869 779.5 944C779.5 962.4 779.5 973.667 779.5 977"
            stroke="#23603F"
            strokeWidth="4"
          />
        </svg> */}
        <svg fill="none" viewBox="0 0 178 403" preserveAspectRatio="xMidYMax meet"><path ref={pathRef} d="m1 401.5c13.8333-9 48.8-27.8 78-31m0 0c0-11.6 0-44.167 0-59 14.6667 2.667 43.531 2.699 54.5-6 14.5-11.5 25-26.5 23-67-3.5 0-24.5-3-37.5 0s-26.5 15-30 20c-5.5 6-10 24-10 28.5h-25c-11.5-.167-34-4-41-15.5-2-2-9.5-14.5-9.5-25.5 0-6 0-24.833 0-33.5 11.8333-.5 37-.4 43 4 2.5 1.5 31.5 16.5 31 34.5-.4 14.4-.1667-22 0-42h31c14.333-.667 35.5-10.5 42-31 6.901-21.764 6-38 6-43h-26.5c-11.833 1-36.9 6.9-42.5 22.5-1 2.5-7 16.5-7 26-10.4 0-27 0-34 0-11-1-31-7.5-38-21.5-4-10.4-5-19.333-5-22.5v-28.5l34.5 1c4.5.833 16.6 3.1 21 7.5s10 11.5 12 16c2.3987 5.397 5.5 9.9 5.5 13.5l1.5-41m1 262.5c27.167 4.167 84.7 16.2 97.5 31m-98.5-293.5c8.6667-8.1667 26.9-26.7 30.5-35.5s3-22.6667 1.5-28.5c-4.371-17-26.4-42.80002-32-42.00002-11.5 1.64286-31.5 30.80002-31.5 42.00002-1.3333 5.5-1.9657 17.6199 0 24.5 3 10.5 22 35.5 31.5 39.5z" stroke="#167e4c" stroke-width="4" /></svg>
      </div>
      <section>
        <img alt="Placeholder" />
      </section>
      <section className="one">
        <h1 className="scroll" data-rate=".4" data-direction="vertical">
          Local Farmers
        </h1>
        <br />
        <p>are the backbone of the country</p>
      </section>
    </div>
  );
};

export default AnimationComponent;
