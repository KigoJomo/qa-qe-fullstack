import chalk from 'chalk';

function flagBook(book) {
  const { title, pages, genre } = book;

  if (pages >= 500) {
    console.log(chalk.red(title));
    console.log(`Caution: More than 500 pages`);
  }

  if (genre === 'Dystopian') {
    console.log(chalk.red(title));
    console.log('Caution: Dystopian Future');
  }
}

function summarize(books) {
  // create an array of formatted book summaries
  let summaries = [];

  books.map((book) => {
    const { title, author, genre, pages } = book;

    summaries.push(`${title} by ${author} - ${genre} (${pages} pages)`);
  });

  console.log(chalk.blue('\nBook summaries'));
  console.log(summaries);

  console.log(chalk.blue('\nBooks published before 1950'));
  const oldBooks = books.filter(checkYear);
  oldBooks.map((book) => {
    const { title, year } = book;
    console.log(`${title} - ${year}`);
  });
}

function sortBooks(
  books,
  sortMethod = 'title', // year, title, pages, genre
  order = 'asc', // asc, desc
  inputGenre
) {
  let sortedBooks;

  // to sort by title (alphabetically)
  if (sortMethod === 'title') {
    sortedBooks = books.sort((a, b) => {
      if (a.title < b.title) {
        return order === 'asc' ? -1 : 1;
      }
      if (a.title > b.title) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    });
  } else if (sortMethod === 'year') {
    if (order === 'asc') {
      sortedBooks = books.sort((a, b) => a.year - b.year);
    } else if (order === 'desc') {
      sortedBooks = books.sort((a, b) => b.year - a.year);
    }
  } else if (sortMethod === 'pages') {
    if (order === 'asc') {
      sortedBooks = books.sort((a, b) => a.pages - b.pages);
    } else if (order === 'desc') {
      sortedBooks = books.sort((a, b) => b.pages - a.pages);
    }
  } else if (sortMethod === "genre"){
    sortedBooks = books.filter(book => checkGenre(book, inputGenre))
  }

  console.log(chalk.blue('\nSorted Books'));
  sortedBooks.map((book) => {
    console.log(`${book.year} - ${book.pages} pages - ${book.title}`);
  });
}
function checkYear(book) {
  const { year } = book;
  return year < 1950;
}

function checkGenre(book, inputGenre) {
  const { genre } = book;
  return genre === inputGenre
}

function processBooks(books) {
  books.map((book) => flagBook(book));
  summarize(books);
  sortBooks(books, 'genre', 'asc', "Dystopian");
}

async function fetchBooks() {
  // fetch('http://localhost:3000/books')
  //   .then((response) => response.json())
  //   .then((data) => processBooks(data))
  //   .catch((error) => console.error(`An error occured: ${error}`));

  try {
    const response = await fetch('http://localhost:3000/books');
    const data = await response.json();
    // console.log(data)
    processBooks(data);
  } catch (error) {
    console.error(`An error occured: ${error}`);
  }
}

fetchBooks();
