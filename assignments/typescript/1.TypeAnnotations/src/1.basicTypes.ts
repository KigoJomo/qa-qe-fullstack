let name2: string = 'Roci';
console.log(name2);
console.log(typeof name2);

let name3: string;

function logInfo(
  title: string,
  trackCount: number,
  isReleased: boolean
): string {
  console.log('dude');

  return '';
}

function add(x: number, y: number): number {
  return x + y;
}

let car: string = "BMW"
let age:number = 25
let isFav:boolean = true

let numbers:number[] = [1,2,3,4,5,6,7,8,9,0]
console.log(typeof(numbers))

let names = ['John', 'Doe', 'Jane', 'Doe-ess']
console.log(names)
console.log(typeof(names[1]))

names.push('2')
// names.push(2) // results in a type error

interface myInfoArgs{
  name: string
  age: number
}

function myInfo({name, age}: myInfoArgs){
  console.log(typeof(name), typeof(age))
}

myInfo({name: "dude", age: 21})

console.log("-----------------------------------------------------------------------------------")

const concatTwoStrings = (a: string, b:string) =>{
  return [a, b].join("")
}

console.log(concatTwoStrings("Duuuuude!!!!! ", "WTF!!!!?????"))

const concatTwoStrings2 = (a:string[], b:string) => {
  return [a.join(""), b].join("")
}

console.log(concatTwoStrings2(["D", "u", "u", "u", "d", "e", "!"], "WTF????!!!!"))

const handleFormData = (e: any) => {
  e.preventDefault()

  const data  = new FormData(e.target);
  const value = Object.fromEntries(data.entries());

  return value;
}