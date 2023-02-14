import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement, createCustomElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const products = document.querySelector('.products');

function loading() {
  products.appendChild(createCustomElement('p', 'loading', 'carregando...'));
}

function removeLoading() {
  document.querySelector('.loading').remove();
}

async function appendProduct() {
  loading();
  const data = await fetchProductsList('computador');
  data.forEach((product) => {
    products.appendChild(createProductElement({
      id: product.id,
      title: product.title,
      thumbnail: product.thumbnail,
      price: product.price,
    }));
  });
  removeLoading();
}

window.onload = async () => {
  await appendProduct();
};
