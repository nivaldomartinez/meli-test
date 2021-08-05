import axios from "axios";
import endpoints from "../../Utils/endpoints";
import replaceParams from "../../Utils/replaceParams";

/**
     * get product details from backend
     */
export const getProductDetails = (productId) => {
    return axios.get(replaceParams(endpoints.productDetail, [productId]))
}

/**
     * get product description from backend
     */
export const getProductDescription = (productId) => {
    return axios.get(replaceParams(endpoints.productDescription, [productId]))
}

/**
 * get path from root from category
 * @param {*} categoryId 
 */
export const getCategories = (categoryId) => {
    return axios.get(replaceParams(endpoints.categories, [categoryId]))
}

/**
* get products from api
* @param {*} location router location to check changes from the url param
*/
export const getProducts = (query, limit) => {
    return axios.get(replaceParams(endpoints.search, [query, limit]));
}