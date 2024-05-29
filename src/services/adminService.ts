import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';

//products
export async function getProducts() {
    // eslint-disable-next-line no-useless-catch
    try {
        const products = await axios.get(API_URL + `products`)
        return products.data;
    } catch (error) {
        throw error;
    }
}
export async function getProductsDetail(id: number) {
    // eslint-disable-next-line no-useless-catch
    try {
        const products = await axios.get(API_URL + `products/` + id)
        return products.data;
    } catch (error) {
        throw error;
    }
}
