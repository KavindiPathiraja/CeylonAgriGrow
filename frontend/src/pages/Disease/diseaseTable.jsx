import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { useReactToPrint } from "react-to-print";
import BackgroundImg from '../../assets/wheat.jpg';  // Import the background image

const ReadDiseases = () => {
  const [diseases, setDiseases] = useState([]);
  const navigate = useNavigate();
  const generatePDF = useRef(); // Reference to the div for report generation
  const [search, setSearch] = useState('');
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        const res = await axios.get('http://localhost:5556/diseases/all'); // Update to correct endpoint
        setDiseases(res.data);
        setNoResults(res.data.length === 0);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDiseases();
  }, []);

  const handleDeleteValidation = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handleDelete(id);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5556/diseases/${id}`);
      setDiseases(diseases.filter(disease => disease._id !== id)); // Update state directly
      alert('Deletion successful');
    } catch (error) {
      console.error('Error deleting disease:', error);
      navigate('/Pest&Disease/diseaseList');
    }
  };

  const generateReport = useReactToPrint({
    content: () => generatePDF.current,
    documentTitle: "Disease Details",
    onAfterPrint: () => alert("Report generated successfully")
  });

  return (
    <div className="p-4 justify-center pt-12 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${BackgroundImg})` }}>
      <div className="flex justify-center items-center mb-4"> {/* Centering the search bar */}
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          name="search"
          placeholder="Search diseases"
          className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 h-12 px-4 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg mb-4"
        />
      </div>
      <div className="flex justify-end mb-4"> {/* Adjusted placement for "Add New" button */}
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          onClick={() => navigate('/Pest&Disease/diseaseTable/addNew')}
        >
          Add New
        </button>
      </div>
      <div className="flex flex-col items-center">
        {noResults ? (
          <div className="text-lg font-semibold">No Records</div>
        ) : (
          <div ref={generatePDF} className="w-full max-w-6xl">
            <h1 className="text-2xl font-bold mb-4">Disease Details</h1>
            <table className="min-w-full bg-white bg-opacity-50 border border-gray-300 rounded-lg shadow-md">
              <thead className="bg-gray-100 bg-opacity-70">
                <tr>
                  <th className="px-4 py-2 border-b text-left">Number</th>
                  <th className="px-4 py-2 border-b text-left">Name</th>
                  <th className="px-4 py-2 border-b text-left">Type</th>
                  <th className="px-4 py-2 border-b text-left">Crop Type</th>
                  <th className="px-4 py-2 border-b text-left">Photo</th>
                  <th className="px-4 py-2 border-b text-left no-print">Actions</th>
                </tr>
              </thead>
              <tbody>
                {diseases.filter(disease => {
                  return search.toLowerCase() === '' 
                    ? disease 
                    : disease.DiseaseName.toLowerCase().includes(search.toLowerCase());
                }).map((disease, index) => (
                  <tr key={disease._id} className="border-b">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{disease.DiseaseName}</td>
                    <td className="px-4 py-2">{disease.Type}</td>
                    <td className="px-4 py-2">{disease.CropType}</td>
                    <td className="px-4 py-2">
                      {disease.photo 
                        ? <img src={disease.photo} alt={disease.DiseaseName} className="w-16 h-16 object-cover" /> 
                        : "No Image"}
                    </td>
                    <td className="px-4 py-2 no-print">
                      <button
                        onClick={() => handleDeleteValidation(disease._id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg mr-2 hover:bg-red-700"
                      >
                        Delete
                      </button>
                      <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        onClick={() => navigate(`/Pest&Disease/diseaseTable/UpdateDisease/${disease._id}`)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <button
          className="bg-green-600 text-white px-6 py-2 rounded-lg mt-4 hover:bg-green-700"
          onClick={generateReport}
        >
          Generate Report
        </button>
      </div>
    </div>
  );
};

export default ReadDiseases;
