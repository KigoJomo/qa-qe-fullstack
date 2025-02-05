import chalk from 'chalk';

async function fecthJoke() {
  try {
    const response = await fetch(
      'https://official-joke-api.appspot.com/random_joke'
    );
    const data = await response.json();
    console.log("\n\n")
    console.log(chalk.red(data.setup));
    console.log(chalk.blue(data.punchline));
    console.log("\n\n")
  } catch (error) {
    console.log(chalk.red(error));
  }
}

fecthJoke();

// const jokeFetch = new Promise(async (resolve, reject) => {
//   try {
//     const response = await fetch("https://official-joke-api.appspot.com/random_joke");
//     if (!response.ok) {
//       reject(`Error fetching joke: ${response.status}`);
//     }
//     const data = await response.json();
//     resolve(data);
//   } catch (error) {
//     reject(`Error fetching joke: ${error}`);
//   }
// });

// jokeFetch.then(data => {
//   console.log(data.setup)
//   console.log(data.punchline)
// }).catch(error =>
//   console.error(error)
// )