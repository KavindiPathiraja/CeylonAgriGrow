import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";

export default function ReportCrop() {
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const response = await axios.get("http://localhost:5556/crops/getallcrops");
        setCrops(response.data);
      } catch (error) {
        console.error("Error fetching crop data:", error);
      }
    };

    fetchCrops();
  }, []);

  function generatePDF() {
    const doc = new jsPDF();
    const tableColumn = [
      "No",
      "Province",
      "District",
      "Land Area",
      "Distance to Water",
      "Soil Type",
      "Soil pH",
      "Rainfall",
      "Past Crop",
      "Labour",
      "Date of Planting"
    ];
    const tableRows = [];

    crops
      .slice(0) // Optional: reverse order if needed
      .reverse()
      .map((crop, index) => {
        const data = [
          index + 1,
          crop.province,
          crop.district,
          crop.landarea,
          crop.distancewater,
          crop.soiltype,
          crop.soilph,
          crop.rainfall,
          crop.pastCrop,
          crop.labour,
          new Date(crop.dateOfPlanting).toLocaleDateString(),
        ];
        tableRows.push(data);
      });

    const date = new Date();
    const dateStr = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;

    // Add title, date, and header
    doc.setFontSize(28).setFont("helvetica", "bold").setTextColor("green");
    doc.text("Crop Prediction Report", 60, 15);

    doc.setFont("helvetica", "normal").setFontSize(20).setTextColor(0, 0, 0);
    doc.text("Crop Details", 65, 25);

    doc.setFont("times", "normal").setFontSize(15).setTextColor(100, 100, 100);
    doc.text(`Report Generated Date: ${dateStr}`, 65, 35);

    doc.setFont("courier", "normal").setFontSize(12).setTextColor(150, 150, 150);
    doc.text("Farmers' Marketplace, AgriHub, Sri Lanka", 30, 45);

    doc.text(
      "--------------------------------------------------------------------------------------------------",
      0,
      49
    );

    // Generate table
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 50,
      styles: { fontSize: 9 },
      headStyles: {
        fillColor: [31, 41, 55],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
    });

    // Save the generated PDF
    doc.save(`Crop-Prediction-Report_${dateStr}.pdf`);
  }

  return (
    <div>
      <button
        onClick={generatePDF}
        className="btn2 px-4 py-2 bg-green-500 text-white rounded-lg"
      >
        Generate Crop Report
      </button>
    </div>
  );
}
