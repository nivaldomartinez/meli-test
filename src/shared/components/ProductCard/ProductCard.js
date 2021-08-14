import React, { Fragment } from 'react';
import freeShippingIndicator from '../../../assets/images/ic_shipping.png';
import priceFormatter from '../../../Utils/priceFormatter';
import './ProductCard.css';

const ProductCard = ({ product, onSelectProduct }) => {

    return (
        <Fragment>
            <div className="product-content" data-testid="product-card"
                id="product-card" onClick={() => { onSelectProduct(product.id) }}>
                <div className="product-image" id="picture" style={{ backgroundImage: `url(${product.picture})` }}>
                </div>
                <div className="product-info">
                    <div className="main-info">
                        <div className="price">
                            <span>${priceFormatter(product.price.amount)}{product.price.decimals ? '.' + product.price.decimals : ''}</span>
                            {product.free_shipping ? <img className="shipping-image" src={freeShippingIndicator} alt="shipping" /> : null}
                        </div>
                        <div className="product-location">

                        </div>
                    </div>
                    <span className="product-description">
                        {product.title}
                    </span>
                </div>

            </div>
        </Fragment>
    )
}

export default ProductCard;