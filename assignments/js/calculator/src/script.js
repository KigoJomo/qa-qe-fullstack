/*
  CALCULATOR
  -------------------------------------
  There needs to be: 
    1. an input and a result display
    2. buttons: 
        numbers and operators
        clear/backspace button
        equals (submit) button

  Operations to perform:
    1. Addition
    2. Subtraction
    3. Multiplication
    4. Division
 */

const display = document.getElementById('display');

let currentNum = '';
let operator = null;
let operands = [];

function updateDisplay(str) {
  display.innerText = display.innerText + str;
}

updateDisplay('');

function clearDisplay() {
  currentNum = '';
  operands = [];
  display.innerText = '';
}

function deleteNumb() {
  display.innerText = display.innerText.slice(0, display.innerText.length - 1);
  currentNum = currentNum.slice(0, currentNum.length - 1);
}

const deleteBtn = document.querySelector('.backspace');
deleteBtn.addEventListener('click', () => deleteNumb());

const clearBtn = document.querySelector('.clear');
clearBtn.addEventListener('click', () => {
  clearDisplay();
});

const numberBtns = document.querySelectorAll('button.number');

for (const button of numberBtns) {
  button.addEventListener('click', () => {
    updateDisplay(button.innerText);
    currentNum = currentNum + button.innerText;
  });
}

function insertOperator(str) {
  operator = str;
  operands.push(currentNum);
  currentNum = '';
  updateDisplay(str);
}

const operatorBtns = document.querySelectorAll('.operator');
for (const opBtn of operatorBtns) {
  opBtn.addEventListener('click', () => {
    insertOperator(opBtn.innerText);
  });
}

function addition(num1, num2) {
  return num1 + num2;
}

function subtraction(num1, num2) {
  return num1 - num2;
}

function multiplication(num1, num2) {
  return num1 * num2;
}

function division(num1, num2) {
  return num1 / num2;
}

let result;

const equalsBtn = document.querySelector('.equals');
equalsBtn.addEventListener('click', () => {
  let secondOpnd = currentNum;
  operands.push(secondOpnd);

  if (operator === '+') {
    result = addition(parseFloat(operands[0]), parseFloat(operands[1]));
  } else if (operator === '-') {
    result = subtraction(parseFloat(operands[0]), parseFloat(operands[1]));
  } else if (operator === 'x') {
    result = multiplication(parseFloat(operands[0]), parseFloat(operands[1]));
  } else if (operator === '÷') {
    result = division(parseFloat(operands[0]), parseFloat(operands[1]));
  } else {
    console.log('An error occured');
  }

  clearDisplay();
  updateDisplay(result);
  currentNum = '';
});
