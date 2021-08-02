import React from 'react';
import { useParams } from 'react-router';
import './index.css';

const ProductDetails = () => {
    const { productId } = useParams()

    const product = {
        id: '8721934782342',
        title: 'Xiaomi redmi note 9',
        price: {
            currency: '$',
            amount: 680000,
            decimals: '00'
        },
        picture: 'https://i.blogs.es/3a3421/xiaomi-redmi-note-10-0/1366_2000.jpeg',
        condition: 'Nuevo',
        free_shipping: false,
        description: 'Description del user',
        sold_quantity: 234
    }

    return (
        <div class="product-details">
            <div className="details-container">
                <div className="product-detail-image" style={{ backgroundImage: `url(${product.picture})` }}></div>
                <div className="product-detail-info">
                    <div className="product-detail-condition">
                        <span>
                            {product.condition} - {product.sold_quantity} vendidos
                        </span>
                    </div>
                    <div className="product-detail-title">
                        <span>{product.title}</span>
                    </div>
                    <div className="product-detail-price">
                        <span>{product.price.currency} {product.price.amount}</span> <span className="amount-decimals">{product.price.decimals}</span>
                    </div>
                    <div className="btn-buy">
                        <span>Comprar</span>
                    </div>
                </div>
            </div>
            <div className="product-detail-description">
                <span className="title-description">Descripcion del producto</span>
                <p className="description">{product.description}</p>
            </div>
        </div>
    )
}

export default ProductDetails;