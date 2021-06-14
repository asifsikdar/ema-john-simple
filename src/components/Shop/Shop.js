import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';


const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);
    const handleButton = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                  {
                    products.map(product =>
                        <Product
                            handleButton = {handleButton}
                            product={product}>
                        </Product>)
                  }
            </div>
            <div className="cart-container">
                <h1>This is cart </h1>
                <h3>Order{cart.length}</h3>
                <Cart cart={cart}></Cart>
            </div>
           
        </div>
    );
};

export default Shop;