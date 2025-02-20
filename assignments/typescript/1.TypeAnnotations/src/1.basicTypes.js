"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let name2 = 'Roci';
console.log(name2);
console.log(typeof name2);
let name3;
function logInfo(title, trackCount, isReleased) {
    console.log('dude');
    return '';
}
function add(x, y) {
    return x + y;
}
let car = "BMW";
let age = 25;
let isFav = true;
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
console.log(typeof (numbers));
let names = ['John', 'Doe', 'Jane', 'Doe-ess'];
console.log(names);
console.log(typeof (names[1]));
names.push('2');
function myInfo({ name, age }) {
    console.log(typeof (name), typeof (age));
}
myInfo({ name: "dude", age: 21 });
console.log("-----------------------------------------------------------------------------------");
const concatTwoStrings = (a, b) => {
    return [a, b].join("");
};
console.log(concatTwoStrings("Duuuuude!!!!! ", "WTF!!!!?????"));
const concatTwoStrings2 = (a, b) => {
    return [a.join(""), b].join("");
};
console.log(concatTwoStrings2(["D", "u", "u", "u", "d", "e", "!"], "WTF????!!!!"));
const handleFormData = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const value = Object.fromEntries(data.entries());
    return value;
};
