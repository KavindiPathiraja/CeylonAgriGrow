import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaChartBar } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import axios from 'axios'; // Ensure axios is imported
import image from '../assets/chart.jpg'

const AdminDashboard = () => {
    const [diseases, setDiseases] = useState([]);
    const [noResults, setNoResults] = useState(false);

    const [users, setUsers] = useState([]);
    const [noUserResults, setUserNoResults] = useState(false);

    const [products, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);

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

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5556/products')
            .then((response) => {
                setProduct(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get('http://localhost:5556/users'); // Update to correct endpoint
                setUsers(res.data);
                setUserNoResults(res.data.length === 0);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="flex">
            {/* Sidebar */}
            <aside className="w-1/5 bg-green-600 text-white h-20px p-9">
                <h1 className="text-2xl font-bold text-center mb-8">Admin Dashboard</h1>
                <nav>
                    <ul>
                        <li className="mb-4">
                            <Link to="/dashboard" className="flex items-center p-2 hover:bg-green-500 rounded">
                                <FaTachometerAlt className="mr-2" /> Dashboard
                            </Link>
                        </li>
                        <li className="mb-4">
                            <Link to="/farmers" className="flex items-center p-2 hover:bg-green-500 rounded">
                                <FaUsers className="mr-2" /> Farmers
                            </Link>
                        </li>
                        <li className="mb-4">
                            <Link to="/reports" className="flex items-center p-2 hover:bg-green-500 rounded">
                                <FaChartBar className="mr-2" /> Reports
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="w-4/5 p-6 bg-gray-100 min-h-screen">
                <h2 className="text-3xl font-semibold mb-6">Dashboard Overview</h2>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="font-bold text-xl">Total Farmers</h3>
                        <p className="text-3xl">{users.length}</p>
                    </div>
                    <Link to="/products/allProducts">
                        <div className="bg-white p-4 rounded shadow">
                            <h3 className="font-bold text-xl">Products</h3>
                            <p className="text-3xl">{products.length}</p>
                        </div>
                    </Link>
                    <Link to="/Pest&Disease/diseaseTable">
                        <div className="bg-white p-4 rounded shadow">
                            <h3 className="font-bold text-xl">Pests Reported</h3>
                            <p className="text-3xl">{diseases.length}</p> {/* Updated to display diseases count */}
                        </div>
                    </Link>
                </div>

                {/* Graph Section */}
                <div className="bg-white p-16 rounded shadow">
    <h3 className="font-bold text-xl mb-4">Crops Growth Over Time</h3>
    {/* You can replace this with a chart library like Chart.js or Recharts */}
    <div
        className="h-96 bg-gray-300 flex items-center justify-center rounded-lg" // Increased height to h-96
        style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',  // Ensures the image covers the entire div
            backgroundPosition: 'center', // Centers the image
            backgroundRepeat: 'no-repeat' // Prevents the image from repeating
        }}
    >
        <span className="text-gray-600"></span>
    </div>
</div>

            </main>
        </div>
    );
}

export default AdminDashboard;
