// objects and arrays are mutable, even when declared as const
const arr: number[] = [1, 2, 3];
arr.push(4);
console.log(arr); // [1, 2, 3, 4]

// primitive types are imutable
const num1 = 1; // cannot be changed

// objects can be made imutable using the readonly property or utility like ReadOnly<T>
type User = {
  readonly name: string;
  age: number;
};

const user1: User = { name: 'Jomo', age: 45 };
console.log(user1);
// user1.name = "Kigo" // Cannot assign to name because it is a readonly property
user1.age = 18; // works coz age is not readonly

const readOnlyObj: Readonly<User> = { name: 'John', age: 7 };
// readOnlyObj.age = 34 // cannot assign to this coz we made the entire object readonly

/* To make an object of the User type partially mutable, you can use TypeScript's utility types and mapped types. Here are some key points to consider:

Original Type: The User type has a readonly property name and a mutable property age.

Making All Properties Mutable: You can create a new type where all properties are mutable by using a mapped type to remove the readonly modifier. Here's how you can do it:
 */

type MutableUser = {
  -readonly [P in keyof User]: User[P];
};

/* This will make both name and age mutable.

Keeping Some Properties Immutable: If you want to keep name immutable and only make age mutable (which is already the case), you don't need to do anything extra. The User type already allows age to be changed.

Creating a Partially Mutable Object: To create an object where only certain properties are mutable, you can define a new type that selectively removes the readonly modifier. However, in this case, since age is already mutable, you might want to focus on ensuring name remains immutable while allowing changes to age.

Example Usage: */

let user: User = {
  name: 'John',
  age: 30,
};

// Attempting to change 'name' will result in an error
// user.name = "Jane"; // Error

// Changing 'age' is allowed
user.age = 31; // Works fine

// If you want to make 'name' mutable as well
let mutableUser: MutableUser = {
  name: 'John',
  age: 30,
};

mutableUser.name = 'Jane'; // Now this works
/* This approach allows you to control the mutability of properties in your objects based on your specific requirements. */

function greet(name: string): string {
  return `Hello ${name}!`;
}

console.log(greet('Doe'));

// generics in functions - allows functions to accept different types while preserving type safety
function identity<T>(value: T): T {
  return value;
}

console.log(identity<string>('Duuuuuuuuddddde'));
console.log(identity<number>(7));
console.log(
  identity<{ name: string; code: number; location: string }>({
    name: 'Bond',
    code: 7,
    location: 'London',
  })
);

// passing multiple generics
function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}
const mergedObj = merge({ name: 'green' }, { age: 24 });
console.log(mergedObj);

// arrays in typescript
const fruits: Array<string> = ['apple', 'banana', 'cherry'];
const marks: number[] = [1, 2, 3, 4, 5, 6];

// promises in typescipt
interface UserType {
  uid: string;
  uname: string;
  isAdmin: boolean;
}

const data: UserType = {
  uid: 'e8ru8ruerycery',
  uname: 'john.doe',
  isAdmin: true,
};

const fetchData = async (): Promise<UserType> => {
  const user_data = await data;
  return user_data;
};

fetchData().then((user) => console.log(user));

// a set is a collection of unique values
// in tyescipt, it is typed using Set<Type>

const mySet: Set<number> = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
mySet.add(12);
console.log(mySet); // Set(11) { 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 12 }
console.log(mySet.has(12));

// creating an empty set with specific types
const emptySet = new Set<string>();
emptySet.add('Duuudee ... like, fr??!!!');
console.log(emptySet);

// Type assertion and casting
// use as syntax
// use angle brackets syntax - NOT RECOMMENDED
const jsonString = '{"name": "doe", "age": 30}';
const parsedData = JSON.parse(jsonString) as {name: string, age: number}
console.log(parsedData)

// default parametres
const greet2 = (name: string, greetings: string = "Wassup") => {
  console.log(`\n---> ${greetings} ${name}!\n`)
}

greet2("Nigga")