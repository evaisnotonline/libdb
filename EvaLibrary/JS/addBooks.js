"use strict";

(function() {
    
const baseURL = "http://localhost:8080";

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

        alert("Thank you for your donation!");

        form.reset();
        form.title.focus();
    }).catch(err => console.log(err));
});

})();