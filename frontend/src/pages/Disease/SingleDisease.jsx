import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useReactToPrint } from "react-to-print";
import Modal from 'react-modal';  // Import a modal library
import { FaEye } from "react-icons/fa";  // Import an eye icon for preview
import BackgroundImg from '../../assets/plant-growing-from-soil.jpg';  // Import the background image

Modal.setAppElement('#root'); // To prevent screen readers from reading the background content while the modal is open

const Sell = () => {
    const { id } = useParams();
    const [disease, setDisease] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
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

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    if (!disease) {
        return <div className="text-center text-lg">Loading...</div>;
    }

    return (
    <div
        style={{
            backgroundImage:`url(${BackgroundImg})`,
            backgroundSize: 'cover',
                backgroundPosition: 'center',
        }}
    > 
        <div className="p-4 max-w-3xl mx-auto">
            <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
                <h1 className="text-4xl font-bold mb-6 text-green-800">{disease.DiseaseName}</h1>
                <div className="mb-6 relative group">
                    {disease.photo && (
                        <div className="relative">
                            {/* Image with hover effect and click to open modal */}
                            <img
                                src={disease.photo}
                                alt={disease.DiseaseName}
                                className="w-full h-64 object-cover rounded-lg shadow-lg mb-6 cursor-pointer group-hover:opacity-75 transition-opacity duration-300"
                                 // Open modal on image click
                            />
                            {/* Preview icon shown on hover */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                onClick={toggleModal} 
                            >
                                <FaEye className="text-white text-6xl" />
                            </div>
                        </div>
                    )}
                    <label className="block text-gray-800 font-semibold mb-4 text-justify">
                        <span className="font-bold text-green-700 text-lg">Type:</span> {disease.Type}
                    </label>
                    <label className="block text-gray-800 font-semibold mb-4 text-justify">
                        <span className="font-bold text-green-700 text-lg">Crop Type:</span> {disease.CropType}
                    </label>
                    <label className="block text-gray-800 font-semibold mb-4 text-justify">
                        <span className="font-bold text-green-700 text-lg">Information:</span> <br /> {disease.Information}
                    </label>
                    <label className="block text-gray-800 font-semibold mb-4 text-justify">
                        <span className="font-bold text-green-700 text-lg">Remedy:</span> <br /> {disease.Remedy}
                    </label>
                </div>
                <button
                    onClick={handlePrint}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300 w-full text-lg font-semibold"
                >
                    Download
                </button>
            </div>

            {/* Modal for full-screen image preview */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={toggleModal}
                contentLabel="Image Preview"
                className="fixed inset-0 flex items-center justify-center"
                overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center"
            >
                <div className="relative w-full h-full flex items-center justify-center">
                    <button className="absolute top-4 right-4 text-white text-4xl z-10" onClick={toggleModal}>
                        &times;
                    </button>
                    {disease.photo && (
                        <img
                            src={disease.photo}
                            alt={disease.DiseaseName}
                            className="max-w-full max-h-full object-contain"
                        />
                    )}
                </div>
            </Modal>

            {/* Print component */}
            <div style={{ display: 'none' }}>
                <div ref={printRef} className="p-4 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
                    <h1 className="text-3xl font-bold mb-4">{disease.DiseaseName}</h1>
                    <div className="mb-4">
                        {disease.photo && (
                            <img
                                src={disease.photo}
                                alt={disease.DiseaseName}
                                className="w-full h-64 object-cover rounded-lg shadow-md mb-4"
                            />
                        )}
                        <label className="block text-gray-700 font-semibold mb-2 text-justify">
                            <strong className="text-lg">Type:</strong> {disease.Type}
                        </label>
                        <label className="block text-gray-700 font-semibold mb-2 text-justify">
                            <strong className="text-lg">Crop Type:</strong> {disease.CropType}
                        </label>
                        <label className="block text-gray-700 font-semibold mb-2 text-justify">
                            <strong className="text-lg">Information:</strong> <br /> {disease.Information}
                        </label>
                        <label className="block text-gray-700 font-semibold mb-4 text-justify">
                            <strong className="text-lg">Remedy:</strong> <br /> {disease.Remedy}
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div> 
    );
};

export default Sell;

