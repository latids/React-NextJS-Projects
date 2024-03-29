import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../styles/categoryListStyles/category.css";
import defaultImg from "../../assets/default.png";
import { useCart } from "../../context/CartContext";
import { Item } from "../../context/ContextTypes";

const CategoryProducts: React.FC = () => {
  const [products, setProducts] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");

        if (response.data.length > 0) {
          setProducts(response.data);
        } else {
          setError("error setting products");
        }
      } catch (error) {
        setError("error fetching data");
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = (product: Item) => {
    addToCart(product);
  };

  return (
    <div className="category-products">
      {error ? (
        <h4>{error}</h4>
      ) : (
        products.map((product) => (
          <div key={product.id} className="category-item">
            <Link className="links" to={`/products/${product.id}`}>
              <img
                className="product-image"
                src={product.image || defaultImg}
                alt={product.title || "Product"}
              />
              <h5 className="product-title">{product.title}</h5>
              <p>${product.price}</p>
            </Link>
            <button
              className="add-cart"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default CategoryProducts;