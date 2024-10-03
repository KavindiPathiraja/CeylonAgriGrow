import { Link } from "react-router-dom";

const DiseaseDetails = ({ disease }) => {
  return (
    <Link to={`/Diseaselist/${disease._id}`}>
      <div className="border border-gray-300 p-4 m-2 w-80 h-80 rounded-lg shadow-md"
        style={{backgroundColor:"white", borderRadius:"20px"}}
      >
        {/* Increased bottom margin for disease name */}
        <h2 className="text-3xl font-roboto mb-6">{disease.DiseaseName}</h2> 
        
        {disease.photo && (
          <img
            src={disease.photo}
            alt={disease.DiseaseName}
            className="w-full h-70 object-cover rounded-lg mb-2"
          />
        )}
      </div>
    </Link>
  );
};

export default DiseaseDetails;
