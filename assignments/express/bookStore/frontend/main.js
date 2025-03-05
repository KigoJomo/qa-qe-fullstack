"use strict";
window.addEventListener('DOMContentLoaded', () => {
    fetchBooks();
    setupGenreFilter();
});
function fetchBooks(genre = '') {
    const url = genre
        ? `http://localhost:3000/api/books?genre=${encodeURIComponent(genre)}`
        : 'http://localhost:3000/api/books';
    fetch(url)
        .then((response) => {
        if (!response.ok)
            throw new Error('Failed to fetch books');
        return response.json();
    })
        .then((books) => {
        displayBooks(books);
        if (!genre)
            populateGenres(books);
    })
        .catch((error) => {
        console.error('Error fetching books:', error);
        displayBooks([]);
    });
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
        container.innerHTML = '<p>No books found.</p>';
        return;
    }
    books.forEach((book) => {
        const bookDiv = document.createElement('div');
        bookDiv.className = 'book';
        bookDiv.innerHTML = `
      <img src="${book.image}" alt="${book.title}" />
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Genre:</strong> ${book.genre}</p>
      <p><strong>Price:</strong> <span class="price">$${book.price.toFixed(2)}</span></p>
      <button class="more-info" data-id="${book.id}">More Info</button>
      <div class="book-details" id="details-${book.id}" style="display: none;">
        <p><strong>Year:</strong> ${book.year}</p>
        <p><strong>Pages:</strong> ${book.pages}</p>
        <p><strong>Publisher:</strong> ${book.publisher}</p>
        <p><strong>Description:</strong> ${book.description}</p>
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
function setupGenreFilter() {
    const select = document.getElementById('genre-filter');
    select.addEventListener('change', (event) => {
        const genre = event.target.value;
        fetchBooks(genre);
    });
}
