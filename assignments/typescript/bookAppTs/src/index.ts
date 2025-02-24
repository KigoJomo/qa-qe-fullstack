import { addToCart } from "./cart";
import { products } from "./products";

const productList = document.getElementById("product-list");

products.forEach((product) => {
  const item = document.createElement("div");
  item.className = "product";
  item.innerHTML = `
    <h2>${product.name}</h2>
    <p>Price: $${product.price}</p>
    <button data-id="${product.id}">Add to Cart</button>
  `;
  productList?.appendChild(item);
});

document.addEventListener("click", (event) => {
  if ((event.target as HTMLElement).matches("button[data-id]")) {
    const button = event.target as HTMLButtonElement;
    const productId = parseInt(button.dataset.id || "0");
    addToCart(productId);
  }
});