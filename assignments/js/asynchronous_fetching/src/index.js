function flagBook(book) {
  const { title, pages, genre } = book;

  if (pages >= 500) {
    console.log(`\n${title}`);
    console.log(`Caution: More than 500 pages`);
  }

  if (genre === 'Dystopian') {
    console.log(`\n${title}`);
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

  console.log('\nBook summaries');
  console.log(summaries);

  console.log('\nBooks published before 1950');
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
  } else if (sortMethod === 'genre') {
    sortedBooks = books.filter((book) => checkGenre(book, inputGenre));
  }

  console.log('\nSorted Books');
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
  return genre === inputGenre;
}

const booksSection = document.getElementById('books-section');

const bookTemplate = (book) => `
  <article class="book-card">
    <img src="${book.image}" alt="${book.title}" class="book-cover" />
    <div class="book-details">
      <h2>${book.title}</h2>
      <h3>By ${book.author}</h3>
      <div class="meta-info">
        <span class="genre">${book.genre}</span>
        <span class="year">${book.year}</span>
        <span class="pages">${book.pages} pages</span>
      </div>
      <p class="publisher">Published by: ${book.publisher}</p>
      <p class="description">${book.description}</p>
      <div class="price-buy">
      <div class="price">KES ${book.price.toLocaleString()}</div>
      <button class="buy-button" onClick="addToCart(${book.id})">Buy Now</button>
      </div>
    </div>
  </article>
`;

function displayBooks(books) {
  booksSection.innerHTML = books.map((book) => bookTemplate(book)).join('');
}

function processBooks(books) {
  // books.map((book) => flagBook(book));
  // summarize(books);
  // sortBooks(books, 'genre', 'asc', "Dystopian");

  let booksToDisplay = books;
  // Preserve the original list of books
  const originalBooks = books;

  // Set up filtering and sorting on form change
  document.getElementById('filter-form').addEventListener('change', () => {
    // Get filter/sort input values
    const sortMethod = document.getElementById('sort-method').value;
    const order = document.getElementById('order').value;
    const genreFilter = document.getElementById('genre-select').value;

    // Start from the original array
    let updatedBooks = originalBooks.slice();

    // Filter by genre if a specific genre is selected
    if (genreFilter !== 'all') {
      updatedBooks = updatedBooks.filter((book) => book.genre.toLowerCase() === genreFilter.toLowerCase());
    }

    // Sort based on the chosen method and order
    updatedBooks.sort((a, b) => {
      if (a[sortMethod] < b[sortMethod]) return order === 'asc' ? -1 : 1;
      if (a[sortMethod] > b[sortMethod]) return order === 'asc' ? 1 : -1;
      return 0;
    });

    // Update the display with the filtered and sorted books
    displayBooks(updatedBooks);
  });
  displayBooks(booksToDisplay);
}

async function fetchBooks() {
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

// ------------------------ CART FUNCTIONALITY----------------------------
const cartButton = document.getElementById("cart-button")
const closeCartButton = document.querySelector(".close-modal")
const cartModal = document.querySelector(".modal")

const cartIndicator = document.querySelector(".cart-counter")
let cartItems = [
  // {
  //   id: "1234",
  //   qty: 1
  // },
  // {
  //   id: "1234",
  //   qty: 1
  // }
]

function addToCart(bookId){
  // check if a book is already in the cart by finding its index
  const itemPosition =  cartItems.findIndex(item => item.id === bookId)

    // -1
    if (itemPosition !== -1){
      // increment its qty
      cartItems[itemPosition].qty ++
    } else{ // 0,1,2 ...
      // add it and set qty to 1
      const newItem = {id: bookId, qty: 1}
      cartItems.push(newItem)
    }

    cartIndicator.innerHTML = cartItems.length
}

cartButton.addEventListener("click", () => {
  cartModal.style.display = 'flex';
})

closeCartButton.addEventListener("click", () => {
  cartModal.style.display = 'none';
})