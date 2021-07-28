"use strict";

(function() {

    const updateTitle = document.querySelector("#updateTitle");
    const updateAuthor = document.querySelector("#updateAuthor");
    const updatePublisher = document.querySelector("#updatePublisher");

const baseURL = "http://localhost:8080";

console.log("Have we got a response yet?");

const getAllOutput = document.querySelector("#getAllOutput");
const getByIdOutput = document.querySelector("#getByIdOutput");

const BookId = document.querySelector("#BookId");

const getAllBooks = () => {
    axios.get(`${baseURL}/getAllBooks`)
    .then(res => {
        const books = res.data;

        getAllOutput.innerHTML = ""; // blanks an element

        books.forEach(book => renderBook(book, getAllOutput));
    }).catch(err => console.log(err));
}

getAllBooks();

const renderBook = (book, outputDiv) => {   
    const bookColumn = document.createElement('div');
    bookColumn.classList.add("col");

    const bookCard = document.createElement('div');
    bookCard.classList.add("card");
    bookColumn.appendChild(bookCard);

    const newBook = document.createElement('div');
    newBook.classList.add("card-body");
    
    const bookTitle = document.createElement("h3");
    bookTitle.innerText = book.title;
    bookTitle.classList.add("card-title");
    newBook.appendChild(bookTitle);


    const bookAuthor = document.createElement("p");
    bookAuthor.innerText = `Author: ${book.author}`;
    bookAuthor.classList.add("card-text");
    newBook.appendChild(bookAuthor);

    const bookPublisher = document.createElement("p");
    bookPublisher.innerText = `Publisher: ${book.publisher}`; 
    bookPublisher.classList.add("card-text");
    newBook.appendChild(bookPublisher);

    const deleteButton = document.createElement('button');
    deleteButton.innerText = "DELETE";
    deleteButton.classList.add("btn", "btn-primary");
    deleteButton.addEventListener('click', () => deleteBook(book.id));

    const updateButton = document.createElement('button');
    updateButton.innerText = "UPDATE";
    updateButton.classList.add("btn", "btn-primary");
    updateButton.addEventListener('click', () => updateBook(book.id));

    newBook.appendChild(updateButton);

    newBook.appendChild(deleteButton);

    bookCard.appendChild(newBook);

    outputDiv.appendChild(bookColumn);
}

    const updateBook = id => {
        axios.get(`${baseURL}/getBook/${id}`)
            .then(res => {
                const book = res.data;
                console.log(res.data);

                updateTitle.value = book.title;
                updateAuthor.value = book.author;
                updatePublisher.value = book.publisher;

                console.log(book.id);
            })}

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

document.querySelector("section#postSection > form").addEventListener('submit', (e) => {
    e.preventDefault(); // stops the form submitting in the default way

    const form = e.target;

    const data = {
        title: form.title.value,
        author: form.author.value,
        publisher: form.publisher.value
    }

    console.log("DATA: ", data);

    axios.post(`${baseURL}/addBook`, data)
    .then((res) => {
        console.log(res);
        getAllBooks();

        alert("Thank you for your donation!");

        form.reset(); //resets form
        form.title.focus(); // selects the name input
    }).catch(err => console.log(err));
});

getAllBooks();

})();