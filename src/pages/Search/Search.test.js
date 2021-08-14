import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { createMemoryHistory } from "history";
import React from 'react';
import { Route, Router } from 'react-router-dom';
import Search from './Search';


const renderWithRouter = (component) => {
    const history = createMemoryHistory({
        initialEntries: ["/"],
    });
    const Wrapper = ({ children }) => (
        <Router history={history}>
            <Route path="/">{children}</Route>
        </Router>
    );
    return {
        ...render(component, { wrapper: Wrapper }),
        history,
    };
};

describe('testing <Search/>', () => {

    afterAll(cleanup);

    test('render <Search />', () => {
        const component = renderWithRouter(<Search />)
        expect(component.container).toBeInTheDocument();
    })

    test('Route should be changed when search', () => {

        const searchQuery = 'buzz';

        const component = renderWithRouter(<Search />)
        const searchInput = component.getByRole('textbox');
        fireEvent.change(searchInput, { target: { value: searchQuery } });
        fireEvent.keyPress(searchInput, { key: 'enter', keyCode: 13 });

        expect(component.history).toHaveLength(2);
        expect(component.history.location.pathname).toBe('/items');
        expect(component.history.location.search).toBe(`?search=${searchQuery}`);
    })
})