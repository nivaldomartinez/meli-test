import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent, render } from '@testing-library/react';
import React from 'react';
import priceFormatter from '../../../Utils/priceFormatter';
import ProductCard from './ProductCard';

const productMock = {
    id: "MLA633913166",
    title: "Toy Story Buzz Lightyear Peluche Original",
    price: {
        currency: "ARS",
        amount: 3000,
        decimals: null
    },
    picture: "http://http2.mlstatic.com/D_999725-MLA42581294630_072020-O.jpg",
    condition: "new",
    free_shipping: false,
    sold_quantity: 25,
    description: "PELUCHE SOFT BUZZ LIGHTYEAR\nOriginal New Toys!\n\n\n40cm aproximadamente.",
    category_id: "MLA1166"
}

describe('testing ProductCard', () => {

    afterEach(cleanup)

    test('<ProductCard/> should render the product', () => {



        const component = render(<ProductCard product={productMock} />)

        expect(component.container).toHaveTextContent(productMock.title);
        expect(component.container).toHaveTextContent(`$${priceFormatter(productMock.price.amount)}`);
        expect(component.container.querySelector('#picture')).toHaveStyle({
            'background-image': `url(${productMock.picture})`
        })

    })

    test('<ProductCard/> should render the product decimals if exist', () => {

        const component = render(<ProductCard product={productMock} />)

        expect(component.container).not.toHaveTextContent(
            `$${priceFormatter(productMock.price.amount)}.${productMock.price.decimals}`
        );

        const price = {
            amount: 300,
            decimals: 15
        }
        const compProductWithDecimals = render(<ProductCard product={{ ...productMock, price }} />)

        expect(compProductWithDecimals.container).toHaveTextContent(
            `$${priceFormatter(price.amount)}.${price.decimals}`
        );

    })

    test('<ProductCard/> should render free shipping image if the product has free_shipping', () => {
        const component = render(<ProductCard product={{ ...productMock, free_shipping: true }} />)
        expect(component.getByAltText('shipping')).toBeInTheDocument();
    })

    test('onSelectProduct should be called', () => {
        const onSelectProduct = jest.fn();
        const component = render(<ProductCard product={productMock} onSelectProduct={onSelectProduct} />)

        const content = component.container.querySelector('#product-card');
        fireEvent.click(content)

        expect(onSelectProduct).toHaveBeenCalledTimes(1);
    })
})