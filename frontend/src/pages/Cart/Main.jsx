import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemCard from './ItemCard'; 

const Main = () => {
    const [products, setproducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5556/products')
            .then((response) => {
                console.log('API Response:', response.data);
                const data = response.data;
                if (Array.isArray(data)) {
                    setproducts(data);
                } else {
                    console.warn('Data is not an array:', data);
                    setproducts([]);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching products data:', error);
                setproducts([]);
                setLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen flex flex-col justify-center items-center lg:px-32 px-5">
            <h1 className="text-4xl font-semibold text-center pt-24 pb-10">Our products</h1>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="flex flex-wrap gap-8 justify-center">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <ItemCard
                                key={product.ProductNo}
                                ProductNo={product.ProductNo}
                                image={product.image}
                                ItemName={product.ProductName}
                                SPrice={product.SellingPrice}
                            />
                        ))
                    ) : (
                        <div>No items found</div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Main;
