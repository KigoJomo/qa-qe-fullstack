// Define the AdminBook interface
interface AdminBook {
  book_id: number;
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
  available_copies: number;
  created_by: number;
  created_at: string;
  updated_at: string;
}

interface AdminUser {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  role_id: number;
  role_name: string;
}

const ADMIN_SITE_URL = 'http://localhost:3000';

let allUsers: AdminUser[] = [];

let allAdminBooks: AdminBook[] = [];

// 2.1. Fetch Books Function
async function fetchAdminBooks(): Promise<void> {
  try {
    const response = await fetch(`${ADMIN_SITE_URL}/books`, {
      credentials: 'include', // include cookies (for auth)
    });
    const books: AdminBook[] = await response.json();
    allAdminBooks = books; // Cache the books for later use
    renderAdminBooks(books);
  } catch (error) {
    console.error('Error fetching admin books:', error);
  }
}

// 2.2. Render Books into the Table
function renderAdminBooks(books: AdminBook[]): void {
  const bookRowsContainer = document.getElementById('admin-book-rows');
  if (!bookRowsContainer) return;

  // Clear any existing rows
  bookRowsContainer.innerHTML = '';

  books.forEach((book) => {
    const rowDiv = document.createElement('div');
    rowDiv.className =
      'w-full grid grid-cols-6 gap-4 px-6 py-2 bg-gray-800/70 hover:bg-gray-700 transition-all duration-300 border-b border-gray-700';
    rowDiv.innerHTML = `
      <div class="flex items-center">
        <img src="${book.image}" alt="Book cover" class="w-12 h-16 object-cover rounded shadow-lg">
      </div>
      <div class="flex flex-col justify-center">
        <h5 class="font-medium text-white">${book.title}</h5>
        <p class="!text-sm !text-gray-400">${book.author}</p>
      </div>
      <div class="flex items-center">
        <span class="px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-xs">${book.genre}</span>
      </div>
      <div class="flex items-center text-white">${book.available_copies}/${book.total_copies}</div>
      <div class="flex items-center">
        <span class="px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-xs">Available</span>
      </div>
      <div class="flex items-center justify-end gap-2">
        <button class="edit-btn p-2 bg-gray-700 rounded-full hover:bg-gray-600" data-id="${book.book_id}">
          <span class="material-symbols-outlined !text-sm">edit</span>
        </button>
        <button class="delete-btn p-2 bg-gray-700 rounded-full hover:bg-red-900" data-id="${book.book_id}">
          <span class="material-symbols-outlined !text-sm">delete</span>
        </button>
      </div>
    `;
    bookRowsContainer.appendChild(rowDiv);
  });

  // Attach event listeners for edit and delete buttons
  document.querySelectorAll('.delete-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const bookId = (e.currentTarget as HTMLElement).getAttribute('data-id');
      if (bookId) {
        deleteAdminBook(bookId);
      }
    });
  });

  document.querySelectorAll('.edit-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const bookId = (e.currentTarget as HTMLElement).getAttribute('data-id');
      if (bookId) {
        openEditModal(bookId);
      }
    });
  });
}

