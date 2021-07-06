import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';
import { Link } from 'react-router-dom';

const Product = (props) => {
    // console.log(props.product);
    const { img, name, seller,price,stock,key} = props.product;
    return (
        <div className="product">
            <div className="product-single">
                <img src={img} alt="" srcset="" />            
            </div>
            <div className="product-item">
                <h3><Link to={"/product/" + key} >{ name}</Link></h3>
                <p><strong>By: {seller}</strong></p>
                <p><strong>${price}</strong></p>
                <p><strong>Only {stock} left in stock - comming soon</strong></p>
                {props.showCart && <button className="main-button"
                  onClick={()=>props.handleButton(props.product)}
                >
                    <FontAwesomeIcon icon={faShoppingCart} /> Add to cart
                </button>}
            </div>
        </div>
    );
};
export default Product;