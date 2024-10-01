import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useReactToPrint } from "react-to-print";

const Sell = () => {
    const { id } = useParams();
    const [disease, setDisease] = useState(null);
    const printRef = useRef();

    useEffect(() => {
        const fetchDisease = async () => {
            try {
                const response = await axios.get(`http://localhost:5556/diseases/${id}`);
                setDisease(response.data);
            } catch (error) {
                console.error('Error fetching disease details:', error);
            }
        };

        fetchDisease();
    }, [id]);

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
        documentTitle: "Disease Report",
        onAfterPrint: () => alert("Report generated successfully")
    });

    if (!disease) {
        return <div className="text-center text-lg">Loading...</div>;
    }

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h1 className="text-3xl font-bold mb-4">{disease.DiseaseName}</h1>
                <div className="mb-4">
                    {disease.photo && (
                        <img
                            src={disease.photo}
                            alt={disease.DiseaseName}
                            className="w-48 h-auto rounded-lg shadow-md mb-4"
                        />
                    )}
                    <label className="block text-gray-700 font-semibold mb-2">
                        <strong>Type:</strong> {disease.Type}
                    </label>
                    <label className="block text-gray-700 font-semibold mb-2">
                        <strong>Crop Type:</strong> {disease.CropType}
                    </label>
                    <label className="block text-gray-700 font-semibold mb-2">
                        <strong>Information:</strong> {disease.Information}
                    </label>
                    <label className="block text-gray-700 font-semibold mb-4">
                        <strong>Remedy:</strong> {disease.Remedy}
                    </label>
                </div>
                <button
                    onClick={handlePrint}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                    Generate Report
                </button>
            </div>

            {/* Print component */}
            <div style={{ display: 'none' }}>
                <div ref={printRef} className="p-4 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
                    <h1 className="text-3xl font-bold mb-4">{disease.DiseaseName}</h1>
                    <div className="mb-4">
                        {disease.photo && (
                            <img
                                src={disease.photo}
                                alt={disease.DiseaseName}
                                className="w-48 h-auto rounded-lg shadow-md mb-4"
                            />
                        )}
                        <label className="block text-gray-700 font-semibold mb-2">
                            <strong>Type:</strong> {disease.Type}
                        </label>
                        <label className="block text-gray-700 font-semibold mb-2">
                            <strong>Crop Type:</strong> {disease.CropType}
                        </label>
                        <label className="block text-gray-700 font-semibold mb-2">
                            <strong>Information:</strong> <br/>{disease.Information}
                        </label>
                        <label className="block text-gray-700 font-semibold mb-4">
                            <strong>Remedy:</strong><br/> {disease.Remedy}
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sell;
