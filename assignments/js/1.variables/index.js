
/* 1. Declaring Variables
      Declare a variable age using let and assign it the value 25. */
        let age = 25;
      
      /*
      Declare a variable schoolName using const and assign it "Greenwood High". */
        const schoolName = "Greenwood High";

      /* 
      Declare an empty array called studentsList.*/
        const studentsList = []

      /*
      Difference between let const and var when declaring variables
        - let and const are block scoped, var is function scoped
          - block scope: a variable declared with let or const is only available within the block it is declared
          - function scope: a variable declared with var is available within the function it is declared

        - let and var can be reassigned, const cannot be reassigned
        - const should be used when the value of the variable is not going to change, let should be used when the value of the variable is going to change
        - var should not be used in modern JS */

/* 2. Naming Conventions
      Which of the following variable names is invalid?​ */
        let $price = 100;
        // let 1stPlace = "John";  invalid: variable name cannot start with a number
        let _score = 89;
        let userName = "Alice";

      /*
      Why is the following variable name incorrect?​
        const #taxRate = 0.16;
          variable name cannot start with a special character

      Rewrite this variable name to follow best practices:​ */
        let MyvariableNAME = "JavaScript";
        // corrected version: 
        let myVariableName = "JavaScript";

/* 3. Identifying Data Types
      What will be the output of the following?​ */
        console.log(typeof "Hello");
          // string
        console.log(typeof 99);
          // number
        console.log(typeof true); 
          // boolean
        console.log(typeof undefined);
          // undefined
      
      /*
      Identify the data types in this array:​ */
        let data = ["Kenya", 34, false, { country: "USA" }, null];
          // string, number, boolean, object, null

      /*
      How do you define a BigInt in JavaScript? Provide an example.*/
        let bigInt = 1234567890123456789012345678901234567890n;

/* 4. Objects & Arrays
      Create an object person with properties name, age, and city. */
        const person = {
          name: "Jomo Kigo",
          age: 21,
          city: "Nyeri"
        }
      /*
      Add a new property email to the person object*/
        person.email = "kigojomo@gmail.com"
      
      /*
      Declare an array fruits with three fruit names.*/
        const fruits = ["banana", "mango", "orange"]
      
      /*
      ​Access the second item in the fruits array.*/
        console.log(fruits[1])

/*5. Type Coercion
    What will be the output of the following?*/
      console.log("5" + 2);
        // 52 (string)
      console.log("5" - 2);
        // 3 (number)
    
    /*
    Convert the string "100" into a number. */
      const myString = "100";
      const myNum = parseInt(myString);
      console.log(typeof myString) // string
      console.log(typeof myNum) // number
    
    /*
    Convert the number 50 into a string. */
      const num2 = 50;
      const string2 = num2.toString();
      console.log(typeof num2); // number
      console.log(typeof string2); //string

    /*
    What will be the result of this operation? */
      console.log(5 + true);
        // 6: true equates to the number 1, hence 5+1=6