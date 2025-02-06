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