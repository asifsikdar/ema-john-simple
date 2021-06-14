import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    const total = cart.reduce((total, product) => total + product.price , 0);
    // let total = 0;
    // for (let i = 0; i < cart.length; i++) {
    //     const product = cart[i];
    //     total = total + product.price;
        
    // }
    let shipping = 0;
    if (total > 35) {
        shipping = 5.55;
    }
    else if (total > 10) {
        shipping = 9.50;
    }
    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }
    const tax = total / 10;
    const grantTotral = total + shipping;
    return (
        <div>
            <h1>Cart Calculation</h1>
            <h2>Shipping:{formatNumber(shipping)}</h2>
            <h3>Tax + Vat :{ formatNumber(tax)}</h3>
            <h3>Total-Price :{formatNumber(grantTotral) }</h3> 
        </div>
    );
};

export default Cart;