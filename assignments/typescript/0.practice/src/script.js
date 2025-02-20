"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const signUpForm = document.getElementById("sign-up-form");
const handleSubmit = async (e) => {
    e.preventDefault();
    alert("Yohooo!!!!");
};
signUpForm === null || signUpForm === void 0 ? void 0 : signUpForm.addEventListener("submit", handleSubmit);
