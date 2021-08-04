import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import endpoints from '../../Utils/endpoints';
import priceFormatter from '../../Utils/priceFormatter';
import replaceParams from '../../Utils/replaceParams';
import './ProductDetails.css';

const ProductDetails = () => {
    const { productId } = useParams()

    const [product, setProduct] = useState();
    const [productDescription, setProductDescription] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getProductDetails();
        getProductDescription();
    }, [])

    /**
     * get product details from backend
     */
    const getProductDetails = () => {
        axios.get(replaceParams(endpoints.productDetail, [productId.replaceAll(' ', '')]))
            .then(productResponse => {
                setProduct(productResponse.data);
                getBreadcrumbData(productResponse.data.category_id)
            });
    }

    /**
     * get product description from backend
     */
    const getProductDescription = () => {
        axios.get(replaceParams(endpoints.productDescription, [productId]))
            .then(productDescResponse => {
                setProductDescription(productDescResponse.data.plain_text)
            });
    }

    /**
     * get path from root from category
     * @param {*} categoryId 
     */
    const getBreadcrumbData = (categoryId) => {
        axios.get(replaceParams(endpoints.categories, [categoryId]))
            .then(categoriesResponse => {
                setCategories(categoriesResponse.data.path_from_root)
            });
    }

    return (
        product ?
            <Fragment>
                <div className="breadcrumb">
                    {categories ? categories.map(category => {
                        return (
                            <div className="item" key={category.id}>
                                <span>{category.name}</span>
                            </div>
                        )
                    }) : null}
                </div>
                <div className="product-details">
                    <div className="details-container">
                        <div className="product-detail-image"
                            style={{ backgroundImage: `url(${product.pictures[0].secure_url})` }}></div>
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
                                <span>${priceFormatter(product.price)}</span> <span className="amount-decimals">{product.price.decimals}</span>
                            </div>
                            <div className="btn-buy">
                                <span>Comprar</span>
                            </div>
                        </div>
                    </div>
                    <div className="product-detail-description">
                        <span className="title-description">Descripcion del producto</span>
                        <p className="description">{productDescription}</p>
                    </div>
                </div>
            </Fragment> : null
    )
}

export default ProductDetails;