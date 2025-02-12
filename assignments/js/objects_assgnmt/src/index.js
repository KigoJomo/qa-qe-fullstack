const API_URL = 'http://localhost:3000/products';
const productsContainer = document.querySelector('.products-container');

async function fetchProducts() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const products = await response.json();

    displayProducts(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    productsContainer.innerHTML = `
      <div style="text-align: center; color: #ff6b6b;">
        <h2>Error loading products</h2>
        <p>${error.message}</p>
      </div>
    `;
  }
}

function displayProducts(products) {
  productsContainer.innerHTML = products.map(product => `
    <div class="product-card">
      <h2>${product.name}</h2>
      <p class="product-info">${product.description}</p>
      <p class="price">$${product.price.toFixed(2)}</p>
      <p class="product-info">Category: ${product.category}</p>
      <p class="stock">In Stock: ${product.stock}</p>
    </div>
  `).join('');
}

fetchProducts();