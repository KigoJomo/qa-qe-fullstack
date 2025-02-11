import chalk from "chalk"

function addNumbers(a, b){
  return a +b;
}

function multiply(a, b){
  return a*b;
}

const num1 = 4
const num2 = 5

const result = addNumbers(num1, num2)
const product = multiply(num1, num2)

console.log(`The sum of ${num1} and ${num2} is:`)
console.log(chalk.green(`> ${result}`));

console.log(`\nThe product of ${num1} and ${num2} is:`)
console.log(chalk.red(`> ${product}`))