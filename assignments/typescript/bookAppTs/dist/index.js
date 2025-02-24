"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cart_1 = require("./cart");
var products_1 = require("./products");
var productList = document.getElementById("product-list");
products_1.products.forEach(function (product) {
    var item = document.createElement("div");
    item.className = "product";
    item.innerHTML = "\n    <h2>".concat(product.name, "</h2>\n    <p>Price: $").concat(product.price, "</p>\n    <button data-id=\"").concat(product.id, "\">Add to Cart</button>\n  ");
    productList === null || productList === void 0 ? void 0 : productList.appendChild(item);
});
document.addEventListener("click", function (event) {
    if (event.target.matches("button[data-id]")) {
        var button = event.target;
        var productId = parseInt(button.dataset.id || "0");
        (0, cart_1.addToCart)(productId);
    }
});
//# sourceMappingURL=index.js.map