// 2.3. Delete Book Functionality
async function deleteAdminBook(bookId: string): Promise<void> {
  try {
    const response = await fetch(`${ADMIN_SITE_URL}/books/${bookId}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (response.ok) {
      alert('Book deleted successfully');
      fetchAdminBooks();
    } else {
      const errMsg = await response.text();
      alert('Error deleting book: ' + errMsg);
    }
  } catch (error) {
    console.error('Error deleting book:', error);
  }
}

// 2.4. Open Edit Modal
// Function to open and populate the Edit Modal
function openEditModal(bookId: string): void {
  // Find the book from the cached list (assumed to be in 'allAdminBooks')
  const book = allAdminBooks.find((b) => b.book_id.toString() === bookId);
  if (!book) {
    alert('Book not found');
    return;
  }

  // Populate form fields with the book's current data
  (document.getElementById('edit-book-id') as HTMLInputElement).value =
    book.book_id.toString();
  (document.getElementById('edit-title') as HTMLInputElement).value =
    book.title;
  (document.getElementById('edit-author') as HTMLInputElement).value =
    book.author;
  (document.getElementById('edit-genre') as HTMLInputElement).value =
    book.genre;
  (document.getElementById('edit-year') as HTMLInputElement).value =
    book.year.toString();
  (document.getElementById('edit-pages') as HTMLInputElement).value =
    book.pages.toString();
  (document.getElementById('edit-publisher') as HTMLInputElement).value =
    book.publisher;
  (document.getElementById('edit-description') as HTMLTextAreaElement).value =
    book.description;
  (document.getElementById('edit-image') as HTMLInputElement).value =
    book.image;
  (document.getElementById('edit-price') as HTMLInputElement).value =
    book.price;
  (document.getElementById('edit-total_copies') as HTMLInputElement).value =
    book.total_copies.toString();

  // Display the edit modal
  const editModal = document.getElementById('edit-book-modal');
  if (editModal) {
    editModal.classList.remove('hidden');
    editModal.classList.add('flex');
  }
}

// Attach event listener to the close button in the edit modal
const closeEditModalBtn = document.getElementById('close-edit-modal');
if (closeEditModalBtn) {
  closeEditModalBtn.addEventListener('click', () => {
    const editModal = document.getElementById('edit-book-modal');
    if (editModal) {
      editModal.classList.add('hidden');
      editModal.classList.remove('flex');
    }
  });
}

// Event listener for edit form submission
const editBookForm = document.getElementById(
  'edit-book-form'
) as HTMLFormElement;
if (editBookForm) {
  editBookForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(editBookForm);
    // Convert form data to an object and ensure numeric fields are numbers
    const data: any = Object.fromEntries(formData.entries());
    data.year = Number(data.year);
    data.pages = Number(data.pages);
    data.price = Number(data.price);
    data.total_copies = Number(data.total_copies);
    const bookId = data.book_id;

    try {
      const response = await fetch(`${ADMIN_SITE_URL}/books/${bookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert('Book updated successfully');
        // Close the edit modal
        const editModal = document.getElementById('edit-book-modal');
        if (editModal) {
          editModal.classList.add('hidden');
          editModal.classList.remove('flex');
        }
        // Refresh the book list
        fetchAdminBooks();
      } else {
        const errMsg = await response.text();
        alert('Error updating book: ' + errMsg);
      }
    } catch (error) {
      console.error('Error updating book:', error);
    }
  });
}

// Update your edit button event listeners in renderAdminBooks to call openEditModal
document.querySelectorAll('.edit-btn').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const bookId = (e.currentTarget as HTMLElement).getAttribute('data-id');
    if (bookId) {
      openEditModal(bookId);
    }
  });
});

// 2.5. Handle Add Book Form Submission
const addBookForm = document.getElementById('add-book-form') as HTMLFormElement;
if (addBookForm) {
  addBookForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(addBookForm);
    // Convert form data to a plain object and ensure numeric fields are numbers
    const data: any = Object.fromEntries(formData.entries());
    data.year = Number(data.year);
    data.pages = Number(data.pages);
    data.price = Number(data.price);
    data.total_copies = Number(data.total_copies);

    console.log(data);

    try {
      const response = await fetch(`${ADMIN_SITE_URL}/books`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert('Book added successfully');
        addBookForm.reset();
        // Close modal
        const modal = document.getElementById('add-book-modal');
        if (modal) {
          modal.classList.add('hidden');
          modal.classList.remove('flex');
        }
        fetchAdminBooks();
      } else {
        const errMsg = await response.text();
        alert('Error adding book: ' + errMsg);
      }
    } catch (error) {
      console.error('Error adding book:', error);
    }
  });
}

// 2.6. Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  fetchAdminBooks();
});

// ----------------------------------------------------------------------

/**
 * Admin panel navigation controller
 * Handles switching between different admin sections
 */

// Define the possible sections in the admin panel
type AdminSection = 'dashboard' | 'books' | 'users' | 'settings';

// Store the currently active section
let currentSection: AdminSection = 'dashboard';

