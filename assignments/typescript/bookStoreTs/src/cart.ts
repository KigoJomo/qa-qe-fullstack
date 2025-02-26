import { Book, books } from './books';

// display cart ui and cart counter
const cartButton = document.querySelector('.cart-button');
let closeCart = document.querySelectorAll('.close-cart');
const cartCounter: HTMLSpanElement | null =
  document.querySelector('.cart-counter');
const cartModal: HTMLDivElement | null = document.querySelector('.cart-modal');
const cartList = document.querySelector('.cart-list');
let amountButtons: NodeListOf<HTMLButtonElement> =
  document.querySelectorAll('.qty-btn');

interface CartItem extends Book {
  quantity: number;
}

let storedCart = localStorage.getItem('bookStoreCart');

if (storedCart !== null && storedCart !== 'undefined') {
  console.log('Cart found');
} else {
  console.log('Cart not found');
  localStorage.setItem('bookStoreCart', JSON.stringify([]));
  storedCart = '[]';
}

const cart: CartItem[] = JSON.parse(storedCart);

let cartOpen = false;

function updateCartCounter() {
  if (cartCounter) {
    cartCounter.innerHTML = `(${cart?.length})`;
  } else {
    console.log('Not found');
  }
}

function updateCartList() {
  cartList ? (cartList.innerHTML = '') : null;

  if(cart.length <=0 ){
    if(cartList){
      cartList.innerHTML = `
        <h4>Your cart is empty</h4>
        <button class="close-cart">Continue Shopping</button>
      `
      closeCart = document.querySelectorAll('.close-cart');
      closeCart.forEach((element) => {
        element.addEventListener('click', toggleCart);
      });
    }
  }

  cart.forEach((item: CartItem) => {
    const cartItem = document.createElement('div');
    cartItem.innerHTML = `
      <div class="cart-item flex gap-2">
        <img src="${item.image}" alt="" class="w-16 aspect-[3/4]" />
        <div
          class="details w-full flex flex-col justify-between">
          <h4 class="capitalize font-bold">${item.title}</h4>

          <p>Ksh ${item.price.toLocaleString()}</p>

          <div class="w-full flex justify-between">
            <div class="flex items-center gap-1">
              <button class="cart-amnt-btn qty-btn" data-id="${
                item.id
              }" data-operation="decrease">-</button>
              <span
                class="px-4 py-1 border border-gray-400 rounded-full text-xs"
                >${item.quantity}</span
              >
              <button class="cart-amnt-btn qty-btn" data-id="${
                item.id
              }" data-operation="increase">+</button>
            </div>

            <button class="delete qty-btn" data-id="${item.id}" data-operation="delete">
              Remove
            </button>
          </div>
        </div>
      </div>
    `;
    cartList?.append(cartItem);
  });

  const total = document.createElement("div")
  total.style.marginTop = 'auto'
  
  total.innerHTML = `
    <div class="w-full flex items-center justify-between border-t border-gray-400 pt-4">
      <p>Total:</p>
      <p class="text-blue-800">Ksh ${cart.reduce((acc, item) => acc + (item.quantity * item.price), 0).toLocaleString()}</p>
    </div>
  `
  cartList?.append(total)

  amountButtons = document.querySelectorAll('.qty-btn');

  amountButtons.forEach((button) => {
    button.addEventListener('click', updateAmount);
  });
}

export function updateCartUi() {
  updateCartCounter();
  updateCartList();
}

function toggleCart() {
  if (cartOpen) {
    console.log('Hiding the cart');
    cartModal ? (cartModal.style.display = 'none') : null;
  } else {
    console.log('Revealing the cart');
    cartModal ? (cartModal.style.display = 'flex') : null;
  }
  cartOpen = !cartOpen;
}

function addToCart(event: Event) {
  const button = event.currentTarget as HTMLButtonElement;
  const id = Number(button.dataset.id);
  console.log('Adding to cart: ', id);

  const bookToAdd = books.find((book) => book.id === id);
  const cartPosition = cart.findIndex((book) => book.id === id);
  const isInCart = cartPosition !== -1;

  if (bookToAdd) {
    if (!isInCart) {
      const newCartItem = { ...bookToAdd, quantity: 1 };
      cart.push(newCartItem);

      console.table(newCartItem);
    } else {
      cart[cartPosition].quantity++;
    }
  }

  localStorage.setItem('bookStoreCart', JSON.stringify(cart));
  updateCartUi();
}

function updateAmount(event: Event) {
  const button = event.currentTarget as HTMLButtonElement;
  const id = Number(button.dataset.id);
  const operation: string | undefined = button.dataset.operation;

  const cartPosition = cart.findIndex((book) => book.id === id);

  if (operation === 'increase') {
    cart[cartPosition].quantity++;
  } else if (operation === 'decrease') {
    const currentAmount = cart[cartPosition].quantity;

    if (currentAmount <= 1) {
      cart.splice(cartPosition, 1);
    } else {
      cart[cartPosition].quantity--;
    }
  } else if (operation === "delete"){
    cart.splice(cartPosition, 1);
  }

  localStorage.setItem('bookStoreCart', JSON.stringify(cart));
  updateCartUi();
}

cartButton?.addEventListener('click', toggleCart);
closeCart.forEach((element) => {
  element.addEventListener('click', toggleCart);
});
document.addEventListener('DOMContentLoaded', () => {
  const buyButtons = document.querySelectorAll('.buy-now');

  buyButtons.forEach((button) => {
    button.addEventListener('click', addToCart);
  });
});
