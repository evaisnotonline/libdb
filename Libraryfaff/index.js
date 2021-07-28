"use strict";

(function() {
    // const test = () => {
    const updateTitle = document.querySelector("#updateTitle");
    const updateAuthor = document.querySelector("#updateAuthor");
    const updatePublisher = document.querySelector("#updatePublisher");
    // }
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
            .then(res => {
                console.log(updateTitle);
                const book = res.data;
                console.log(res.data);

                console.log(book.id);

            }).catch(err => console.log(err));
        
            const updateForm = document.querySelector("section#updateBook > form");
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

document.querySelector("section#postSection > form").addEventListener('submit', (e) => {
    e.preventDefault();

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

        form.reset();
        form.title.focus();
    }).catch(err => console.log(err));
});

getAllBooks();

})();