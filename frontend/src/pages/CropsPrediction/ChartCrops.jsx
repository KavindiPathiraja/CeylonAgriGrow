import React, { useEffect, useState } from 'react';
import ApexCharts from 'apexcharts';
import axios from 'axios';

const CropPieChart = () => {
  const [chartOptions, setChartOptions] = useState({
    series: [], // Placeholder for data
    chart: {
      width: '600px', // Set the width of the chart
      height: '400px', // Set the height of the chart
      type: 'pie',
    },
    labels: [], // Placeholder for province names
    theme: {
      monochrome: {
        enabled: true,
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          offset: -5,
        },
      },
    },
    grid: {
      padding: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
    },
    dataLabels: {
      formatter(val, opts) {
        const name = opts.w.globals.labels[opts.seriesIndex];
        return [name, val.toFixed(1) + '%'];
      },
    },
    legend: {
      show: false,
    },
  });

  useEffect(() => {
    // Fetch data from the backend
    const fetchCrops = async () => {
      try {
        const response = await axios.get('http://localhost:5556/crops/getallcrops');
        const cropData = response.data;

        // Process the data to extract provinces and their counts
        const provinceCounts = {};
        
        cropData.forEach(crop => {
          const province = crop.province;
          if (provinceCounts[province]) {
            provinceCounts[province]++;
          } else {
            provinceCounts[province] = 1;
          }
        });

        // Prepare data for the chart
        const labels = Object.keys(provinceCounts);
        const series = Object.values(provinceCounts);

        // Update chart options with the fetched data
        setChartOptions(prevOptions => ({
          ...prevOptions,
          series,
          labels,
        }));

        // Render the updated chart
        const chart = new ApexCharts(document.querySelector("#chart"), {
          ...chartOptions,
          series,
          labels,
        });

        chart.render();

      } catch (error) {
        console.error('Error fetching crop data:', error);
      }
    };

    fetchCrops();
  }, []);

  return (
    <div style={{ textAlign: 'center' }}> {/* Center align the title and chart */}
      <h2>Provinces Involved in Crop Prediction</h2> {/* Title */}
      <div
        id="chart"
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          border: '2px solid #333', // Add a border (black color)
          borderRadius: '8px', // Optional: add rounded corners
          padding: '10px', // Optional: add padding inside the border
        }}
      ></div>
    </div>
  ); // Center the chart container
};

export default CropPieChart;
