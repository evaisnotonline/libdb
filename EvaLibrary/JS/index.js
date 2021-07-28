"use strict";

(function() {
const baseURL = "http://localhost:8080";

axios.get(`${baseURL}/`)
    .then(res => { // handle response with callback
        console.log(res);
        console.log("DATA: ", res.data);
    }).catch(err => console.log(err)); // handle error


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

const renderBook = (kitten, outputDiv) => {   
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

    newKitten.appendChild(deleteButton);

    bookCard.appendChild(newBook);

    outputDiv.appendChild(bookColumn);
}

const deleteBook = id => {
    axios.delete(`${baseURL}/deleteBook/${id}`)
        .then(res => {
            console.log(res);
            getAllBooks();
        }).catch(err => console.log(err));
}

const getBookById = () => {
    axios.get(`${baseURL}/getBook/${kittenId.value}`)
    .then(res => {
        const book = res.data;
        getByIdOutput.innerHTML = "";
        renderBook(book, getByIdOutput);
    }).catch(err => console.log(err));
}

document.querySelector("section#getByIdSection > button").addEventListener('click', getBookById);

document.querySelector("section#postSection > form").addEventListener('submit', (e) => {
    e.preventDefault(); // stops the form submitting in the default way

    const form = e.target;

    const data = {
        title: form.title.value,
        author: form.author.value,
        publisher: form.publisher.value
    }

    console.log("DATA: ", data);

    axios.post(`${baseURL}/createBook`, data)
    .then((res) => {
        console.log(res);
        getAllBooks();

        form.reset(); //resets form
        form.name.focus(); // selects the name input
    }).catch(err => console.log(err));
});

getAllBooks();

})();