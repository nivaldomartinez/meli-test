import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import ProductCard from '../../shared/components/ProductCard/ProductCard';
import endpoints from '../../Utils/endpoints';
import replaceParams from '../../Utils/replaceParams';
import './SearchResults.css';

const SearchResults = () => {

    const routerHistory = useHistory()
    const routerLocation = useLocation()
    const [products, setProducts] = useState();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const unlisten = routerHistory.listen((location) => {
            getProducts(location);
        })
        getProducts(routerLocation);

        return unlisten
    }, []);

    /**
     * get products from api
     * @param {*} location router location to check changes from the url param
     */
    const getProducts = (location) => {
        const queryParams = new URLSearchParams(location.search);
        const query = queryParams.get("search");
        axios.get(replaceParams(endpoints.search, [query, 4]))
            .then(searchResponse => {
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
        axios.get(replaceParams(endpoints.categories, [categoryId]))
            .then(categoryResponse => {
                setCategories(categoryResponse.data.path_from_root)
            });
    }

    return (
        <div>
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