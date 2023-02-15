const cartAdress = document.querySelector('.cart__address');

export const getAddress = async (cep) => {
  try {
    const firstAPI = `https://cep.awesomeapi.com.br/json/${cep}`;
    const secondAPI = `https://brasilapi.com.br/api/cep/v2/${cep}`;
    const response = await Promise.any([
      fetch(firstAPI),
      fetch(secondAPI),
    ]);
    const data = await response.json();
    return data;
  } catch {
    return 'CEP não encontrado';
  }
};

export const searchCep = async () => {
  const inputCep = document.querySelector('.cep-input').value;
  const data = await getAddress(inputCep);
  if (typeof data === 'string' || data.code) {
    cartAdress.innerHTML = 'CEP não encontrado';
    return;
  }
  cartAdress
    .innerHTML = `${data.address} - ${data.district} - ${data.city} - ${data.state}`;
};
