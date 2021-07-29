"use strict";

(function() {

    const updateTitle = document.querySelector("#updateTitle");
    const updateAuthor = document.querySelector("#updateAuthor");
    const updatePublisher = document.querySelector("#updatePublisher");
   
    const data1 = {
        id: 0,
        title: updateTitle.value,
        author: updateAuthor.value,
        publisher: updatePublisher.value
    }

console.log(data1);
const baseURL = "http://localhost:8080";

const getAllOutput = document.querySelector("#getAllOutput");
const getByIdOutput = document.querySelector("#getByIdOutput");

const BookId = document.querySelector("#BookId");

const getAllBooks = () => {
    axios.get(`${baseURL}/getAllBooks`)
    .then(res => {
        const books = res.data;

        getAllOutput.innerHTML = "";

        books.forEach(book => renderBook(book, getAllOutput));
    }).catch(err => console.log(err));
}

getAllBooks();

const renderBook = (book, outputDiv) => {   
    const bookColumn = document.createElement('div');
    bookColumn.classList.add("col");

    const bookCard = document.createElement('div');
    bookCard.classList.add("row");
    bookColumn.appendChild(bookCard);

    const newBook = document.createElement('div');
    newBook.classList.add("row");
    
    const bookTitle = document.createElement("h4");
    bookTitle.innerText = book.title;
    bookTitle.classList.add("col", "col-3");
    newBook.appendChild(bookTitle);

    const bookAuthor = document.createElement("h5");
    bookAuthor.innerText = `${book.author}`;
    bookAuthor.classList.add("col", "col-4");
    newBook.appendChild(bookAuthor);

    const bookPublisher = document.createElement("h5");
    bookPublisher.innerText = `${book.publisher}`; 
    bookPublisher.classList.add("col");
    newBook.appendChild(bookPublisher);

    const deleteButton = document.createElement('button');
    deleteButton.innerText = "DELETE";
    deleteButton.classList.add("btn", "btn-primary", "row", "col-1", "mx-auto");
    deleteButton.addEventListener('click', () => deleteBook(book.id));

    const updateButton = document.createElement('button');
    updateButton.innerText = "UPDATE";
    updateButton.classList.add("btn", "btn-primary", "row", "col-1", "mx-auto");
    updateButton.addEventListener('click', () => {
        data1.id=book.id,
        updateAuthor.value = book.author,
        updateTitle.value = book.title,
        updatePublisher.value = book.publisher
    });

    newBook.appendChild(updateButton);

    newBook.appendChild(deleteButton);

    bookCard.appendChild(newBook);

    outputDiv.appendChild(bookColumn);
}

    document.querySelector('#updateBook>form').addEventListener('submit',  (e) => {
        e.preventDefault();
        const data = {
        author: updateAuthor.value,
        title: updateTitle.value,
        publisher: updatePublisher.value
        }
        
        axios.put(`${baseURL}/updateBook/${data1.id}`, data)
            .then(() => {
            }).catch(err => console.log(err));

            location.reload();
            getAllBooks();
        }
    )
const deleteBook = id => {
    axios.delete(`${baseURL}/deleteBook/${id}`)
        .then(res => {
            console.log(res);
            getAllBooks();
        }).catch(err => console.log(err));
}

const getBook = () => {
    axios.get(`${baseURL}/getBook/${bookId.value}`)
    .then(res => {
        const book = res.data;
        getByIdOutput.innerHTML = "";
        renderBook(book, getByIdOutput);
    }).catch(err => console.log(err));
}

document.querySelector("button#getByIdButton").addEventListener('click', getBook);

})();