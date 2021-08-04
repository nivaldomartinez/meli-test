const endpoints = {
    search: 'https://api.mercadolibre.com/sites/MLA/search?q={0}&limit={1}',
    productDetail: 'https://api.mercadolibre.com/items/{0}',
    productDescription: 'https://api.mercadolibre.com/items/{0}/description',
    categories: 'https://api.mercadolibre.com/categories/{0}'
}

export default endpoints