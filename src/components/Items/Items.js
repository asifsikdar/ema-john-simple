import React from 'react';

const Items = (props) => {
    const { name, quantity, price , key } = props.product;
    const cartItems = {
        borderButton: '1px solid red',
        marginLeft:'200px',
    }
    return (
         <div style = {cartItems} className = "items" >
            <h3 className="product-name">{name}</h3>
            <p>Quantity : {quantity}</p>
            <p>Price : { price}</p>
            <br/>
            <button
                className="main-button" onClick ={()=>props.handleCart(key)}>Remove
                
            </button>
        </div>
        
    );
};

export default Items;