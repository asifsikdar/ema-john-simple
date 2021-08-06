
import React  from 'react';
import { useState , useEffect} from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import Items from '../../components/Items/Items';
import Cart from '../Cart/Cart';
import Image from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';
// import Cart from './components/Cart/';



const Review = () => {
    const history = useHistory();
    const [cartProduct, setCartProduct] = useState([]);
    const [confirmOrder , setConfirmOrder] = useState(false);
    const handleOrderCheckout = () => {
        history.push('/shipment');
    }
    const handleCart = (productKey) => {
        const newCart = cartProduct.filter(pd => pd.key !== productKey);
        setCartProduct(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(() => {
        const cartPd = getDatabaseCart();
        const cartId = Object.keys(cartPd);
        const Count = cartId.map(key => {
            const getCart = fakeData.find(pd => pd.key === key);
            getCart.quantity = cartPd[key];
            return getCart;
        });
        setCartProduct(Count);
    }, [])
    let confirm;
    if (confirmOrder) {
       confirm = <img src={Image} alt="" srcset="" />
    }
    return (
        <div className = "shop-container">
            <div className = "product-container" >
             {
                cartProduct.map(pd =>
                    <Items
                        product={pd}
                        handleCart = {handleCart}
                    >
                    </Items>) 
                }
             {confirm} 
            </div>
            <div>
                <Cart cart={cartProduct}>
                    <button onClick={handleOrderCheckout} className="main-button">Checkout</button>
               </Cart>
            </div>
        </div>
        
    );
};

export default Review;