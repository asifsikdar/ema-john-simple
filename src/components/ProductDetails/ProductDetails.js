import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetails = () => {
    const { productKey } = useParams();
    const productInfo = fakeData.find(pd => pd.key === productKey);
    // console.log(productInfo);
    return (
        <div>
            <h1>{productKey}This is product details page</h1>
            <Product showCart = {false} product = {productInfo}></Product>
        </div>
    );
};

export default ProductDetails;