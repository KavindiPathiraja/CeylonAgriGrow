import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function ReportProduct({ filteredProducts }) {
  function generatePDF(filteredProducts) {
    const doc = new jsPDF();
    const tableColumn = [
      "No",
      "Product No",
      "Product Name",
      "Category",
      "Quantity",
      "Selling Price",
      "Farmer Name",
      "Farmer Email",
    ];
    const tableRows = [];

    filteredProducts
      .slice(0) // Ensure reverse order if needed
      .reverse()
      .map((product, index) => {
        const data = [
          index + 1,
          product.ProductNo,
          product.ProductName,
          product.Category,
          product.Quantity,
          product.SellingPrice,
          product.FarmerName,
          product.FarmerEmail,
        ];
        tableRows.push(data);
      });

    const date = Date().split(" ");
    const dateStr = date[1] + "-" + date[2] + "-" + date[3];

    // Add title, date, and header
    doc.setFontSize(28).setFont("Mooli", "bold").setTextColor("red");
    doc.text("Farmers' Marketplace", 60, 15);

    doc.setFont("helvetica", "normal").setFontSize(20).setTextColor(0, 0, 0);
    doc.text("Product Details Report", 65, 25);

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
    doc.save(`Product-Details-Report_${dateStr}.pdf`);
  }

  return (
    <div>
      <button
        onClick={() => generatePDF(filteredProducts)}
        className="btn2 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Product Report
      </button>
    </div>
  );
}
