import axios from "axios";
import endpoints, { BASE_URL } from "../../Utils/endpoints";
import replaceParams from "../../Utils/replaceParams";

const intance = axios.create({
    baseURL: BASE_URL
})

/**
     * get product details from backend
     */
export const getProductDetails = (productId) => {
    return intance.get(replaceParams(endpoints.productDetail, [productId]))
}

/**
 * get breadcrumb data from server
 * @param {*} categoryId product categoryId
 */
export const getBreadcrumb = (categoryId) => {
    return intance.get(replaceParams(endpoints.breadcrumb, [categoryId]))
}

/**
* get products from api
* @param {*} location router location to check changes from the url param
*/
export const getProducts = (query) => {
    return intance.get(replaceParams(endpoints.search, [query]));
}