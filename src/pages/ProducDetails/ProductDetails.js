import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router';
import { getBreadcrumb, getProductDetails } from '../../shared/services/ProductService';
import priceFormatter from '../../Utils/priceFormatter';
import './ProductDetails.css';

const ProductDetails = () => {
    const { productId } = useParams()

    const [product, setProduct] = useState();
    const [breadcrumb, setBreadcrumb] = useState();

    useEffect(() => {
        getDetails();
    }, [])

    /**
     * get product details from backend
     */
    const getDetails = () => {
        getProductDetails(productId).then(productResponse => {
            const { item: product } = productResponse.data;
            setProduct(product);
            getBreadcrumbData(product.category_id)
        }).catch(error => { });
    }

    /**
     * get breadcrumb data by category from server
     * @param {*} categoryId 
     */
    const getBreadcrumbData = (categoryId) => {
        getBreadcrumb(categoryId).then(breadcrumbResponse => {
            setBreadcrumb(breadcrumbResponse.data.breadcrumb)
        }).catch(error => { });
    }

    return (
        product ?
            <Fragment>
                <Helmet>
                    <title>{product.title} | Meli Test</title>
                </Helmet>
                <div className="breadcrumb" id="details-breadcrumb">
                    {breadcrumb ? breadcrumb.map(item => {
                        return (
                            <div className="item" key={item.id}>
                                <span>{item.name}</span>
                            </div>
                        )
                    }) : null}
                </div>
                <div className="product-details">
                    <div className="details-container">
                        <div className="product-detail-image" id="picture"
                            style={{ backgroundImage: `url(${product.picture})` }}></div>
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
                                <span>${priceFormatter(product.price.amount)}</span> <span className="amount-decimals">{product.price.decimals}</span>
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
            </Fragment> : null
    )
}

export default ProductDetails;