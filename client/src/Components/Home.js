import React, {useEffect, useState} from 'react';
import './Home.css'; // Import CSS file for styling
import ProductCard from './ProductCard';

const Home = () => {

  const [products, setProducts] = useState([])

  const fetchProducts = async ()=>{
    const response = await fetch("/products")
    const json = await response.json();
    setProducts(json.products)
  }

  useEffect(()=>{
    const getProducts = async ()=>{{
      await fetchProducts()
    }}
    getProducts()
  }, [])

  return (
    <div className="home-container">
      <h2 className="welcome-message">Welcome to BabyShop!</h2>
      <img src="/babyimage.jpeg" alt="BabyShop Logo" className="home-logo" />
      <p className="intro-text">Discover a world of adorable baby products and essentials.</p>
      <div className="featured-products">
        {products && products.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
      <p className="explore-text">Explore our range of baby clothes, accessories, toys, and more!</p>
    </div>
  );
}

export default Home;