const booksContainer = document.getElementById("booksContainer");

const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.read ? "read" : "not read yet"
    }.`;
  };
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  return book;
}

const book1 = addBookToLibrary("harry potter", "Juan", 235, false);
const book2 = addBookToLibrary("cien anos de soledad", "Pepe", 235, false);

function updateLibrary() {
  booksContainer.innerHTML = "";

  myLibrary.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    bookCard.innerHTML = `
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Pages:</strong> ${book.pages}</p>
        <p><strong>State:</strong> ${book.read ? "📖 read " : "📕 Not read"}</p>
        <button onclick="removeBook('${book.id}')">Delate </button>
    `;
    booksContainer.appendChild(bookCard);
  });
}

updateLibrary();

console.log(myLibrary);