// Function to switch between articles
const switchToSection = (sectionId: AdminSection): void => {
  // Hide all articles
  const articles: NodeListOf<HTMLElement> = document.querySelectorAll(
    'main section article'
  );
  articles.forEach((article) => {
    article.style.display = 'none';
  });

  // Show the selected article
  const selectedArticle = document.getElementById(sectionId);
  if (selectedArticle) {
    selectedArticle.style.display = 'flex';
    currentSection = sectionId;

    // Update URL hash without causing page navigation
    history.pushState(null, '', `#${sectionId}`);

    // Handle section-specific logic
    handleSectionActivation(sectionId);
  }

  // Update active state in navigation
  updateNavActiveState(sectionId);
};

// Function to update navigation active state
const updateNavActiveState = (sectionId: AdminSection): void => {
  // Remove active state from all nav links
  const navLinks = document.querySelectorAll('aside ul a');
  navLinks.forEach((link) => {
    link.classList.remove('!border-gray-100');
    link.classList.add('!border-gray-800');
  });

  // Add active state to selected nav link
  const activeLink = document.querySelector(`aside ul a[href="#${sectionId}"]`);
  if (activeLink) {
    activeLink.classList.remove('!border-gray-800');
    activeLink.classList.add('!border-gray-100');
  }
};

// Handle section-specific activation logic
const handleSectionActivation = (sectionId: AdminSection): void => {
  switch (sectionId) {
    case 'dashboard':
      // Dashboard-specific logic (e.g., load statistics)
      console.log('Dashboard section activated');
      break;
    case 'books':
      initializeBookForm();
      console.log('Books section activated');
      break;
    case 'users':
      // Users-specific logic (e.g., fetch user list)
      console.log('Users section activated');
      break;
    case 'settings':
      // Settings-specific logic
      console.log('Settings section activated');
      break;
  }
};

// Initialize the navigation functionality
const initAdminNavigation = (): void => {
  // Add event listeners to navigation links
  const navLinks = document.querySelectorAll('aside ul a');

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const href = link.getAttribute('href');
      if (href) {
        // Extract section ID from href (remove the # character)
        const sectionId = href.substring(1) as AdminSection;
        switchToSection(sectionId);
      }
    });
  });

  // Check for section in URL hash on page load
  let initialSection: AdminSection = 'dashboard'; // Default

  if (window.location.hash) {
    const hashSection = window.location.hash.substring(1) as AdminSection;
    // Validate that it's a valid AdminSection
    const validSections: AdminSection[] = [
      'dashboard',
      'books',
      'users',
      'settings',
    ];
    if (validSections.includes(hashSection)) {
      initialSection = hashSection;
    }
  }

  // Initialize with the dashboard section
  switchToSection(initialSection);
};

const initializeBookForm = () => {
  const addBtn: HTMLButtonElement = document.querySelector('#add-book-btn')!;
  const addBookModal: HTMLDivElement =
    document.querySelector('#add-book-modal')!;
  const closeModalBtn: HTMLButtonElement =
    document.querySelector('#close-book-modal')!;

  let modalOpen = false;

  const toggleBookModal = () => {
    if (!modalOpen) {
      addBookModal.classList.add('flex');
      addBookModal.classList.remove('hidden');
      modalOpen = true;
    } else {
      addBookModal.classList.add('hidden');
      addBookModal.classList.remove('flex');
      modalOpen = false;
    }
  };

  addBtn.addEventListener('click', toggleBookModal);
  closeModalBtn.addEventListener('click', toggleBookModal);
};

// Execute when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initAdminNavigation);

// ----------------------------------------

