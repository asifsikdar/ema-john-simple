import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';



const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);
     
    useEffect(() => {
        const saveCart = getDatabaseCart();
        const cartId = Object.keys(saveCart);
        const cartItem = cartId.map(pdKey => {
            const findProduct = fakeData.find(pd => pd.key === pdKey);
            findProduct.quantity = saveCart[pdKey];
            return findProduct;
        })
        setCart(cartItem);
    },[])

    const handleButton = (product) => {
        const sameCart = cart.find(pd => pd.key === product.key);
        let newCart;
        let count = 1;
        if(sameCart){
            const count = sameCart.quantity + 1;
            sameCart.quantity = count;
            const otherCart = cart.filter(pd => pd.key !== product.key);
            newCart = [...otherCart, sameCart];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        
        setCart(newCart);

        addToDatabaseCart(product.key, count);
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                  {
                    products.map(product =>
                        <Product
                            showCart = {true}
                            handleButton = {handleButton}
                            product={product}>
                        </Product>)
                  }
            </div>
            <div className="cart-container">
                <h1>This is cart </h1>
                <h3>Order{cart.length}</h3>
                <Cart cart = {cart }>
                    <Link to="/review">
                        <button className="main-button">Review-Order</button>
                    </Link>
               
                    </Cart>
                
            </div>
           
        </div>
    );
};

export default Shop;