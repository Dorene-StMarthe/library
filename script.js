const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function() {
  this.read = !this.read;
};

function addBookToLibrary(book) {
  myLibrary.push(book);
  displayBooks();
}

function displayBooks() {
  const libraryDisplay = document.getElementById('library-display');
  libraryDisplay.innerHTML = '';

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    
    bookCard.innerHTML = 
    '<h3>' + book.title + '</h3>' +
    '<p>Author: ' + book.author + '</p>' +
    '<p>Pages: ' + book.pages + '</p>' +
    '<p>Status: ' + (book.read ? "Read" : "Not read yet") + '</p>' +
    '<button class="toggle-read-btn" data-index="' + index + '">Toggle Read</button>' +
    '<button class="remove-btn" data-index="' + index + '">Remove</button>';
    libraryDisplay.appendChild(bookCard);
  });

  document.querySelectorAll('.toggle-read-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index');
      myLibrary[index].toggleRead();
      displayBooks();
    });
  });

  document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index');
      myLibrary.splice(index, 1);
      displayBooks();
    });
  });
}

// Handle form submission
const newBookForm = document.getElementById('new-book-form');
newBookForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;

  const newBook = new Book(title, author, pages, read);
  addBookToLibrary(newBook);

  newBookForm.reset();
  document.getElementById('book-form').classList.add('hidden');
});

// Show/hide the form
const newBookBtn = document.getElementById('new-book-btn');
newBookBtn.addEventListener('click', () => {
  document.getElementById('book-form').classList.toggle('hidden');
});

// Manually add some books for testing
addBookToLibrary(new Book('The Great Gatsby', 'F. Scott Fitzgerald', 180, true));
addBookToLibrary(new Book('1984', 'George Orwell', 328, false));
