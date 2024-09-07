import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function ReportFarmer({ filteredFarmers }) {
  function generatePDF(filteredFarmers) {
    const doc = new jsPDF();
    const tableColumn = [
      "No",
      "Farmer ID",
      "Farmer Name",
      "Contact No",
      "Email",
      "Address",
    ];
    const tableRows = [];

    filteredFarmers
      .slice(0) // Ensure reverse order if needed
      .reverse()
      .map((farmer, index) => {
        const data = [
          index + 1,
          farmer.FarmerID,
          farmer.FarmerName,
          farmer.ContactNo,
          farmer.Email,
          farmer.Address,
        ];
        tableRows.push(data);
      });

    const date = Date().split(" ");
    const dateStr = date[1] + "-" + date[2] + "-" + date[3];

    // Add title, date, and header
    doc.setFontSize(28).setFont("Mooli", "bold").setTextColor("red");
    doc.text("Farmers' Marketplace", 60, 15);

    doc.setFont("helvetica", "normal").setFontSize(20).setTextColor(0, 0, 0);
    doc.text("Farmer Details Report", 65, 25);

    doc.setFont("times", "normal").setFontSize(15).setTextColor(100, 100, 100);
    doc.text(`Report Generated Date: ${dateStr}`, 65, 35);

    doc
      .setFont("courier", "normal")
      .setFontSize(12)
      .setTextColor(150, 150, 150);
    doc.text("Farmers' Marketplace, AgriHub, Sri Lanka", 30, 45);

    doc
      .setFont("courier", "normal")
      .setFontSize(12)
      .setTextColor(150, 150, 150);
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
    doc.save(`Farmer-Details-Report_${dateStr}.pdf`);
  }

  return (
    <div>
      <button
        onClick={() => generatePDF(filteredFarmers)}
        className="btn2 px-4 py-2 bg-green-500 text-white rounded-lg"
      >
        Farmer Report
      </button>
    </div>
  );
}
