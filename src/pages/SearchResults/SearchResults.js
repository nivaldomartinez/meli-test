import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory, useLocation } from 'react-router-dom';
import ProductCard from '../../shared/components/ProductCard/ProductCard';
import { getBreadcrumb, getProducts } from '../../shared/services/ProductService';
import './SearchResults.css';

const SearchResults = () => {

    const routerHistory = useHistory()
    const routerLocation = useLocation()
    const [products, setProducts] = useState();
    const [breadcrumb, setBreadcrumb] = useState();

    useEffect(() => {
        const unlisten = routerHistory.listen((location) => {
            searchProducts(location);
        })
        searchProducts(routerLocation);

        return unlisten
    }, []);

    /**
     * get products from api
     * @param {*} location router location to check changes from the url param
     */
    const searchProducts = (location) => {
        const queryParams = new URLSearchParams(location.search);
        const query = queryParams.get("search");
        getProducts(query).then(searchResponse => {
            const products = searchResponse.data.items;
            setProducts(products)
            const { categories } = searchResponse.data;
            if (categories.length) {
                getBreadcrumbData(categories[0])
            }
        }).catch(() => { });
    }

    /**
     * get breadcrumb data by category form server
     * @param {*} categoryId 
     */
    const getBreadcrumbData = (categoryId) => {
        getBreadcrumb(categoryId).then(breadcrumbResponse => {
            setBreadcrumb(breadcrumbResponse.data.breadcrumb)
        }).catch(() => { });
    }

    /**
     * this execute when user select a product
     * @param {*} productId 
     */
    const onSelectProduct = (productId) => {
        routerHistory.push(`/items/${productId}`);
    }

    const getTitle = new URLSearchParams(routerLocation.search).get("search");

    return (
        <div>
            <Helmet>
                <title>`${getTitle ? getTitle : ''} | Meli Test`</title>
            </Helmet>
            <div className="breadcrumb" id="results-breadcrumb">
                {breadcrumb ? breadcrumb.map(item => {
                    return (
                        <div className="item" key={item.id}>
                            <span>{item.name}</span>
                        </div>
                    )
                }) : null}
            </div>
            <div id="product-list-container">
                {
                    products ?
                        products.length ?
                            <div className="items-container" id="items-container">
                                {products.map(product => {
                                    return (
                                        <ProductCard product={product}
                                            onSelectProduct={onSelectProduct}
                                            key={product.id} />
                                    )
                                })}
                            </div>
                            : <div className="empty-state">No se encontraron resultados</div>
                        : null
                }
            </div>
        </div>
    )

}


export default SearchResults;