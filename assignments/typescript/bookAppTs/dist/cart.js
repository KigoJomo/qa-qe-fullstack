"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToCart = addToCart;
var products_1 = require("./products");
var cart = [];
function addToCart(id) {
    var product = products_1.products.find(function (p) { return p.id === id; });
    if (product) {
        cart.push(product);
        console.log("Added ".concat(product.name, " to cart."));
    }
}
//# sourceMappingURL=cart.js.map