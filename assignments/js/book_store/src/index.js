const booksSection = document.getElementById('books-section');
const cartItemsSection = document.querySelector('.cart-items');
const cartModal = document.querySelector('.modal');
const cartCounter = document.querySelector('.cart-counter');
const cartTotalElement = document.getElementById('cart-total');
const filterForm = document.getElementById('filter-form');
const sortMethod = document.getElementById('sort-method');
const order = document.getElementById('order');
const genreSelect = document.getElementById('genre-select');

let allBooks = [];
let cartItems = [];

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
        <button class="buy-button" onClick="addToCart(${
          book.id
        })">Buy Now</button>
      </div>
    </div>
  </article>
`;

function displayBooks(books) {
  booksSection.innerHTML = books.map((book) => bookTemplate(book)).join('');
}

function processBooks(books) {
  allBooks = books;
  applyFilters();
}

function applyFilters() {
  let filteredBooks = [...allBooks];

  // Genre filter
  const genreFilter = genreSelect.value.toLowerCase();
  if (genreFilter !== 'all') {
    filteredBooks = filteredBooks.filter(
      (book) => book.genre.toLowerCase() === genreFilter
    );
  }

  // Sorting
  const sortBy = sortMethod.value;
  const sortOrder = order.value;
  filteredBooks.sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  displayBooks(filteredBooks);
}

async function fetchBooks() {
  try {
    const response = await fetch('http://localhost:3000/books');
    const data = await response.json();
    processBooks(data);
  } catch (error) {
    console.error('Error fetching books:', error);
  }
}

function addToCart(bookId) {
  const book = allBooks.find((b) => Number(b.id) === Number(bookId));
  console.log(book);

  const existingItem = cartItems.find((item) => item.id === bookId);
  let newItem;

  if (existingItem) {
    existingItem.quantity++;
  } else {
    newItem = { ...book, quantity: 1 };
    cartItems.push(newItem);
  }

  console.log(newItem);

  updateCartUI();
}

function updateCartUI() {
  cartCounter.textContent = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  renderCart();
}

function renderCart() {
  cartItemsSection.innerHTML = cartItems
    .map(
      (item) => `
    <article class="cart-item" data-id="${item.id}">
      <img src="${item.image}" alt="${item.title}" class="cart-item-image" />
      <div class="cart-item-details">
        <h3>${item.title}</h3>
        <p class="author">By ${item.author}</p>
        <div class="price-info">
          <span class="price">KES ${(
            item.price * item.quantity
          ).toLocaleString()}</span>
          <div class="quantity-controls">
            <button class="quantity-btn" data-id="${
              item.id
            }" data-action="decrease">−</button>
            <span class="quantity">${item.quantity}</span>
            <button class="quantity-btn" data-id="${
              item.id
            }" data-action="increase">+</button>
          </div>
        </div>
      </div>
      <button class="remove-btn" data-id="${
        item.id
      }" data-action="remove">×</button>
    </article>
  `
    )
    .join('');

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  cartTotalElement.textContent = `KES ${total.toLocaleString()}`;
}

document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;

  const action = btn.dataset.action;
  const bookId = Number(btn.dataset.id);
  const itemIndex = cartItems.findIndex((item) => item.id === bookId);

  if (itemIndex === -1) return;

  switch (action) {
    case 'increase':
      cartItems[itemIndex].quantity++;
      break;
    case 'decrease':
      if (cartItems[itemIndex].quantity > 1) {
        cartItems[itemIndex].quantity--;
      } else {
        cartItems.splice(itemIndex, 1);
      }
      break;
    case 'remove':
      cartItems.splice(itemIndex, 1);
      break;
  }

  updateCartUI();
});

document.getElementById('cart-button').addEventListener('click', () => {
  cartModal.style.display = 'flex';
});

document.querySelector('.close-modal').addEventListener('click', () => {
  cartModal.style.display = 'none';
});

filterForm.addEventListener('change', applyFilters);

// Initialize
fetchBooks();
