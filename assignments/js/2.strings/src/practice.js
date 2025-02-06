import chalk from 'chalk'


/* 1. Check string input
      Write a JavaScript function to check whether an 'input' is a string or not. */
        console.log(chalk.blue("\n---------------------------"))
        function is_string(input) {
        return typeof input === "string";
      }
      console.log(is_string("w3resource")); // true
      console.log(is_string([1, 2, 4, 0])); // false

/**2. Check blank string 
 *    Write a JavaScript function to check whether a string is blank or not. */
        console.log(chalk.blue("\n---------------------------"))
        function is_Blank(input) {
        return input.length === 0;
      }
      console.log(is_Blank('')); // true
      console.log(is_Blank('abc')); // false
/**3.​ String to Array of Words
 *   Write a JavaScript function to split a string and convert it into an array of words. */
        console.log(chalk.blue("\n---------------------------"))
        function string_to_array(input) {
        return input.split(" ");
      }
      console.log(string_to_array("Robin Singh")); // ["Robin", "Singh"]

/**4. Extract Characters
      Write a JavaScript function to extract a specified number of characters from a string. */
        console.log(chalk.blue("\n---------------------------"))
        function truncate_string(myString, chars){
        return myString.substr(0, chars);
      }
      console.log(truncate_string("Robin Singh", 4)); // "Robi"

/**5.​ Abbreviate Name
      Write a JavaScript function to convert a string into abbreviated form. */
        console.log(chalk.blue("\n---------------------------"))
        function abbrev_name(input){
        let names = input.split(" ")
        return `${names[0]} ${names[1].charAt(0)}`
      }
      console.log(abbrev_name("Robin Singh")); // "Robin S."
  
/**6.​ Hide Email Address
      Write a JavaScript function that hides email addresses to prevent unauthorized access. */
        console.log(chalk.blue("\n---------------------------"))
        function protect_email(email){
        return email.replace(email.substring(5, email.indexOf('@')), "...");
      }
      console.log(protect_email("robin_singh@example.com")); // "robin...@example.com"

/**7.​ Parameterize String
      Write a JavaScript function to parameterize a string. */
        console.log(chalk.blue("\n---------------------------"))
        function string_parameterize(input){
        return input.toLowerCase().trim().replace(/ /g, "-").replace(".", "");
      }
      console.log(string_parameterize("Robin Singh from USA.")); //"robin-singh-from-usa"

/**8.​ Capitalize First Letter
      Write a JavaScript function to capitalize the first letter of a string. */
        console.log(chalk.blue("\n---------------------------"))
        function capitalize(input){
        return `${input.charAt(0).toUpperCase()}${input.substring(1)}`;
      }
      console.log(capitalize('js string exercises')); // "Js string exercises"

/**9. Capitalize Each Word
      Write a JavaScript function to capitalize the first letter of each word in a string. */
        console.log(chalk.blue("\n---------------------------"))
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
        console.log(chalk.blue("\n---------------------------"))
        function swapcase(input){
        return input.split("").map((letter) => {
          const isUpperCase = letter === letter.toUpperCase()
          return isUpperCase ? letter.toLowerCase() : letter.toUpperCase()
        }).join("")
      }
      console.log(swapcase('AaBbc')); // "aAbBC"

/**11.Camelize String
      Write a JavaScript function to convert a string into camel case. */
        console.log(chalk.blue("\n---------------------------"))
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
      console.log(chalk.blue("\n---------------------------"))
      function repeat(word, count){
        let newWord = ""
        for (let i = 1; i <= count; i++){
          newWord = newWord.concat(word)
        }
        return newWord
      }

      console.log(repeat('Ha!', 3)); // "Ha!Ha!Ha!"
      console.log(repeat("Wah!", 5)) // Wah!Wah!Wah!Wah!Wah!

