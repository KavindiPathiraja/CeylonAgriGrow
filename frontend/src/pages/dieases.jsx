
import { Link } from "react-router-dom";
const DiseaseDetails = ({ disease }) => {
  
  
  

  return (
    <Link  to={`/Diseaselist/${disease._id}`}>
    <div className="border border-gray-300 p-4 m-2 w-48 rounded-lg shadow-md">
      <h4 className="text-lg font-semibold mb-2">{disease.DiseaseName}</h4>
      
      {disease.photo && (
        <img
          src={disease.photo}
          alt={disease.DiseaseName}
          className="w-full h-auto rounded-lg mb-2"
        />
      )}
      
     
    </div>
    </Link>
  );
};

export default DiseaseDetails;
