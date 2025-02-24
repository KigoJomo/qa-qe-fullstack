
// to share types across modules, use the export keyword:

export type AnimalType = {
  name: string;
  age?: number;
  type: string;
};

let cat: AnimalType = {
  name: 'Cat',
  type: 'Mammal',
  age: 2,
};

let dog: AnimalType = {
  name: "Dog",
  type: "Mammal",
  age: 5
}

const talkToAnimal1 = (animal: AnimalType) => {
  console.log(animal.name, animal.type, animal.age);
};

talkToAnimal1(cat)
talkToAnimal1(dog)

console.log('----------------------------------------------------------------')

type RectangleType = {
  width: number;
  height: number;
}

const getRectangleArea = (rectangle: RectangleType) =>{
  return rectangle.width * rectangle.height
}

const getRectanglePerimetre = (rectangle: RectangleType) => {
  return (rectangle.width + rectangle.height) * 2;
}

const rect1: RectangleType = {
  width: 96,
  height: 24
}

console.log('Area: ', getRectangleArea(rect1))
console.log('Perimetre: ', getRectanglePerimetre(rect1))