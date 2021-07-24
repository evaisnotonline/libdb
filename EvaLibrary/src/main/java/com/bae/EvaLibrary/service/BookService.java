package com.bae.EvaLibrary.service;

import java.util.List;

import com.bae.EvaLibrary.data.Book;

public interface BookService {

	public Book createBook(Book book);

	public List<Book> getAllBooks();

	public Book getBook(int id);

	public Book updateBook(int id, Book newBook);

	public String deleteBook(int id);

}