const booksContainer = document.getElementById("booksContainer");
const dialog = document.getElementById("myDialog");
const openDialog = document.getElementById("openDialog");
const closeDialog = document.getElementById("close-icon");

document
  .getElementById("book-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;

    addBookToLibrary(title, author, pages, read);

    // Limpiar el formulario después de agregar el libro
    this.reset();
  });

openDialog.addEventListener("click", () => {
  dialog.showModal();
});

closeDialog.addEventListener("click", () => {
  dialog.close();
});

const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID(); // Se usa un ID único
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  updateLibrary();
}

const book1 = addBookToLibrary("Harry Potter", "J.K. Rowling", 235, false);

function updateLibrary() {
  booksContainer.innerHTML = "";

  myLibrary.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    bookCard.innerHTML = `
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Pages:</strong> ${book.pages}</p>
        <p><strong>State:</strong> ${book.read ? "📖 Read" : "📕 Not read"}</p>
        <button onclick="removeBook('${book.id}')">Delete</button>
        <button onclick="toggleBookRead('${book.id}')">Change State</button>
    `;

    booksContainer.appendChild(bookCard);
  });
}

function removeBook(id) {
  const index = myLibrary.findIndex((book) => book.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
    updateLibrary();
  }
}

function toggleBookRead(id) {
  const book = myLibrary.find((book) => book.id === id);
  if (book) {
    book.toggleRead();
    updateLibrary();
  }
}
