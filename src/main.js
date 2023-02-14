import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

async function appendProduct() {
  const products = document.querySelector('.products');
  const data = await fetchProductsList('computador');
  data.forEach((product) => {
    products.appendChild(createProductElement({
      id: product.id,
      title: product.title,
      thumbnail: product.thumbnail,
      price: product.price,
    }));
  });
}

window.onload = async () => {
  await appendProduct();
};
