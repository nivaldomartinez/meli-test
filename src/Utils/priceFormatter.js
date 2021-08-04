/**
 * number to currency format
 * @param {*} price 
 * @returns 
 */
const priceFormatter = (price) => {
    const formattedPrice = new Intl.NumberFormat().format(price)
    return formattedPrice
}

export default priceFormatter;