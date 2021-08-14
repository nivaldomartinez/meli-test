import '@testing-library/jest-dom/extend-expect';
import { cleanup, render, waitFor } from '@testing-library/react';
import { createMemoryHistory } from "history";
import React, { useState } from 'react';
import { Route, Router } from 'react-router-dom';
import * as ProductService from '../../shared/services/ProductService';
import priceFormatter from '../../Utils/priceFormatter';
import ProducDetails from './ProductDetails';
jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn()
}))

const productMock = {
    id: "MLA633913166",
    title: "Toy Story Buzz Lightyear Peluche Original",
    price: {
        currency: "ARS",
        amount: 3000,
        decimals: 15
    },
    picture: "http://http2.mlstatic.com/D_999725-MLA42581294630_072020-O.jpg",
    condition: "new",
    free_shipping: false,
    sold_quantity: 25,
    description: "PELUCHE SOFT BUZZ LIGHTYEAR\nOriginal New Toys!\n\n\n40cm aproximadamente.",
    category_id: "MLA1166"
}

const breadcrumbMock = [
    { id: "MLA1132", name: "Juegos y Juguetes" },
    { id: "MLA432888", name: "Muñecos y Muñecas" },
    { id: "MLA3422", name: "Muñecos y Figuras de Acción" }
]


const renderWithRouter = (component) => {
    const history = createMemoryHistory({
        initialEntries: ["/items/MLA606398749"],
    });
    const Wrapper = ({ children }) => (
        <Router history={history}>
            <Route path="/items/:productId">{children}</Route>
        </Router>
    );
    return {
        ...render(component, { wrapper: Wrapper }),
        history,
    };
};


describe('testing ProductDetails.js', () => {

    beforeEach(() => {
        useState.mockImplementation(jest.requireActual('react').useState);
    })

    afterAll(cleanup)

    test('<ProductDetails/> should be rendered', () => {

        const component = renderWithRouter(<ProducDetails />)
        expect(component.container).toBeEmptyDOMElement();
        expect(component).toBeDefined();
    })

    test('<ProductDetails/> should render breadcrumb and match snapshot', () => {

        useState
            .mockImplementationOnce(() => [productMock, jest.fn()])
            .mockImplementationOnce(() => [breadcrumbMock, jest.fn()])

        const component = renderWithRouter(<ProducDetails />)
        component.getAllByText(breadcrumbMock[0].name);

        expect(component.container).toMatchSnapshot();

    })

    test('<ProductDetails/> should render product properties', async () => {

        jest.spyOn(ProductService, 'getProductDetails').mockResolvedValue({ data: { item: productMock } });
        jest.spyOn(ProductService, 'getBreadcrumb').mockResolvedValue({ data: { breadcrumb: breadcrumbMock } });

        const component = renderWithRouter(<ProducDetails />)
        await waitFor(() => component.getAllByText(productMock.title));
        await waitFor(() => component.getAllByText(productMock.title));
        await waitFor(() => component.getAllByText(productMock.price.decimals))
        await waitFor(() => component.getAllByText(`$${priceFormatter(productMock.price.amount)}`))
        await waitFor(() => component.getAllByText(`${productMock.condition} - ${productMock.sold_quantity} vendidos`))
        await waitFor(() => expect(component.container.querySelector('#picture')).toHaveStyle({
            'background-image': `url(${productMock.picture})`
        }));

    })

    test('<ProductDetails/> should render empty if getProductDetails fails', async () => {

        jest.spyOn(ProductService, 'getProductDetails').mockRejectedValue({});

        const component = renderWithRouter(<ProducDetails />)
        expect(component.container).toBeEmptyDOMElement();

    })

    test('<ProductDetails/> should render empty breadcrumb if getBreadcrumb fails', async () => {

        jest.spyOn(ProductService, 'getProductDetails').mockResolvedValue({ data: { item: productMock } });
        jest.spyOn(ProductService, 'getBreadcrumb').mockRejectedValue({});

        const component = renderWithRouter(<ProducDetails />)
        await waitFor(() => component.getAllByText(productMock.title));
        expect(component.container.querySelector('#details-breadcrumb')).toBeEmptyDOMElement();

    })
})