const libraryEl = document.getElementById('library');
const newBookEl = document.getElementById('new-book');
const cancelBookEl = document.getElementById('cancel-book');
const bookFormEl = document.getElementById('book-form');
const formAuthorEl = document.getElementById('book-author');
const formTitleEl = document.getElementById('book-title');
const formPagesEl = document.getElementById('book-pages');
const formCoverEl = document.getElementById('book-cover');
const formStatusEl = document.getElementById('book-status');
const formMsgEl = document.getElementById('form-msg');
const formSubmitEl = document.getElementById('submit-btn');

bookFormEl.style.display = 'none';
cancelBookEl.style.display = 'none';
formMsgEl.style.display = 'none';
const myLibrary = [
  { title: "To Kill a Mockingbird", author: "Harper Lee", pages: 281, coverUrl: 'https://m.media-amazon.com/images/I/81gepf1eMqL._AC_UF1000,1000_QL80_.jpg', read: true },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", pages: 180, coverUrl: 'https://m.media-amazon.com/images/I/71AXNf+3M0L._AC_UF894,1000_QL80_.jpg', read: false },
  { title: "Atomic Habits", author: "James Clear", pages: 320, coverUrl: 'https://m.media-amazon.com/images/I/81YkqyaFVEL._AC_UF1000,1000_QL80_.jpg', read: true },
  { title: "Pride and Prejudice", author: "Jane Austen", pages: 266, coverUrl: 'https://m.media-amazon.com/images/I/61H3BvN-naL._AC_UF1000,1000_QL80_.jpg', read: false },
];

function Book(title, author, pages, coverUrl, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.coverUrl = coverUrl;
    this.read = read;
    this.info = function() {
    let readStr = this.read ? "read it" : "not read yet";
    return `${this.title} by ${this.author}, ${this.pages} pages, ${readStr}`;
  };
}
newBookEl.addEventListener('click', () => {
    bookFormEl.style.display = '';
    cancelBookEl.style.display = '';
});
cancelBookEl.addEventListener('click',  () => {
    bookFormEl.style.display = 'none';
    cancelBookEl.style.display = 'none';
});

formSubmitEl.addEventListener('click', addBookToLibrary)

function addBookToLibrary(e) {
    e.preventDefault();
    if(formAuthorEl.value == '' || formTitleEl.value == '' || formPagesEl.value == ''){
    formMsgEl.style.display = '';
    return;
    }
    formMsgEl.style.display = 'none';
    myLibrary.push(new Book(formTitleEl.value, formAuthorEl.value, formPagesEl.value, formCoverEl.value, formStatusEl.checked));
    displayBooks();
}

function displayBooks() {
    let i = 0;
    while (libraryEl.firstChild) {
        libraryEl.removeChild(libraryEl.firstChild);
      }
  myLibrary.map( book => {
    let newEl = document.createElement("div");
    let titleEl = document.createElement("p");
    let authorEl = document.createElement("p");
    let pagesEl = document.createElement("p");
    let imgEl = document.createElement('img');
    let btnsContainerEl = document.createElement("div");
    let removeEl = document.createElement("button");
    let readEl = document.createElement("button");

    book.index = i;
    titleEl.textContent = `title: ${book.title}`;
    authorEl.textContent = `Author: ${book.author}`;
    pagesEl.textContent = `Pages: ${book.pages}`;
    imgEl.src = book.coverUrl != '' ? book.coverUrl : 'https://i.pinimg.com/736x/72/c6/7a/72c67af70b9c14f254e4d56125b99873.jpg';
    removeEl.textContent = 'Remove book 🗑️';
    readEl.textContent = book.read ? 'Read it ✅' : 'Not yet ⏳';

    newEl.classList.add('card');
    imgEl.classList.add('book-img');
    readEl.classList.add(book.read ? 'read-btn' : 'not-read-btn');
    removeEl.classList.add('rm-btn');


    readEl.addEventListener('click', () => {
        let status = book.read;
        book.read = !status;
        displayBooks();
    })
    removeEl.addEventListener('click', () => {
        myLibrary.splice(book.index, 1);
        displayBooks();
    })
    btnsContainerEl.appendChild(readEl);
    btnsContainerEl.appendChild(removeEl);

    newEl.appendChild(imgEl);
    newEl.appendChild(titleEl);
    newEl.appendChild(authorEl);
    newEl.appendChild(pagesEl);
    newEl.appendChild(btnsContainerEl);

    libraryEl.appendChild(newEl);
    i++;
  });
}
displayBooks();
