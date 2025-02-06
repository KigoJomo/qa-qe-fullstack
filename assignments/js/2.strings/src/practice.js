import chalk from 'chalk'


/* 1. Check string input
      Write a JavaScript function to check whether an 'input' is a string or not. */
      function is_string(input) {
        return typeof input === "string";
      }
      console.log(is_string("w3resource")); // true
      console.log(is_string([1, 2, 4, 0])); // false

/**2. Check blank string 
 *    Write a JavaScript function to check whether a string is blank or not. */
      function is_Blank(input) {
        return input.length === 0;
      }
      console.log(is_Blank('')); // true
      console.log(is_Blank('abc')); // false
/**3.​ String to Array of Words
 *   Write a JavaScript function to split a string and convert it into an array of words. */
      function string_to_array(input) {
        return input.split(" ");
      }
      console.log(string_to_array("Robin Singh")); // ["Robin", "Singh"]

/**4. Extract Characters
      Write a JavaScript function to extract a specified number of characters from a string. */
      function truncate_string(myString, chars){
        return myString.substr(0, chars);
      }
      console.log(truncate_string("Robin Singh", 4)); // "Robi"

/**5.​ Abbreviate Name
      Write a JavaScript function to convert a string into abbreviated form. */
      function abbrev_name(input){
        let names = input.split(" ")
        return `${names[0]} ${names[1].charAt(0)}`
      }
      console.log(abbrev_name("Robin Singh")); // "Robin S."
  
/**6.​ Hide Email Address
      Write a JavaScript function that hides email addresses to prevent unauthorized access. */
      function protect_email(email){
        return email.replace(email.substring(5, email.indexOf('@')), "...");
      }
      console.log(protect_email("robin_singh@example.com")); // "robin...@example.com"

/**7.​ Parameterize String
      Write a JavaScript function to parameterize a string. */
      function string_parameterize(input){
        return input.toLowerCase().trim().replace(/ /g, "-").replace(".", "");
      }
      console.log(string_parameterize("Robin Singh from USA.")); //"robin-singh-from-usa"

/**8.​ Capitalize First Letter
      Write a JavaScript function to capitalize the first letter of a string. */
      function capitalize(input){
        return `${input.charAt(0).toUpperCase()}${input.substring(1)}`;
      }
      console.log(capitalize('js string exercises')); // "Js string exercises"

/**9. Capitalize Each Word
      Write a JavaScript function to capitalize the first letter of each word in a string. */
      function capitalize_Words(input){
        let words = input.split(" ")
        return words.map((word) => {
          const firstLetter = word.charAt(0).toUpperCase()
          return `${firstLetter}${word.substring(1)}`
        }).join(" ")
      }
      console.log(capitalize_Words('js string exercises')); // "Js String Exercises"

/**10.​Swap Case
      Write a JavaScript function that converts uppercase letters to lowercase and vice versa. */
      function swapcase(input){
        return input.split("").map((letter) => {
          const isUpperCase = letter === letter.toUpperCase()
          return isUpperCase ? letter.toLowerCase() : letter.toUpperCase()
        }).join("")
      }
      console.log(swapcase('AaBbc')); // "aAbBC"

/**11.Camelize String
      Write a JavaScript function to convert a string into camel case. */
      function camelize(input){
        return input.split(" ").map((word, index) => {
          if(index === 0){
            return `${word.charAt(0).toLowerCase()}${word.substring(1)}`
          } else{
            return `${word.charAt(0).toUpperCase()}${word.substring(1)}`
          }
        }).join("")
      }
      console.log(camelize("JavaScript Exercises")); // "javaScriptExercises"
      console.log(camelize("this is just another test case")) // "thisIsJustAnotherTestCase"

/**12.​Uncamelize String
      Write a JavaScript function to uncamelize a string. */
      console.log(chalk.blue("\n---------------------------"))

      function uncamelize(input, joiner){
        const finalString = []
        input.split("").map((letter) => {
          if (letter === letter.toUpperCase()){
            if (joiner) {
              finalString.push("-")
            } else{
              finalString.push(" ")
            }
            finalString.push(letter.toLowerCase())
          } else{
            finalString.push(letter)
          }
        })

        return finalString.join("")
      }
      console.log(uncamelize('helloWorld','-')); // "hello-world"
      console.log(uncamelize("justMeTryingOutAnotherTestCase")) // just me trying out another test case

/**13.​Repeat String
      Write a JavaScript function to concatenate a given string n times. */
      function repeat(word, count){
        let newWord = ""
        for (let i = 1; i <= count; i++){
          newWord = newWord.concat(word)
        }
        return newWord
      }

      console.log(repeat('Ha!', 3)); // "Ha!Ha!Ha!"
      console.log(repeat("Wah!", 5)) // Wah!Wah!Wah!Wah!Wah!