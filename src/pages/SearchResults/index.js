import React from 'react';
import ProductCard from '../../shared/components/ProductCard';
import './index.css';

const SearchResults = ({ query }) => {

    const items = [
        {
            id: '8721934782743',
            title: 'Xiaomi redmi note 10',
            price: {
                currency: '$',
                amount: 780000,
                decimals: 0
            },
            picture: 'https://i.blogs.es/3a3421/xiaomi-redmi-note-10-0/1366_2000.jpeg',
            condition: 'new',
            free_shipping: true,
            description: 'Description del user'
        },
        {
            id: '8721934782342',
            title: 'Xiaomi redmi note 9',
            price: {
                currency: '$',
                amount: 680000,
                decimals: 0
            },
            picture: 'https://i.blogs.es/3a3421/xiaomi-redmi-note-10-0/1366_2000.jpeg',
            condition: 'new',
            free_shipping: false,
            description: 'Description del user'
        }
    ]

    return (
        <div>
            <div className="items-container">
                {
                    items.map(item => {
                        return (
                            <ProductCard product={item} key={item.id} />
                        )
                    })
                }
            </div>
        </div>
    )

}


export default SearchResults;