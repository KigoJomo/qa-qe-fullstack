// display books
// handle filtering
import { books } from './books';
import { updateCartUi } from './cart';
const bookGrid = document.querySelector('.book-grid');
const filterForm = document.querySelector('.filters');
function displayBooks() {
    books.forEach((book) => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
      <div
        class="book-card relative w-full aspect-[3/4] h-auto rounded-3xl overflow-hidden grid grid-cols-1 grid-rows-1">
        <img
          src="${book.image}"
          alt=""
          class="w-full aspect-[3/4] col-span-1 row-span-1 z-[1]" />

        <div class="absolute w-full h-full z-[2] transparent-gradient"></div>

        <div
          class="details w-full aspect-[3/4] col-span-1 row-span-1 z-[3] flex flex-col justify-end gap-1 p-4">
          <h4 class="text-white font-bold">${book.title}</h4>
          <hr class="border-white" />
          <div class="w-full flex items-center gap-4">
            <p class="text-white capitalize">${book.year}</p>
            <p class="text-white">-</p>
            <p class="text-white capitalize">${book.year}</p>
          </div>
          <p class="text-gray-700 capitalize bg-blue-100 w-fit border-blue-900 px-4 py-1 rounded-full">${book.genre}</p>
          <div class="flex items-center justify-between">
            <p class="text-white font-bold">Ksh ${book.price.toLocaleString()}</p>
            <button>Buy Now</button>
          </div>
        </div>
      </div>
    `;
        bookGrid === null || bookGrid === void 0 ? void 0 : bookGrid.append(bookCard);
    });
}
function initializeUI() {
    displayBooks();
    updateCartUi();
    // console.log('first')
}
initializeUI();
//# sourceMappingURL=index.js.map