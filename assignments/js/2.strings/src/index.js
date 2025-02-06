let myName = "" // empty string
let myBook = "Intro to JS"
let statement = "I love to code"
let laptopType = "HP"

// String properties
// 1 . Length
let name = 'Alice'
console.log(name.length) // 5

// charAt()
console.log(name.charAt(0)) // A

// concat() - concatenates or joins two or more strings
let firstName = 'Julia'
let lastName = 'Mwangi'
console.log(firstName.concat(lastName)) // JuliaMwangi
console.log(firstName.concat(' ', lastName)) // Julia Mwangi
console.log(firstName.concat(` ${'Malik'}`)) // Julia Malik

// indexof() - returns the index of the first occurrence of a specified value in a string
let sentence = 'I am a student'
console.log(sentence.indexOf('a'))

// includes - returns true if a string contains a specified value
console.log(sentence.includes('en')) // true
console.log(sentence.includes('En')) // false

// toLowerCase()
const animal = "ELEPHANT"
console.log(animal.toLowerCase())

// toUpperCase()
const anotherAnimal = "gazelle"
console.log(anotherAnimal.toUpperCase())

// split
const favCar = "BMW M5 CS"
const reversedCar = favCar.split('').reverse().join('')
console.log(favCar)
console.log(reversedCar)

// substring - extracts characters from a string between two specified indices
let mainString = "Why do devs hate Javascript?"
console.log(mainString.substring(7, 28))

// substr() - extracts parts of a string
// begining at the char of the specified position
// and returns the specified number of chars
// e.g., start at index 7 and return 14 characters
console.log(mainString.substr(7, 14))

// trim - removes whitespaces from both ends of a string
let untrimmed = " This is a sentence. "
console.log(`Untrimmed:\t "${untrimmed}"`)
console.log(`Trimmed:\t "${untrimmed.trim()}"`)

  // trimStart - remove whitespaces at the start only
  console.log(`Trimmed (start): "${untrimmed.trimStart()}"`)

  // trimEnd - removes whitespaces at the end only
  console.log(`Trimmed (end): "${untrimmed.trimEnd()}"`)