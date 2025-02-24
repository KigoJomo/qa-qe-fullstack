const talkToAnimal = (animal: { name: string; type: string; age: number }) => {
  console.log(animal.name, animal.type, animal.age);
};

const cow = {
  name: "cow",
  type: "Mammal",
  age: 10
};

talkToAnimal(cow);