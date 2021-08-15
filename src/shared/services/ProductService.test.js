import { breadcrumbResponseMock, productDetailMock, searchResponseMock } from './mocks';
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
            expect(data).toEqual(searchResponseMock);
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