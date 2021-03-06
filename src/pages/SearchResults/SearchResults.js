import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory, useLocation } from 'react-router-dom';
import ProductCard from '../../shared/components/ProductCard/ProductCard';
import { getCategories, getProducts } from '../../shared/services/ProductService';
import './SearchResults.css';

const SearchResults = () => {

    const routerHistory = useHistory()
    const routerLocation = useLocation()
    const [products, setProducts] = useState();
    const [categories, setCategories] = useState([]);

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
        getProducts(query, 4).then(searchResponse => {
            const products = searchResponse.data.results;
            setProducts(products)
            if (products.length) {
                getBreadcrumbData(products[0].category_id)
            }
        });
    }

    /**
     * get path from root from category
     * @param {*} categoryId 
     */
    const getBreadcrumbData = (categoryId) => {
        getCategories(categoryId).then(categoryResponse => {
            setCategories(categoryResponse.data.path_from_root)
        });
    }

    return (
        <div>
            <Helmet>
                <title>{new URLSearchParams(routerLocation.search).get("search")} | Meli Test</title>
            </Helmet>
            <div className="breadcrumb">
                {categories ? categories.map(category => {
                    return (
                        <div className="item" key={category.id}>
                            <span>{category.name}</span>
                        </div>
                    )
                }) : null}
            </div>
            <div>
                {
                    products ?
                        products.length ?
                            <div className="items-container">
                                {products.map(product => {
                                    return (
                                        <ProductCard product={product} key={product.id} />
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