/**14.​Insert in String
      Write a JavaScript function to insert a string within another string at a given position. */
      console.log(chalk.blue("\n---------------------------"))
      function insert(string1, string2, position){
        return string1.slice(0, position).concat(string2).concat(string1.slice(position))
      }

      console.log(insert('We are doing some exercises.', 'JavaScript ', 18)); // "We are doing some JavaScript exercises."
      console.log(insert("There's noother test", "thing wrong with doing an", 10));

/**15.​Humanize Format
      Write a JavaScript function that formats a number with the correct suffix (1st, 2nd, etc.). */
      console.log(chalk.blue("\n---------------------------"))

      function humanize_format(number){
        let suffix = ""
        const lastDigit = number.toString().charAt(number.toString().length - 1)
        const lastTwoDigits = number.toString().slice(-2)
        if (lastTwoDigits === "11" || lastTwoDigits === "12" || lastTwoDigits === "13"){
          suffix = "th"
        } else{
          switch (lastDigit){
            case "1":
              suffix = "st"
              break
            case "2":
              suffix = "nd"
              break
            case "3":
              suffix = "rd"
              break
            default:
              suffix = "th"
          }
        }
        return `${number}${suffix}`
      }
      console.log(humanize_format(301)); // "301st"
      console.log(humanize_format(402)); // "402nd"
      console.log(humanize_format(503)); // "503rd"
      console.log(humanize_format(104)); // "104th"
      console.log(humanize_format(12)); // "12th"

/**16.​Truncate String with Ellipsis
      Write a JavaScript function to truncate a string and append "...". */
      console.log(chalk.blue("\n---------------------------"))

      function text_truncate(string, length, ending){
        if (length === null){
          length = 100
        }
        if (ending === null){
          ending = "..."
        }
        if (string.length > length){
          return string.substring(0, length - ending.length).concat(ending)
        } else{
          return string
        }
      }

      console.log(text_truncate('We are doing JS string exercises.', 15, '!!')); // "We are doing !!"
      console.log(text_truncate("This is just another test case", 14, "!!")) // "This is just!!"

/**17.​Chop String into Chunks
      Write a JavaScript function to chop a string into chunks. */
      console.log(chalk.blue("\n-----Chop into chunks------"))

      function string_chop(string, size){
        const chunks = []
        for (let i = 0; i < string.length; i += size){
          chunks.push(string.slice(i, i + size))
        }
        return chunks
      }

      console.log(string_chop('w3resource', 3)); // ["w3r", "eso", "urc", "e"]
      console.log(string_chop("Yet another test case", 5)) // [ 'Yet a', 'nothe', 'r tes', 't cas', 'e' ]

/* 18.Count Substring Occurrences
      Write a JavaScript function to count occurrences of a substring in a string. */
      console.log(chalk.blue("\n---------------------------"));
      function count(str, search) {
        const regex = new RegExp(search, "gi");
        const matches = str.match(regex);
        return matches ? matches.length : 0;
      }
      console.log(count("The quick brown fox jumps over the lazy dog", 'the')); // Output: 2
      console.log(count("it's always a good idea to test your code more than once", 'de')); // Output: 3
      

/* 19.Reverse Binary Representation
      Write a JavaScript function that reverses the binary representation of a number and returns its decimal form. */
      console.log(chalk.blue("\n---------------------------"));
      function reverse_binary(num) {
        const binaryString = num.toString(2);
        const reversedBinary = binaryString.split("").reverse().join("");
        return parseInt(reversedBinary, 2);
      }
      console.log(reverse_binary(100)); // 19

/* 20.Pad String to Length
      Write a JavaScript function to pad a string to a specified length. */
      console.log(chalk.blue("\n---------------------------"));
      function formatted_string(template, num, padDirection) {
        let strNum = num.toString();
        let targetLength = template.length;
        if (strNum.length < targetLength) {
          let padLength = targetLength - strNum.length;
          let padChars = template.slice(0, padLength);
          if (padDirection === 'l') {
        strNum = padChars + strNum;
          } else {
        strNum = strNum + padChars;
          }
        }
        return strNum;
      }
      console.log(formatted_string('0000', 123, 'l')); // "0123"