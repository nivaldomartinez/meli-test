export const BASE_URL = "http://localhost:3000/api/";

const endpoints = {
    search: '/items?q={0}',
    productDetail: '/items/{0}',
    breadcrumb: '/breadcrumb/{0}'
}

export default endpoints