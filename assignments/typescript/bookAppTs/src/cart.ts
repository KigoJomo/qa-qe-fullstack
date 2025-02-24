import { products } from "./products";

let cart: { id: number; name: string; price: number }[] = [];

export function addToCart(id: number) {
  const product = products.find((p: { id: number; }) => {
    return p.id === id;
  });

  if (product) {
    cart.push(product);
    console.log(`Added ${product.name} to cart.`);
  }
}