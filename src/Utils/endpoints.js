export const BASE_URL = "http://localhost:3000/api/";

const endpoints = {
    search: '/items?q={0}',
    productDetail: '/api/items/{0}',
    breadcrumb: '/breadcrumb/{0}'
}

export default endpoints