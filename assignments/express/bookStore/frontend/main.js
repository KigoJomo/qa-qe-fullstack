"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function fetchBooks(options = {}) {
    const params = new URLSearchParams();
    if (options.genre)
        params.append('genre', options.genre);
    if (options.sort)
        params.append('sort', options.sort);
    if (options.direction)
        params.append('direction', options.direction);
    showLoading();
    (() => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`http://localhost:3000/api/books?${params}`);
            if (!response.ok)
                throw new Error('Failed to fetch books');
            const books = yield response.json();
            displayBooks(books);
            if (!options.genre)
                populateGenres(books);
        }
        catch (error) {
            showError(error instanceof Error ? error : new Error('Unknown error'));
        }
        finally {
            hideLoading();
        }
    }))();
}
function hideLoading() {
    const loadingElement = document.querySelector('.loading');
    if (loadingElement) {
        loadingElement.remove();
    }
}
function setupControls() {
    const genreSelect = document.getElementById('genre-filter');
    const sortSelect = document.getElementById('sort-by');
    const directionSelect = document.getElementById('sort-direction');
    const updateBooks = () => {
        fetchBooks({
            genre: genreSelect.value,
            sort: sortSelect.value,
            direction: directionSelect.value,
        });
    };
    genreSelect.addEventListener('change', updateBooks);
    sortSelect.addEventListener('change', updateBooks);
    directionSelect.addEventListener('change', updateBooks);
}
function showLoading() {
    const container = document.getElementById('books-container');
    container.innerHTML = '<div class="loading">Loading books...</div>';
}
function showError(error) {
    const container = document.getElementById('books-container');
    container.innerHTML = '<div class="error">Failed to load books. Please try again.</div>';
    console.error('Error:', error);
}
function populateGenres(books) {
    const genres = Array.from(new Set(books.map((book) => book.genre)));
    const select = document.getElementById('genre-filter');
    genres.forEach((genre) => {
        const option = document.createElement('option');
        option.value = genre;
        option.textContent = genre;
        select.appendChild(option);
    });
}
function displayBooks(books) {
    const container = document.getElementById('books-container');
    if (!container)
        return;
    container.innerHTML = '';
    if (books.length === 0) {
        container.innerHTML = '<p class="no-books">No books found.</p>';
        return;
    }
    books.forEach((book) => {
        const bookDiv = document.createElement('div');
        bookDiv.className = 'book';
        bookDiv.innerHTML = `
      <img src="${book.image}" alt="${book.title}" />
      <div class="book-content">
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Genre:</strong> ${book.genre}</p>
        <p><strong>Price:</strong> <span class="price">Ksh ${book.price.toLocaleString()}</span></p>
        <button class="more-info" data-id="${book.id}">More Info</button>
        <div class="book-details" id="details-${book.id}" style="display: none;">
          <p><strong>Year:</strong> ${book.year}</p>
          <p><strong>Pages:</strong> ${book.pages}</p>
          <p><strong>Publisher:</strong> ${book.publisher}</p>
          <p><strong>Description:</strong> ${book.description}</p>
        </div>
      </div>
    `;
        container.appendChild(bookDiv);
    });
    const moreInfoButtons = document.querySelectorAll('.more-info');
    moreInfoButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            const detailsDiv = document.getElementById(`details-${id}`);
            if (detailsDiv) {
                if (detailsDiv.style.display === 'none') {
                    detailsDiv.style.display = 'block';
                    button.textContent = 'Less Info';
                }
                else {
                    detailsDiv.style.display = 'none';
                    button.textContent = 'More Info';
                }
            }
        });
    });
}
window.addEventListener('DOMContentLoaded', () => {
    fetchBooks();
    setupControls();
});
