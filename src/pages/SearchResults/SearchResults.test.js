import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import { createMemoryHistory } from "history";
import React from 'react';
import { act } from 'react-dom/test-utils';
import { Route, Router } from 'react-router-dom';
import * as ProductService from '../../shared/services/ProductService';
import SearchResults from './SearchResults';

const renderWithRouter = (component) => {
    const history = createMemoryHistory({
        initialEntries: ["/items?search=buzz"],
    });
    const Wrapper = ({ children }) => (
        <Router history={history}>
            <Route path="/items">{children}</Route>
        </Router>
    );
    return {
        ...render(component, { wrapper: Wrapper }),
        history,
    };
};

const mockSearchResponse = {
    "author": {
        "name": "MELI",
        "lastname": "TEST"
    },
    "categories": [
        "MLA3422",
        "MLA3422",
        "MLA3422",
        "MLA3422"
    ],
    "items": [
        {
            "id": "MLA903952589",
            "title": "Muñeco Figura Soft Toy Story Woody Buzz Jessie 18cm Disney",
            "price": {
                "currency": "ARS",
                "amount": 1563,
                "decimals": 15
            },
            "picture": "http://http2.mlstatic.com/D_817618-MLA46821124189_072021-O.jpg",
            "condition": "new",
            "free_shipping": false
        },
        {
            "id": "MLA668912898",
            "title": "Muñeco Buzz Lightyear Toy Story Soft Original Disney",
            "price": {
                "currency": "ARS",
                "amount": 2285,
                "decimals": 0
            },
            "picture": "http://http2.mlstatic.com/D_602827-MLA46232786132_062021-I.jpg",
            "condition": "new",
            "free_shipping": false
        },
        {
            "id": "MLA886350340",
            "title": "Juguete Muñeco Figura Articulada Toy Story 4 Personajes",
            "price": {
                "currency": "ARS",
                "amount": 790,
                "decimals": 56
            },
            "picture": "http://http2.mlstatic.com/D_798961-MLA46942035808_082021-O.jpg",
            "condition": "new",
            "free_shipping": false
        },
        {
            "id": "MLA606398749",
            "title": "Woody Buzz Jessie New Toys 40cm Alto Con Sombrero",
            "price": {
                "currency": "ARS",
                "amount": 2499,
                "decimals": 0
            },
            "picture": "http://http2.mlstatic.com/D_600276-MLA46855684106_072021-I.jpg",
            "condition": "new",
            "free_shipping": false
        }
    ]
}

const breadcrumbMock = [
    { id: "MLA1132", name: "Juegos y Juguetes" },
    { id: "MLA432888", name: "Muñecos y Muñecas" },
    { id: "MLA3422", name: "Muñecos y Figuras de Acción" }
]

describe('testing <SearchResults/>', () => {

    afterAll(cleanup)

    test('<SearchResults/> should be rendered', () => {

        const component = renderWithRouter(<SearchResults />)
        expect(component.container.querySelector('#results-breadcrumb')).toBeDefined();
        expect(component).toBeDefined();
    })

    test('<SearchResults/> should renderer empty state if dont get products', async () => {

        jest.spyOn(ProductService, 'getProducts').mockResolvedValue({ data: { ...mockSearchResponse, items: [] } });
        jest.spyOn(ProductService, 'getBreadcrumb').mockResolvedValue({ data: { breadcrumb: [] } });

        const component = renderWithRouter(<SearchResults />);
        await waitFor(() => component.getByText('No se encontraron resultados'));
    });

    test('<SearchResults/> should renderer search list', async () => {
        jest.spyOn(ProductService, 'getProducts').mockResolvedValue({ data: mockSearchResponse });
        jest.spyOn(ProductService, 'getBreadcrumb').mockResolvedValue({ data: { breadcrumb: breadcrumbMock } });

        const component = renderWithRouter(<SearchResults />)
        const { items } = mockSearchResponse;
        await waitFor(() => component.getByText(items[1].title))
    });


    test('<SearchResults/> shouldnt call getBreadcrumb if dont get categories', () => {
        jest.spyOn(ProductService, 'getProducts')
            .mockResolvedValue({ data: { ...mockSearchResponse, categories: [] } });

        const getBreadcrumb = jest.spyOn(ProductService, 'getBreadcrumb');

        // dont call getBreadcrumb
        expect(getBreadcrumb).not.toHaveBeenCalled();
    });

    test('<SearchResults/> shouldnt render empty if getProducts return errors', () => {
        jest.spyOn(ProductService, 'getProducts')
            .mockRejectedValue();
        const component = renderWithRouter(<SearchResults />)
        expect(component.container.querySelector('#product-list-container')).toBeEmptyDOMElement()

    });

    test('<SearchResults/> shouldnt render empty breadcrumb if getBreadcrumb return errors', async () => {
        jest.spyOn(ProductService, 'getProducts')
            .mockResolvedValue({ data: mockSearchResponse });
        jest.spyOn(ProductService, 'getBreadcrumb').mockRejectedValue({});

        const component = renderWithRouter(<SearchResults />)
        await waitFor(() => expect(component.container.querySelector('#results-breadcrumb'))
            .toBeEmptyDOMElement())

    });

    test('<SearchResults/> should call getProducts when route changed', () => {

        const getProducts = jest.spyOn(ProductService, 'getProducts')
            .mockRejectedValue({});

        const component = renderWithRouter(<SearchResults />)

        const search = (searchQuery) => {
            component.history.push(`/items?search=${searchQuery}`)
        }

        let searchQuery = 'buzzlight';

        search(searchQuery)

        expect(component.history).toHaveLength(2);
        expect(getProducts).toHaveBeenCalledTimes(2)

        searchQuery = 'buzz';

        search(searchQuery)

        expect(component.history).toHaveLength(3);
        expect(getProducts).toHaveBeenCalledTimes(3)
    });

    test('Route should be changed when select a product from product list', async () => {
        jest.spyOn(ProductService, 'getProducts')
            .mockResolvedValue({ data: { ...mockSearchResponse, categories: [] } });

        const productId = mockSearchResponse.items[0].id;
        const component = renderWithRouter(<SearchResults />)

        await act(async () => {
            const [productCard] = await waitFor(() => component.findAllByTestId('product-card'));
            fireEvent.click(productCard);
        })

        expect(component.history).toHaveLength(2);
        expect(component.history.location.pathname).toBe(`/items/${productId}`);
    })

})