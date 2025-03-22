interface Book {
  book_id: string;
  title: string;
  author: string;
  genre: string;
  year: number;
  pages: number;
  publisher: string;
  description: string;
  image: string;
  price: string;
  total_copies: number;
  created_by: number;
  created_at: string;
  updated_at: string;
}

const SITE_URL = 'http://localhost:3000';

const filterToggle: HTMLButtonElement | null =
  document.querySelector('#filter-toggle');
const applyFiltersMobile: HTMLButtonElement | null = document.querySelector(
  '#apply-filters-mobile'
);
const filterMenu: HTMLDivElement | null =
  document.querySelector('#filter-menu');
const bookGrid: HTMLElement | null = document.querySelector('#book-grid');
const genreSelect = document.querySelector(
  '#genre-select select'
) as HTMLSelectElement;
const publisherSelect = document.querySelector(
  '#publisher-select select'
) as HTMLSelectElement;
const applyFilterBtns: NodeListOf<HTMLButtonElement> =
  document.querySelectorAll('.apply-filters');
const profileBtn: HTMLDivElement = document.querySelector('#profile-btn')!;
const profileMenu: HTMLDivElement = document.querySelector('.profile-menu')!;
let profileMenuButton: HTMLButtonElement | null = null;

let filterMenuOpen = false;
let profileMenuOpen = false;

let allBooks: Book[] = [];

let publishers: string[], genres: string[];
const sortParams: string[] = [
  'title, A-Z',
  'title, Z-A',
  'year, old - new',
  'year, new - old',
  'pages, low - high',
  'pages, high - low',
];
let sortBy: string = sortParams[0];

const handleFilterToggle = () => {
  if (!filterToggle) return;

  if (!filterMenuOpen) {
    filterToggle.innerHTML = `<span class="material-symbols-outlined">close</span>`;
    filterMenu?.classList.add('flex');
    filterMenu?.classList.remove('hidden', 'md:!flex');
    filterMenuOpen = true;
  } else {
    filterToggle.innerHTML = `<span class="material-symbols-outlined">filter_list</span>`;
    filterMenu?.classList.remove('flex');
    filterMenu?.classList.add('hidden', 'md:!flex');
    filterMenuOpen = false;
  }
};

const bookHtmlTemplate = (book: Book) => {
  return `
    <div
      class="book w-full aspect-[10.5/16] bg-gray-900 hover:bg-gray-800 border border-gray-500 hover:border-gray-200 rounded-2xl overflow-hidden flex flex-col gap-2 transition-all duration-300 relative">
      <img
        src="${book.image}"
        alt="${book.title}"
        class="w-full aspect-[10.5/16] absolute z-[5]" 
      />

      <div class="w-full aspect-[10.5/16] z-[6] flex flex-col justify-end gap-2 px-2 md:px-4 pb-4 tint">
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
        <div class="w-full flex items-center justify-between gap-6">
          <span class="capitalize text-xs border-l-4 border-amber-300 pl-1">
            released: ${book.year}
          </span> 
          <button class="btn !text-xs">borrow</button>  
        </div>
      </div>
    </div>
  `;
};

const populateFilters = (books: Book[]) => {
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

  const sortRadio = document.querySelector(
    'input[name="sort-by"]:checked'
  ) as HTMLInputElement;
  sortBy = sortRadio?.value || sortParams[0];

  let filteredBooks = [...allBooks];

  if (selectedGenre) {
    filteredBooks = filteredBooks.filter(
      (book) => book.genre === selectedGenre
    );
  }

  if (selectedPublisher) {
    filteredBooks = filteredBooks.filter(
      (book) => book.publisher === selectedPublisher
    );
  }

  filteredBooks = sortBooks(filteredBooks, sortBy);

  populateBooksGrid(filteredBooks);

  if (filterMenuOpen) {
    handleFilterToggle();
  }
};

const sortBooks = (books: Book[], sortOption: string): Book[] => {
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

const populateBooksGrid = (books: Book[]) => {
  if (!bookGrid) return;

  bookGrid.innerHTML = '';

  books.forEach((book) => {
    const bookHtml = bookHtmlTemplate(book);
    bookGrid.innerHTML += bookHtml;
  });
};

const displayBooks = (books: Book[]) => {
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

    const booksData: Book[] = await response.json();
    allBooks = booksData;

    displayBooks(booksData);
    return booksData;
  } catch (error) {
    console.error(`Failed to fetch books: ${error}`);
    if (bookGrid) {
      bookGrid.innerHTML = `<div class="error-message">Failed to load books. Please try again later.</div>`;
    }
    return null;
  }
};

const checkLoginStatus = async () => {
  try {
    const response = await fetch('/auth/me', {
      credentials: 'include',
    });

    if (response.ok) {
      const data = await response.json();

      if (data.user) {
        profileBtn.innerHTML = `
          <button id="profile-menu-button" class="flex items-center">
            <span class="material-symbols-outlined"> account_circle </span>
          </button>
          `;
        profileMenuButton = document.querySelector('#profile-menu-button');
        profileMenuButton?.addEventListener('click', toggleProfileMenu);
        populateProfileMenu(data.user);
        console.log(data.user);
      } else {
        profileBtn.innerHTML = `
          <a href="/auth/login"><button class="btn">login</button></a>
        `;
      }
    }
  } catch (error) {
    console.error("Couldn't check your login status bruh ...", error);
  }
};

const populateProfileMenu = (user: any) => {
  const detailsDiv: HTMLDivElement = document.querySelector('#user-details')!;

  detailsDiv.innerHTML = `
    <div id="user-name" class="profile-detail">
      <p>Name:</p>
      <span>${user.first_name} ${user.last_name}</span>
    </div>
    <div id="email" class="profile-detail">
      <p>email:</p>
      <span>${user.email}</span>
    </div>
    <div id="role" class="profile-detail">
      <p>role:</p>
      <span>
        ${
          user.role === 1
            ? '<a href="/admin#books" class="!text-amber-500 hover:!text-amber-200">Admin</a>'
            : user.role === 2
            ? 'Librarian'
            : 'Borrower'
        }
      </span>
    </div>
  `;
};

const toggleProfileMenu = async () => {
  if (!profileMenuOpen) {
    profileMenu.classList.add('flex');
    profileMenu.classList.remove('hidden');
    profileMenuOpen = true;
  } else {
    profileMenu.classList.add('hidden');
    profileMenu.classList.remove('false');
    profileMenuOpen = false;
  }
};

fetchBooks();
checkLoginStatus();

filterToggle?.addEventListener('click', handleFilterToggle);
applyFiltersMobile?.addEventListener('click', handleFilterToggle);
applyFilterBtns.forEach((btn) => {
  btn.addEventListener('click', applyFilters);
});
