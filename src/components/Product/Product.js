import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';

const Product = (props) => {
    // console.log(props);
    const { img, name, seller,price,stock } = props.product;
    return (
        <div className="product">
            <div className="product-single">
                <img src={img} alt="" srcset="" />            
            </div>
            <div className="product-item">
                <h3>{name}</h3>
                <p><strong>By: {seller}</strong></p>
                <p><strong>${price}</strong></p>
                <p><strong>Only {stock} left in stock - comming soon</strong></p>
                <button className="main-button"
                  onClick={()=>props.handleButton(props.product)}
                >
                    <FontAwesomeIcon icon={faShoppingCart} /> Add to cart
                </button>
            </div>
        </div>
    );
};
export default Product;