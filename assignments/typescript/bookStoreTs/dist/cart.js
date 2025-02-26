// display cart ui and cart counter
const cartButton = document.querySelector('.cart-button');
const cartCounter = document.querySelector('.cart-counter');
let cart = [];
export function updateCartUi() {
    if (cartCounter) {
        cartCounter.innerHTML = cart.length.toString();
    }
    else {
        console.log('Not found');
    }
}
//# sourceMappingURL=cart.js.map