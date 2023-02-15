import { searchCep } from './helpers/cepFunctions';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement, createCustomElement,
  createCartProductElement, calculateCartPrice }
  from './helpers/shopFunctions';
import { saveCartID, getSavedCartIDs } from './helpers/cartFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const products = document.querySelector('.products');
const cartProducts = document.querySelector('.cart__products');

function loading() {
  products.appendChild(createCustomElement('p', 'loading', 'carregando...'));
}

function removeLoading() {
  document.querySelector('.loading').remove();
}

async function appendProduct() {
  try {
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
  } catch (error) {
    error.message = 'Algum erro ocorreu, recarregue a página e tente novamente';
    products.appendChild(createCustomElement('p', 'error', error.message));
  }
}

async function componentCart(id) {
  saveCartID(id);
  const data = await fetchProduct(id);
  cartProducts.appendChild(createCartProductElement({
    id: data.id,
    title: data.title,
    price: data.price,
    pictures: data.pictures,
  }));
  calculateCartPrice();
}

function addProductToCart() {
  const buyBtns = document.querySelectorAll('.product__add');
  buyBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const getId = btn.parentElement.firstChild.innerText;
      componentCart(getId);
    });
  });
}

async function createSavedCart() {
  if (getSavedCartIDs() !== null) {
    const savedProducts = getSavedCartIDs().map((item) => fetchProduct(item));
    const productsResolved = await Promise.all(savedProducts);
    productsResolved.forEach((item) => {
      cartProducts.appendChild(createCartProductElement({
        id: item.id,
        title: item.title,
        price: item.price,
        pictures: item.pictures,
      }));
    });
  }
  calculateCartPrice();
}

window.onload = async () => {
  await appendProduct();
  addProductToCart();
  createSavedCart();
};