async function fetchAdminUsers(): Promise<void> {
  try {
    const response = await fetch(`${ADMIN_SITE_URL}/users`, {
      credentials: 'include',
    });
    const users: AdminUser[] = await response.json();
    allUsers = users;
    renderAdminUsers(users);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

function renderAdminUsers(users: AdminUser[]): void {
  const userRowsContainer = document.getElementById('admin-user-rows');
  if (!userRowsContainer) return;

  userRowsContainer.innerHTML = '';
  users.forEach((user) => {
    const rowDiv = document.createElement('div');
    rowDiv.className =
      'w-full grid grid-cols-4 gap-4 px-6 py-2 bg-gray-800/70 hover:bg-gray-700 transition-all duration-300 border-b border-gray-700';
    rowDiv.innerHTML = `
      <div class="flex flex-col justify-center">
        <p class="font-medium">${user.first_name} ${user.last_name}</p>
      </div>
      <div class="flex items-center">
        <p class="!text-gray-400">${user.email}</p>
      </div>
      <div class="flex items-center">
        <p class="!text-xs px-4 py-1 rounded-full border border-gray-300 ${
        user.role_name === 'Admin' 
        ? 'bg-purple-600'
        : user.role_name === 'Librarian'
        ? 'bg-blue-900'
        : 'bg-green-900'
      }">${user.role_name}</p>
      </div>
      <div class="flex items-center justify-end gap-2">
        <button class="edit-user-btn p-2 bg-gray-700 rounded-full hover:bg-gray-600" data-id="${user.user_id}">
          <span class="material-symbols-outlined !text-sm">edit</span>
        </button>
        <button class="delete-user-btn p-2 bg-gray-700 rounded-full hover:bg-red-900" data-id="${user.user_id}">
          <span class="material-symbols-outlined !text-sm">delete</span>
        </button>
      </div>
    `;
    userRowsContainer.appendChild(rowDiv);
  });

  // Attach event listeners for edit and delete actions
  document.querySelectorAll('.edit-user-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const userId = (e.currentTarget as HTMLElement).getAttribute('data-id');
      if (userId) {
        openEditUserModal(userId);
      }
    });
  });

  document.querySelectorAll('.delete-user-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const userId = (e.currentTarget as HTMLElement).getAttribute('data-id');
      if (userId) {
        deleteAdminUser(userId);
      }
    });
  });
}

function openEditUserModal(userId: string): void {
  const user = allUsers.find((u) => u.user_id.toString() === userId);
  if (!user) {
    alert("User not found");
    return;
  }

  (document.getElementById('edit-user-id') as HTMLInputElement).value = user.user_id.toString();
  (document.getElementById('edit-first-name') as HTMLInputElement).value = user.first_name;
  (document.getElementById('edit-last-name') as HTMLInputElement).value = user.last_name;
  (document.getElementById('edit-email') as HTMLInputElement).value = user.email;
  (document.getElementById('edit-role') as HTMLSelectElement).value = user.role_id.toString();

  const editUserModal = document.getElementById('edit-user-modal');
  if (editUserModal) {
    editUserModal.classList.remove('hidden');
    editUserModal.classList.add('flex');
  }
}

const closeUserEditModalBtn = document.getElementById('close-user-edit-modal');
if (closeUserEditModalBtn) {
  closeUserEditModalBtn.addEventListener('click', () => {
    const editUserModal = document.getElementById('edit-user-modal');
    if (editUserModal) {
      editUserModal.classList.add('hidden');
      editUserModal.classList.remove('flex');
    }
  });
}

const editUserForm = document.getElementById('edit-user-form') as HTMLFormElement;
if (editUserForm) {
  editUserForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(editUserForm);
    const data: any = Object.fromEntries(formData.entries());
    // No numeric conversion is needed for names/emails; ensure role is a number
    data.role_id = Number(data.role_id);
    const userId = data.user_id;

    try {
      const response = await fetch(`${ADMIN_SITE_URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert('User updated successfully');
        const editUserModal = document.getElementById('edit-user-modal');
        if (editUserModal) {
          editUserModal.classList.add('hidden');
          editUserModal.classList.remove('flex');
        }
        fetchAdminUsers();
      } else {
        const errMsg = await response.text();
        alert('Error updating user: ' + errMsg);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  });
}

async function deleteAdminUser(userId: string): Promise<void> {
  try {
    const response = await fetch(`${ADMIN_SITE_URL}/users/${userId}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (response.ok) {
      alert('User deleted successfully');
      fetchAdminUsers();
    } else {
      const errMsg = await response.text();
      alert('Error deleting user: ' + errMsg);
    }
  } catch (error) {
    console.error('Error deleting user:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetchAdminUsers();
});