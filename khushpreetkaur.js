async function getProducts() {
  const response = await fetch('https://fakestoreapi.com/products');
  const data = await response.json();
  return data;
}

function renderProducts(products) {
  const productList = document.getElementById('products');
  productList.innerHTML = '';
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <div class="product-info">
        <h2>${product.title}</h2>
        <p>${product.category}</p>
        <p>$${product.price}</p>
      </div>
    `;
    productList.appendChild(productCard);
  });
}

async function init() {
  const products = await getProducts();
  renderProducts(products);

  document.getElementById('sort').addEventListener('change', async function() {
    const sortOrder = this.value;
    const sortedProducts = await getProductsSorted(sortOrder);
    renderProducts(sortedProducts);
  });

  document.getElementById('category').addEventListener('change', async function() {
    const category = this.value;
    const filteredProducts = await getProductsFiltered(category);
    renderProducts(filteredProducts);
  });
}

async function getProductsSorted(order) {
  const products = await getProducts();
  return products.sort((a, b) => order === 'asc' ? a.price - b.price : b.price - a.price);
}

async function getProductsFiltered(category) {
  if (category === '') return await getProducts();
  const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
  const data = await response.json();
  return data;
}

init();