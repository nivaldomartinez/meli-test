import { breadcrumbResponseMock, productDetailMock } from './mocks';
import { getBreadcrumb, getProductDetails, getProducts } from './ProductService';

describe('testing ProductService', () => {

    test('getBreadcrumb should return value from a promise', (done) => {
        getBreadcrumb('MLA3422').then(({ data }) => {
            expect(data).toEqual(breadcrumbResponseMock);
            done();
        })
    })

    test('getProducts should return value from a promise', (done) => {
        getProducts('buzz').then(({ data }) => {
            expect(data).toHaveProperty('items');
            expect(data).toHaveProperty('categories');
            expect(data.items).toHaveLength(4);
            done();
        })
    })

    test('getProductDetails should return value from a promise', (done) => {
        getProductDetails('MLA730906646').then(({ data }) => {
            expect(data).toEqual(productDetailMock);
            done();
        })
    })
})