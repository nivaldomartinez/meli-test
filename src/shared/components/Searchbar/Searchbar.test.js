import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent, render } from '@testing-library/react';
import React from 'react';
import Searchbar from './Searchbar';

describe('Searchbar tests', () => {

    let component;
    let onSearch;

    beforeEach(() => {
        onSearch = jest.fn();
        component = render(<Searchbar onSearch={onSearch} />)
    })

    afterEach(cleanup)

    test('searchButton should disabled when search is empty', () => {
        const searchButton = component.getByRole('button');
        expect(searchButton).toHaveAttribute('disabled');
    });

    test('onSearch should be called when click on search button', () => {
        const searchButton = component.getByRole('button');
        const searchInput = component.getByRole('textbox');
        fireEvent.change(searchInput, { target: { value: 'buzz' } });
        fireEvent.click(searchButton);
        expect(onSearch).toHaveBeenCalledTimes(1);
    });

    test('onSearch should be called when press Enter on search input', () => {
        const searchInput = component.getByRole('textbox');
        fireEvent.change(searchInput, { target: { value: 'buzz' } });
        fireEvent.keyPress(searchInput, { key: 'enter', keyCode: 13 });
        expect(onSearch).toHaveBeenCalledTimes(1);

    });

    test('onSearch shouldnt be called when press Enter on empty search input', () => {
        const searchInput = component.getByRole('textbox');
        fireEvent.keyPress(searchInput, { key: 'enter', keyCode: 13 });
        expect(onSearch).not.toHaveBeenCalled();
    });
})