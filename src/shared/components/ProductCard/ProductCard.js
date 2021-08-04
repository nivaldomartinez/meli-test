import React from 'react';
import { useHistory } from 'react-router-dom';
import freeShippingIndicator from '../../../assets/images/ic_shipping.png';
import priceFormatter from '../../../Utils/priceFormatter';
import './ProductCard.css';

const ProductCard = ({ product }) => {

    const routerHistory = useHistory();

    /**
     * redirect to details page
     */
    const goToDetails = () => {
        routerHistory.push(`/items/${product.id}`);
    }

    return (
        <div>
            <div className="product-content" onClick={goToDetails}>
                <div className="product-image" style={{ backgroundImage: `url(${product.thumbnail})` }}>
                </div>
                <div className="product-info">
                    <div className="main-info">
                        <div className="price">
                            <span>${priceFormatter(product.price)}</span>
                            {product.shipping.free_shipping ? <img className="shipping-image" src={freeShippingIndicator} alt="shipping" /> : null}
                        </div>
                        <div className="product-location">
                            <span >{product.seller_address.city.name}</span>
                        </div>
                    </div>
                    <span className="product-description">
                        {product.title}
                    </span>
                </div>

            </div>
        </div>
    )
}

export default ProductCard;