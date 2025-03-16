"use strict";
const SITE_URL = 'http://localhost:3000';
const filterToggle = document.querySelector('#filter-toggle');
const applyFiltersMobile = document.querySelector('#apply-filters-mobile');
const filterMenu = document.querySelector('#filter-menu');
const bookGrid = document.querySelector('#book-grid');
const genreSelect = document.querySelector('#genre-select select');
const publisherSelect = document.querySelector('#publisher-select select');
const applyFilterBtns = document.querySelectorAll('.apply-filters');
let filterMenuOpen = false;
let allBooks = [];
let publishers, genres;
const sortParams = [
    'title, A-Z',
    'title, Z-A',
    'year, old - new',
    'year, new - old',
    'pages, low - high',
    'pages, high - low',
];
let sortBy = sortParams[0];
const handleFilterToggle = () => {
    if (!filterToggle)
        return;
    if (!filterMenuOpen) {
        filterToggle.innerHTML = `<span class="material-symbols-outlined">close</span>`;
        filterMenu?.classList.add('flex');
        filterMenu?.classList.remove('hidden', 'md:!flex');
        filterMenuOpen = true;
    }
    else {
        filterToggle.innerHTML = `<span class="material-symbols-outlined">filter_list</span>`;
        filterMenu?.classList.remove('flex');
        filterMenu?.classList.add('hidden', 'md:!flex');
        filterMenuOpen = false;
    }
};
const bookHtmlTemplate = (book) => {
    return `
    <div
      class="book w-full aspect-[1] bg-gray-900 hover:bg-gray-800 border border-gray-500 hover:border-gray-200 rounded-2xl flex flex-col gap-2 pb-4 transition-all duration-300">
      <img
        src="${book.image}"
        alt="${book.title}"
        class="w-full aspect-square rounded-t-3xl" />
      <div class="w-full flex flex-col gap-2 px-2 md:px-4">
        <span
          class="capitalize text-base font-bold"
          title="${book.title}"
          >${book.title}</span
        >
        <span
          class="capitalize text-xs border border-gray-400 w-fit rounded-full px-1 bg-gray-600">
          ${book.author}
        </span>
        <div
          class="w-full flex md:items-center flex-col md:flex-row justify-between">
          <span class="capitalize text-xs">${book.genre}</span>
          <span class="capitalize text-xs whitespace-nowrap">${book.pages} pages</span>
        </div>
        <span class="capitalize text-xs border-l-4 border-amber-300 pl-1"
          >released: ${book.year}</span
        >
      </div>
    </div>
  `;
};
const populateFilters = (books) => {
    // Get unique publishers and genres
    publishers = [...new Set(books.map((book) => book.publisher))];
    genres = [...new Set(books.map((book) => book.genre))];
    if (genreSelect) {
        // Clear existing options and add the default "all" option
        genreSelect.innerHTML = '<option value="">all</option>';
        // Add genre options
        genres.forEach((genre) => {
            const option = document.createElement('option');
            option.value = genre;
            option.textContent = genre;
            genreSelect.appendChild(option);
        });
    }
    if (publisherSelect) {
        // Clear existing options and add the default "all" option
        publisherSelect.innerHTML = '<option value="">all</option>';
        // Add publisher options
        publishers.forEach((publisher) => {
            const option = document.createElement('option');
            option.value = publisher;
            option.textContent = publisher;
            publisherSelect.appendChild(option);
        });
    }
    // Add sort options
    const sortOptionsContainer = document.querySelector('#sort-options');
    if (sortOptionsContainer) {
        sortOptionsContainer.innerHTML = '<label for="">sort by:</label>';
        sortParams.forEach((param) => {
            const sortRadioInput = document.createElement('div');
            sortRadioInput.classList.add('radio-input');
            sortRadioInput.innerHTML = `
        <input
          type="radio"
          name="sort-by"
          id="${param.replace(/[^a-zA-Z]/g, '')}"
          value="${param}"
          ${param === sortBy ? 'checked' : ''}
        />
        <label for="${param.replace(/[^a-zA-Z]/g, '')}">${param}</label>
      `;
            sortOptionsContainer.appendChild(sortRadioInput);
        });
    }
};
const applyFilters = () => {
    const selectedGenre = genreSelect?.value;
    const selectedPublisher = publisherSelect?.value;
    const sortRadio = document.querySelector('input[name="sort-by"]:checked');
    sortBy = sortRadio?.value || sortParams[0];
    let filteredBooks = [...allBooks];
    if (selectedGenre) {
        filteredBooks = filteredBooks.filter((book) => book.genre === selectedGenre);
    }
    if (selectedPublisher) {
        filteredBooks = filteredBooks.filter((book) => book.publisher === selectedPublisher);
    }
    filteredBooks = sortBooks(filteredBooks, sortBy);
    populateBooksGrid(filteredBooks);
    if (filterMenuOpen) {
        handleFilterToggle();
    }
};
const sortBooks = (books, sortOption) => {
    const booksCopy = [...books];
    switch (sortOption) {
        case 'title, A-Z':
            return booksCopy.sort((a, b) => a.title.localeCompare(b.title));
        case 'title, Z-A':
            return booksCopy.sort((a, b) => b.title.localeCompare(a.title));
        case 'year, old - new':
            return booksCopy.sort((a, b) => a.year - b.year);
        case 'year, new - old':
            return booksCopy.sort((a, b) => b.year - a.year);
        case 'pages, low - high':
            return booksCopy.sort((a, b) => a.pages - b.pages);
        case 'pages, high - low':
            return booksCopy.sort((a, b) => b.pages - a.pages);
        default:
            return booksCopy;
    }
};
const populateBooksGrid = (books) => {
    if (!bookGrid)
        return;
    bookGrid.innerHTML = '';
    books.forEach((book) => {
        const bookHtml = bookHtmlTemplate(book);
        bookGrid.innerHTML += bookHtml;
    });
};
const displayBooks = (books) => {
    populateBooksGrid(books);
    populateFilters(books);
};
const fetchBooks = async () => {
    try {
        const response = await fetch(`${SITE_URL}/books`);
        if (!response.ok) {
            const errorMessage = `Error: ${response.status} ${response.statusText}`;
            throw new Error(errorMessage);
        }
        const booksData = await response.json();
        allBooks = booksData;
        displayBooks(booksData);
        return booksData;
    }
    catch (error) {
        console.error(`Failed to fetch books: ${error}`);
        if (bookGrid) {
            bookGrid.innerHTML = `<div class="error-message">Failed to load books. Please try again later.</div>`;
        }
        return null;
    }
};
fetchBooks();
filterToggle?.addEventListener('click', handleFilterToggle);
applyFiltersMobile?.addEventListener('click', handleFilterToggle);
applyFilterBtns.forEach((btn) => {
    btn.addEventListener('click', applyFilters);
});
