import React from 'react';
import { useHistory } from 'react-router-dom';
import freeShippingIndicator from '../../../assets/images/ic_shipping.png';
import './index.css';

const ProductCard = ({ product }) => {

    const routerHistory = useHistory();

    const goToDetails = () => {
        routerHistory.push(`/items/${product.id}`);
    }

    return (
        <div>
            <div className="product-content" onClick={goToDetails}>
                <div className="product-image" style={{ backgroundImage: `url(${product.picture})` }}>
                </div>
                <div className="product-info">
                    <div className="main-info">
                        <div className="price">
                            <span>{product.price.currency} {product.price.amount}</span>
                            {product.free_shipping ? <img className="shipping-image" src={freeShippingIndicator} alt="shipping" /> : null}
                        </div>
                        <div className="product-location">
                            <span >Colombia</span>
                        </div>
                    </div>
                    <span className="product-description">
                        {product.description}
                    </span>
                </div>

            </div>
        </div>
    )
}

export default ProductCard;